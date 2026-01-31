import type { PropsWithChildren } from "react";

export type Map3DCameraProps = {
  center: google.maps.LatLngAltitudeLiteral;
  range: number;
  heading: number;
  tilt: number;
  roll: number;
};

export type Map3DProps = PropsWithChildren<
  Partial<Map3DCameraProps> & {
    defaultLabelsDisabled?: boolean;
    onCameraChange?: (cameraProps: Map3DCameraProps) => void;
  }
>;

// Extend JSX for the 3D web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmp-map-3d": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          center?: google.maps.LatLngAltitudeLiteral;
          range?: number;
          heading?: number;
          tilt?: number;
          roll?: number;
          mode?: "HYBRID" | "SATELLITE";
          "default-labels-disabled"?: boolean;
        },
        HTMLElement
      >;
      "gmp-marker-3d": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          position?: google.maps.LatLngAltitudeLiteral;
          "altitude-mode"?: "ABSOLUTE" | "CLAMP_TO_GROUND" | "RELATIVE_TO_GROUND";
          extruded?: boolean;
          label?: string;
        },
        HTMLElement
      >;
    }
  }
}