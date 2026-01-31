import { z } from "zod";

/**
 * Schema for a geographic position with optional altitude
 */
export const mapPositionSchema = z.object({
  id: z.string(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  altitude: z.number().optional().default(0),
  label: z.string().optional(),
  type: z.enum(["poi", "user", "event"]).optional().default("poi"),
});

export type MapPosition = z.infer<typeof mapPositionSchema>;

/**
 * Camera configuration for 3D map view
 */
export interface Map3DCameraProps {
  center: {
    lat: number;
    lng: number;
    altitude?: number;
  };
  range?: number;
  tilt?: number;
  heading?: number;
}

/**
 * Props for the Map3D component
 */
export interface Map3DProps extends Map3DCameraProps {
  mode?: "HYBRID" | "SATELLITE";
  markers?: MapPosition[];
  className?: string;
}

/**
 * Extends the global google.maps namespace for 3D types (beta API)
 * These types are not yet in @types/google.maps
 */
declare global {
  namespace google.maps {
    namespace maps3d {
      class Map3DElement extends HTMLElement {
        constructor(options?: Map3DElementOptions);
        center: LatLngAltitudeLiteral | null;
        range: number;
        tilt: number;
        heading: number;
        mode: string;
        append(element: Marker3DElement): void;
      }

      class Marker3DElement extends HTMLElement {
        constructor(options?: Marker3DElementOptions);
        position: LatLngAltitudeLiteral | null;
        altitudeMode: string;
        extruded: boolean;
        label: string;
        remove(): void;
      }

      interface Map3DElementOptions {
        center?: LatLngAltitudeLiteral;
        range?: number;
        tilt?: number;
        heading?: number;
        mode?: string;
        gestureHandling?: string;
      }

      interface Marker3DElementOptions {
        position: LatLngAltitudeLiteral;
        altitudeMode?: "ABSOLUTE" | "CLAMP_TO_GROUND";
        extruded?: boolean;
        label?: string;
      }

      interface LatLngAltitudeLiteral {
        lat: number;
        lng: number;
        altitude?: number;
      }
    }

    function importLibrary(
      name: "maps3d"
    ): Promise<{
      Map3DElement: typeof google.maps.maps3d.Map3DElement;
      Marker3DElement: typeof google.maps.maps3d.Marker3DElement;
    }>;
  }
}