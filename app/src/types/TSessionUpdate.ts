import { z } from "zod";
import { painTypeEnum } from "@/server/db/schema";

export const painPointUpdateSchema = z.object({
  meshName: z.string().optional(),
  label: z.string(),
  type: z.enum(painTypeEnum.enumValues),
  rating: z.number().int().min(0).max(10),
  notes: z.string().optional(),
});

export const sessionUpdateSchema = z.object({
  notes: z.string().optional(),
  painPoints: z.array(painPointUpdateSchema).optional(),
  clearUserPoints: z.boolean().optional(), // NEW: if true, remove user-placed points too
});

export type PainPointUpdate = z.infer<typeof painPointUpdateSchema>;
export type SessionUpdate = z.infer<typeof sessionUpdateSchema>;