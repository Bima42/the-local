"use client";

import { useCallback } from "react";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { MapPosition } from "@/server/types/Map";

const PIN_COLORS: Record<MapPosition["type"], { bg: string; border: string; glyph: string }> = {
  poi: { bg: "#4285F4", border: "#1a73e8", glyph: "#ffffff" },
  user: { bg: "#34A853", border: "#1e8e3e", glyph: "#ffffff" },
  event: { bg: "#FBBC04", border: "#f9a825", glyph: "#000000" },
};

interface LocationMarkerProps {
  location: MapPosition;
  isSelected: boolean;
  onSelect: (location: MapPosition) => void;
}

export function LocationMarker({ location, isSelected, onSelect }: LocationMarkerProps) {
  const handleClick = useCallback(() => {
    onSelect(location);
  }, [location, onSelect]);

  const colors = PIN_COLORS[location.type];

  return (
    <AdvancedMarker
      position={{ lat: location.lat, lng: location.lng }}
      onClick={handleClick}
      title={location.label}
    >
      <Pin
        background={isSelected ? "#EA4335" : colors.bg}
        borderColor={isSelected ? "#c5221f" : colors.border}
        glyphColor={colors.glyph}
        scale={isSelected ? 1.3 : 1}
      />
    </AdvancedMarker>
  );
}