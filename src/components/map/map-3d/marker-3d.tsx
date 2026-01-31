"use client";

import { useEffect, useState } from "react";
import type { MapPosition } from "@/server/types/Map";

interface Marker3DProps {
  location: MapPosition;
  onClick?: (location: MapPosition) => void;
}

export function Marker3D({ location, onClick }: Marker3DProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    customElements.whenDefined("gmp-marker-3d").then(() => setReady(true));
  }, []);

  const handleClick = () => {
    console.log("Marker clicked:", location);
    onClick?.(location);
  };

  if (!ready) return null;

  return (
    <gmp-marker-3d
      position={{
        lat: location.lat,
        lng: location.lng,
        altitude: location.altitude ?? 0,
      }}
      altitude-mode="CLAMP_TO_GROUND"
      label={location.label}
      onClick={() => handleClick()}
    />
  );
}