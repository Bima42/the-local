"use client";

import { useFBX } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

interface Props {
  onClick: (position: [number, number, number]) => void;
}

export function HumanModel({ onClick }: Props) {
  const fbx = useFBX("/medias/3d/Ch36_nonPBR.fbx");

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const { x, y, z } = event.point;
    onClick([x, y, z]);
  };

  return (
    <primitive
      object={fbx}
      onClick={handleClick}
      scale={0.01}
      position={[0, -1, 0]}
    />
  );
}
