import type { PredefinedPainPoint, PainPoint } from "@/types/TPainPoint";
import type { SessionHistorySlot } from "@/types/TSessionHistory";
import { SESSION_USER_MESSAGE_TEMPLATE } from "./session-prompt";

/**
 * Builds the formatted list of available body zones
 */
function formatAvailableZones(predefinedPoints: PredefinedPainPoint[]): string {
  return predefinedPoints
    .map((p) => `  <zone name="${p.name}" label="${p.label}" category="${p.category}" />`)
    .join("\n");
}

/**
 * Formats current pain points with source information
 */
function formatCurrentPainPoints(
  painPoints: PainPoint[],
  predefinedPoints: PredefinedPainPoint[]
): string {
  if (painPoints.length === 0) {
    return "  <empty>No pain points currently</empty>";
  }

  return painPoints
    .map((p) => {
      const source = p.meshName ? "ai" : "user";
      const nearestMesh = p.meshName ?? findNearestMesh(p, predefinedPoints);

      return `  <point id="${p.id}" source="${source}" ${p.meshName ? `mesh="${p.meshName}"` : `near_mesh="${nearestMesh}"`}>
    <position x="${p.posX.toFixed(3)}" y="${p.posY.toFixed(3)}" z="${p.posZ.toFixed(3)}" />
    <label>${p.label || "Unnamed"}</label>
    <type>${p.type}</type>
    <rating>${p.rating}/10</rating>
    ${p.notes ? `<notes>${p.notes}</notes>` : ""}
  </point>`;
    })
    .join("\n");
}

/**
 * Find nearest predefined mesh for user-placed points
 */
function findNearestMesh(
  point: PainPoint,
  predefinedPoints: PredefinedPainPoint[]
): string {
  let nearest = predefinedPoints[0]?.name ?? "unknown";
  let minDist = Infinity;

  for (const pred of predefinedPoints) {
    const dx = point.posX - pred.position[0];
    const dy = point.posY - pred.position[1];
    const dz = point.posZ - pred.position[2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (dist < minDist) {
      minDist = dist;
      nearest = pred.name;
    }
  }

  return nearest;
}

/**
 * Formats a single history slot with its pain points
 */
function formatHistorySlot(slot: SessionHistorySlot): string {
  const painPointsXml =
    slot.painPoints.length > 0
      ? slot.painPoints
          .map(
            (p) => `      <pain_point source="${p.meshName ? "ai" : "user"}">
        <label>${p.label}</label>
        <type>${p.type}</type>
        <rating>${p.rating}/10</rating>
        ${p.meshName ? `<mesh>${p.meshName}</mesh>` : ""}
        ${p.notes ? `<notes>${p.notes}</notes>` : ""}
      </pain_point>`
          )
          .join("\n")
      : "      <empty>None</empty>";

  return `  <slot index="${slot.index}" timestamp="${slot.createdAt.toISOString()}">
    <user_message>${slot.userMessage || "N/A"}</user_message>
    <notes>${slot.notes || "N/A"}</notes>
    <pain_points>
${painPointsXml}
    </pain_points>
  </slot>`;
}

/**
 * Builds the formatted session history
 */
function formatSessionHistory(historySlots: SessionHistorySlot[]): string {
  if (historySlots.length === 0) {
    return "  <empty>No history yet</empty>";
  }

  return historySlots.map(formatHistorySlot).join("\n\n");
}

/**
 * Builds the complete session prompt
 */
export function buildSessionPrompt(
  predefinedPoints: PredefinedPainPoint[],
  historySlots: SessionHistorySlot[],
  currentPainPoints: PainPoint[],
  userMessage: string
): string {
  const availableZones = formatAvailableZones(predefinedPoints);
  const sessionHistory = formatSessionHistory(historySlots);
  const currentPoints = formatCurrentPainPoints(currentPainPoints, predefinedPoints);

  return SESSION_USER_MESSAGE_TEMPLATE.replace("{{AVAILABLE_ZONES}}", availableZones)
    .replace("{{SESSION_HISTORY}}", sessionHistory)
    .replace("{{CURRENT_PAIN_POINTS}}", currentPoints)
    .replace("{{USER_MESSAGE}}", userMessage);
}