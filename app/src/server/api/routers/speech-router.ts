import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getElevenLabsClient } from "@/lib/elevenlabs";

export const speechRouter = createTRPCRouter({
  transcribe: publicProcedure
    .input(
      z.object({
        audioData: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const base64Data = input.audioData.split(",")[1];
        if (!base64Data) {
          throw new Error("Invalid audio data format");
        }

        const buffer = Buffer.from(base64Data, "base64");
        const audioBlob = new Blob([buffer], { type: "audio/webm" });

        console.log("[Speech-to-Text] Transcribing audio...");

        const transcription = await getElevenLabsClient().speechToText.convert({
          file: audioBlob,
          model_id: "scribe_v2",
        });

        console.log("[Speech-to-Text] Transcription successful:", {
          textLength: transcription.text?.length || 0,
        });

        return {
          text: transcription.text || "",
          success: true,
        };
      } catch (error) {
        console.error("[Speech-to-Text] Error:", error);
        
        return {
          text: "",
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});