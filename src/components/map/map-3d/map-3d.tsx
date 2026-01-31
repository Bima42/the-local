"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallbackRef, useDeepCompareEffect } from "./utility-hooks";
import { useMap3DCameraEvents } from "./use-map-3d-camera-events";
import type { Map3DProps } from "./types";

export const Map3D = forwardRef<google.maps.maps3d.Map3DElement | null, Map3DProps>(
  (props, forwardedRef) => {
    useMapsLibrary("maps3d");

    const [map3DElement, map3dRef] = useCallbackRef<google.maps.maps3d.Map3DElement>();
    const [customElementsReady, setCustomElementsReady] = useState(false);

    useMap3DCameraEvents(map3DElement, props.onCameraChange);

    useEffect(() => {
      customElements.whenDefined("gmp-map-3d").then(() => {
        setCustomElementsReady(true);
      });
    }, []);

    const { center, heading, tilt, range, roll, onCameraChange, children, ...map3dOptions } = props;

    useDeepCompareEffect(() => {
      if (!map3DElement) return;
      Object.assign(map3DElement, map3dOptions);
    }, [map3DElement, map3dOptions]);

    useImperativeHandle(forwardedRef, () => map3DElement, [map3DElement]);

    if (!customElementsReady) return null;

    return (
      <gmp-map-3d
        ref={map3dRef}
        center={center}
        range={range}
        heading={heading}
        tilt={tilt}
        roll={roll}
        mode="HYBRID"
      >
        {children}
      </gmp-map-3d>
    );
  }
);

Map3D.displayName = "Map3D";