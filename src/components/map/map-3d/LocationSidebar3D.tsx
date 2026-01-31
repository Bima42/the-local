"use client";

import type { MapPosition } from "@/server/types/Map";

interface LocationSidebarProps {
  location: MapPosition | null;
  onClose: () => void;
}

export function LocationSidebar({ location, onClose }: LocationSidebarProps) {
  return (
    <div
      className={`
        fixed left-0 top-0 z-10 h-full w-80 bg-white/95 backdrop-blur shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${location ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {location && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">{location.label ?? "Unknown"}</h2>
            <button
              onClick={onClose}
              className="rounded p-1 hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 capitalize">{location.type}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Coordinates</dt>
                <dd className="mt-1 font-mono text-sm">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Altitude</dt>
                <dd className="mt-1">{location.altitude ?? 0}m</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-lg border-2 border-dashed border-gray-200 p-4 text-center text-sm text-gray-400">
              Additional details here
            </div>
          </div>

          <div className="border-t p-4">
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}