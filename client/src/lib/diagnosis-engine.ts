/**
 * Nail Diagnosis Engine
 * Intelligent condition matching based on user-selected symptoms,
 * body area, and duration.
 */

import {
  conditions,
  durationOptions,
  type NailCondition,
  type Severity,
  type BodyArea,
} from "@/data/nail-conditions";

export interface DiagnosisInput {
  /** Body area: hands, feet, or both */
  area: BodyArea;
  /** Array of symptom IDs the user selected */
  symptoms: string[];
  /** Duration ID */
  duration: string;
}

export interface DiagnosisMatch {
  condition: NailCondition;
  /** 0-100 confidence score */
  confidence: number;
  /** Estimated severity based on symptoms + duration */
  estimatedSeverity: Severity;
  /** Specific matching symptoms for this condition */
  matchedSymptoms: string[];
}

export interface DiagnosisResult {
  /** Ranked matches from highest to lowest confidence */
  matches: DiagnosisMatch[];
  /** Overall urgency level */
  urgency: "baja" | "media" | "alta";
  /** Whether we strongly recommend professional consultation */
  recommendProfessional: boolean;
  /** Personalized message */
  summary: string;
}

/**
 * Run the diagnosis engine against user input.
 * Returns ranked condition matches with confidence scores.
 */
export function runDiagnosis(input: DiagnosisInput): DiagnosisResult {
  const { area, symptoms, duration } = input;

  // Get duration weight multiplier
  const durationWeight =
    durationOptions.find((d) => d.id === duration)?.weight ?? 1;

  // Score each condition — primary symptoms MUST drive the result
  const scored: DiagnosisMatch[] = conditions
    .map((condition) => {
      // Filter by body area
      if (
        condition.affectedArea !== "ambos" &&
        condition.affectedArea !== area &&
        area !== "ambos"
      ) {
        return null;
      }

      // Count matching symptoms (all)
      const matchedSymptoms = symptoms.filter((s) =>
        condition.matchingSymptoms.includes(s)
      );
      const matchCount = matchedSymptoms.length;

      if (matchCount === 0) return null;

      // Count PRIMARY symptom matches — these are the hallmark indicators
      const primaryMatches = symptoms.filter((s) =>
        condition.primarySymptoms.includes(s)
      ).length;
      const secondaryOnlyMatches = matchCount - primaryMatches;
      const hasPrimarySymptoms = condition.primarySymptoms.length > 0;

      // ── CORE RULE: Primary symptoms drive confidence ──
      // A condition with a primary match ALWAYS beats one without
      let confidence: number;

      if (primaryMatches > 0) {
        // Strong match: user selected a hallmark symptom for this condition
        // First primary = 45 pts, each additional primary = +20, secondaries = +8 each
        confidence = 45 + (primaryMatches - 1) * 20 + secondaryOnlyMatches * 8;
      } else if (!hasPrimarySymptoms && matchCount >= 2) {
        // Conditions with no defined primaries (psoriasis, ridges) need multiple matches
        confidence = matchCount * 15;
      } else {
        // Only secondary matches — this is a weak/incidental match
        // Cap low so it doesn't outrank conditions with primary matches
        confidence = secondaryOnlyMatches * 10;
      }

      // High-confidence threshold bonus (smaller, just a nudge)
      if (matchCount >= condition.minHighConfidence) {
        confidence += 8;
      }

      // Duration factor (small)
      confidence += Math.min(durationWeight * 5, 10);

      // Prevalence is a TIEBREAKER only, not a dominator
      confidence += (condition.prevalence - 1) * 5;

      // Clamp
      confidence = Math.max(confidence, 12);
      confidence = Math.min(confidence, 98);

      // Estimate severity
      let estimatedSeverity: Severity = "leve";
      const totalWeight = primaryMatches * 2 + secondaryOnlyMatches;
      const severityScore = totalWeight + durationWeight;
      if (severityScore >= 5) estimatedSeverity = "severo";
      else if (severityScore >= 3) estimatedSeverity = "moderado";

      return {
        condition,
        confidence: Math.round(confidence),
        estimatedSeverity,
        matchedSymptoms,
      };
    })
    .filter((m): m is DiagnosisMatch => m !== null)
    .sort((a, b) => b.confidence - a.confidence);

  // Determine overall urgency
  const topMatch = scored[0];
  let urgency: "baja" | "media" | "alta" = "baja";
  let recommendProfessional = false;

  if (topMatch) {
    if (
      topMatch.estimatedSeverity === "severo" ||
      topMatch.confidence >= 70
    ) {
      urgency = "alta";
      recommendProfessional = true;
    } else if (
      topMatch.estimatedSeverity === "moderado" ||
      topMatch.confidence >= 45
    ) {
      urgency = "media";
      recommendProfessional = true;
    }
  }

  // Check for danger signs that always recommend professional
  const dangerSymptoms = ["pain", "swelling", "green", "brown_black"];
  if (symptoms.some((s) => dangerSymptoms.includes(s))) {
    recommendProfessional = true;
    if (urgency === "baja") urgency = "media";
  }

  // Chronic duration always recommends professional
  if (duration === "chronic" || duration === "long") {
    recommendProfessional = true;
  }

  // Generate personalized summary
  const summary = generateSummary(scored, urgency, area);

  return {
    matches: scored.slice(0, 3), // Top 3 matches
    urgency,
    recommendProfessional,
    summary,
  };
}

function generateSummary(
  matches: DiagnosisMatch[],
  urgency: string,
  area: BodyArea
): string {
  if (matches.length === 0) {
    return "No encontramos una coincidencia clara con tus síntomas. Te recomendamos una evaluación profesional para un diagnóstico preciso.";
  }

  const top = matches[0];
  const areaText =
    area === "manos"
      ? "de las manos"
      : area === "pies"
        ? "de los pies"
        : "de manos y pies";

  if (urgency === "alta") {
    return `Según tus síntomas, es muy probable que se trate de ${top.condition.shortName}. Te recomendamos una evaluación profesional pronto para confirmar y comenzar el tratamiento adecuado. ¡La buena noticia es que tiene solución!`;
  }

  if (urgency === "media") {
    return `Tus síntomas sugieren ${top.condition.shortName}. Hay cosas que puedes hacer en casa, pero te recomendamos una evaluación profesional para confirmar y obtener los mejores resultados.`;
  }

  return `Tus síntomas ${areaText} podrían estar relacionados con ${top.condition.shortName}. En esta etapa temprana, los cuidados en casa pueden ayudar mucho. Te compartimos recomendaciones específicas.`;
}
