"use client";

import { useCallback, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { LocationMarker } from "./LocationMarker";
import { LocationSidebar } from "./LocationSidebar";
import type { MapPosition } from "@/server/types/Map";
import { env } from "@/config/env";

const SF_CENTER = { lat: 37.7749, lng: -122.4194 };
const DEFAULT_ZOOM = 12;

interface MapViewProps {
  locations: MapPosition[];
}

export function MapView({ locations }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapPosition | null>(null);

  const handleMarkerSelect = useCallback((location: MapPosition) => {
    setSelectedLocation(location);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  // Close sidebar when clicking on map (not on marker)
  const handleMapClick = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
      <div className="relative h-screen w-screen">
        <LocationSidebar location={selectedLocation} onClose={handleSidebarClose} />

        <Map
          mapId={env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultCenter={SF_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling="greedy"
          disableDefaultUI={false}
          onClick={handleMapClick}
        >
          {locations.map((location) => (
            <LocationMarker
              key={location.id}
              location={location}
              isSelected={selectedLocation?.id === location.id}
              onSelect={handleMarkerSelect}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}