"use client";

import { useEffect, useRef, useCallback } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import { type Map3DProps, type MapPosition } from "@/server/types/Map";
import { cn } from "@/lib/utils";

const DEFAULT_TILT = 67.5;
const DEFAULT_HEADING = 0;
const DEFAULT_RANGE = 1000;
const DEFAULT_MODE = "HYBRID";

/**
 * 3D Map component using Google's Map3DElement (beta).
 * 
 * Supports displaying 3D markers at geographic coordinates.
 * Uses vis.gl's APIProvider for loading, but creates the 3D map
 * instance directly since vis.gl doesn't have a 3D wrapper yet.
 */
export function Map3D({
  center,
  tilt = DEFAULT_TILT,
  heading = DEFAULT_HEADING,
  range = DEFAULT_RANGE,
  mode = DEFAULT_MODE,
  markers = [],
  className,
}: Map3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.maps3d.Map3DElement | null>(null);
  const markersRef = useRef<google.maps.maps3d.Marker3DElement[]>([]);
  const apiIsLoaded = useApiIsLoaded();

  const initializeMap = useCallback(async () => {
    if (!containerRef.current) return;
    
    // Prevent double initialization
    if (mapRef.current) return;

    try {
      const { Map3DElement } = await google.maps.importLibrary("maps3d");

      const map = new Map3DElement({
        center: {
          lat: center.lat,
          lng: center.lng,
          altitude: center.altitude ?? 0,
        },
        tilt,
        heading,
        range,
        mode,
      });

      containerRef.current.appendChild(map);
      mapRef.current = map;
    } catch (error) {
      console.error("Failed to initialize 3D map:", error);
    }
  }, [center.lat, center.lng, center.altitude, tilt, heading, range, mode]);

  /**
   * Synchronizes markers with the map when markers prop changes.
   * Clears existing markers and creates new ones.
   */
  const syncMarkers = useCallback(async () => {
    if (!mapRef.current || !apiIsLoaded) return;

    try {
      // Clear existing markers
      markersRef.current.forEach((marker) => {
        try {
          marker.remove();
        } catch (error) {
          console.warn("Error removing marker:", error);
        }
      });
      markersRef.current = [];

      // Add new markers
      const { Marker3DElement } = await google.maps.importLibrary("maps3d");

      markers.forEach((position: MapPosition) => {
        try {
          const marker = new Marker3DElement({
            position: {
              lat: position.lat,
              lng: position.lng,
              altitude: position.altitude ?? 0,
            },
            label: position.label ?? "",
            altitudeMode: "CLAMP_TO_GROUND",
            extruded: false,
          });

          mapRef.current!.append(marker);
          markersRef.current.push(marker);
        } catch (error) {
          console.error("Failed to create marker:", error);
        }
      });
    } catch (error) {
      console.error("Failed to sync markers:", error);
    }
  }, [markers, apiIsLoaded]);

  // Initialize map when API is loaded
  useEffect(() => {
    if (!apiIsLoaded) return;

    initializeMap();

    return () => {
      // Cleanup markers first
      markersRef.current.forEach((marker) => {
        try {
          marker.remove();
        } catch (error) {
          console.warn("Error removing marker on cleanup:", error);
        }
      });
      markersRef.current = [];

      // Cleanup map
      if (mapRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(mapRef.current);
        } catch (error) {
          console.warn("Error removing map on cleanup:", error);
        }
        mapRef.current = null;
      }
    };
  }, [apiIsLoaded, initializeMap]);

  // Update camera when props change (after initial mount)
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.center = {
      lat: center.lat,
      lng: center.lng,
      altitude: center.altitude ?? 0,
    };
    mapRef.current.tilt = tilt;
    mapRef.current.heading = heading;
    mapRef.current.range = range;
  }, [center.lat, center.lng, center.altitude, tilt, heading, range]);

  // Sync markers when markers prop changes
  useEffect(() => {
    syncMarkers();
  }, [syncMarkers]);

  if (!apiIsLoaded) {
    return (
      <div className={cn("flex items-center justify-center bg-slate-100", className)}>
        <div className="flex flex-col items-center gap-2 text-slate-600">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600" />
          <span className="text-sm">Loading 3D Map...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
    />
  );
}