"use client";

import { useCallback, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Map3D, Marker3D } from "./map-3d";
import { LocationSidebar } from "./LocationSidebar";
import type { Map3DCameraProps } from "./map-3d";
import type { MapPosition } from "@/server/types/Map";
import { env } from "@/config/env";

const INITIAL_CAMERA: Map3DCameraProps = {
  center: { lat: 37.7749, lng: -122.4194, altitude: 0 },
  range: 5000,
  heading: 30,
  tilt: 60,
  roll: 0,
};

interface Map3DViewProps {
  locations: MapPosition[];
}

export function Map3DView({ locations }: Map3DViewProps) {
  const [camera, setCamera] = useState<Map3DCameraProps>(INITIAL_CAMERA);
  const [selectedLocation, setSelectedLocation] = useState<MapPosition | null>(null);

  const handleCameraChange = useCallback((props: Map3DCameraProps) => {
    setCamera((prev) => ({ ...prev, ...props }));
  }, []);

  const handleMarkerClick = useCallback((location: MapPosition) => {
    setSelectedLocation(location);
    setCamera((prev) => ({
      ...prev,
      center: { lat: location.lat, lng: location.lng, altitude: location.altitude ?? 0 },
      range: 800,
      tilt: 65,
    }));
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} version="alpha">
      <div className="relative h-screen w-screen">
        <LocationSidebar location={selectedLocation} onClose={handleSidebarClose} />

        <Map3D {...camera} onCameraChange={handleCameraChange}>
          {locations.map((location) => (
            <Marker3D
              key={location.id}
              location={location}
              onClick={handleMarkerClick}
            />
          ))}
        </Map3D>
      </div>
    </APIProvider>
  );
}