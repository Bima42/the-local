export const PAIN_TYPES = [
  "sharp",
  "dull", 
  "burning",
  "tingling",
  "throbbing",
  "cramping",
  "shooting",
  "other",
] as const;

export type PainType = (typeof PAIN_TYPES)[number];

export interface PainPoint {
  id: string;
  sessionId: string;
  posX: number;
  posY: number;
  posZ: number;
  meshName: string | null; // null = user-placed, non-null = AI-placed
  label: string;
  type: PainType;
  notes: string | null;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PredefinedPainPoint {
  name: string;
  position: [number, number, number];
  label: string;
  category: string;
}