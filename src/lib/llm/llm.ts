import OpenAI from "openai";
import { env } from "@/config/env";

const SYSTEM_MESSAGE = "You are a medical assistant helping to map pain points on a 3D body model. Analyze the user's message and session history to update the session state accordingly.";

export async function llmInvoke<T>(
  prompt: string,
  schema: any,
  model: string = "google/gemini-3-flash-preview"
): Promise<T> {
  const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: env.OPENROUTER_API_KEY,
  });

  const jsonSchema = {
    type: "object",
    properties: {
      notes: {
        type: "string",
        description: "General notes about the session"
      },
      painPoints: {
        type: "array",
        description: "List of pain points to create (full override)",
        items: {
          type: "object",
          properties: {
            meshName: {
              type: "string",
              description: "Name of the predefined mesh zone (e.g., 'hand-right', 'foot-left')"
            },
            label: {
              type: "string",
              description: "Label describing the pain"
            },
            type: {
              type: "string",
              enum: ["sharp", "dull", "burning", "tingling", "throbbing", "cramping", "shooting", "other"],
              description: "Type of pain"
            },
            notes: {
              type: "string",
              description: "Additional notes about this pain point"
            },
            rating: {
              type: "integer",
              minimum: 0,
              maximum: 10,
              description: "Pain intensity from 0 to 10"
            }
          },
          required: ["meshName", "label", "type", "rating"],
          additionalProperties: false
        }
      }
    },
    additionalProperties: false
  };

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: SYSTEM_MESSAGE,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "session_update",
          strict: true,
          schema: jsonSchema,
        },
      },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    return schema.parse(parsed);
  } catch (error) {
    console.error("[LLM] Parsing error:", error);
    throw error;
  }
}