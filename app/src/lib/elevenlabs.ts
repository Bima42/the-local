import { ElevenLabsClient } from "elevenlabs";
import { env } from "@/config/env";

let client: ElevenLabsClient | null = null;

export function getElevenLabsClient() {
  if (!client) {
    client = new ElevenLabsClient({ apiKey: env.ELEVENLABS_API_KEY });
  }
  return client;
}