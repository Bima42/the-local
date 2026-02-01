import type { SessionWithPainPoints } from "@/types/TSession";
import type { PredefinedPainPoint } from "@/types/TPainPoint";
import type { SessionHistorySlot } from "@/types/TSessionHistory";

export function buildSessionPrompt(
  session: SessionWithPainPoints,
  predefinedPoints: PredefinedPainPoint[],
  historySlots: SessionHistorySlot[],
  userMessage: string
): string {
  const availableZones = predefinedPoints
    .map((p) => `- ${p.name}: ${p.label}`)
    .join("\n");

  const history = historySlots.length > 0
    ? historySlots
        .map((slot) => {
          const slotPoints = slot.painPoints.length > 0
            ? slot.painPoints
                .map((p) => `    - ${p.label} (${p.type}, intensity: ${p.rating}/10)${p.notes ? `\n      Notes: ${p.notes}` : ""}`)
                .join("\n")
            : "    No pain points";

          return `Slot #${slot.index} (${slot.createdAt.toISOString()}):
  User: ${slot.userMessage || "N/A"}
  Notes: ${slot.notes || "N/A"}
  Pain points:
${slotPoints}`;
        })
        .join("\n\n")
    : "No history yet";

  return `Available body zones (use these mesh names):
${availableZones}

Session history:
${history}

New user message: ${userMessage}

Update the session based on all the context above. Use only mesh names from the available zones list.`;
}