import type { Rule, Match } from "./types";

/**
 * Rule: 40 points for each research "collaboration" that cannot be verified.
 *
 * Detects vague collaboration claims without supporting links or details.
 */

const COLLAB_PATTERNS = [
  /\bin\s+(?:close\s+)?(?:collaboration|partnership|cooperation)\s+with\s+(?:leading\s+)?(.{2,80}?)(?:\.|,|;|\band\b)/gi,
  /\bpartner(?:ed|ing|s)?\s+with\s+(?:leading\s+|top\s+|world[- ]class\s+)?(.{2,80}?)(?:\.|,|;|\band\b)/gi,
  /\bworking\s+(?:closely\s+)?with\s+(?:leading\s+|top\s+|world[- ]class\s+)?(?:researchers?|scientists?|experts?|institutions?|labs?|universities?|teams?)\s+(?:at|from|in)\s+(.{2,80}?)(?:\.|,|;)/gi,
  /\bjoint\s+(?:research|development|project|initiative|venture|effort)\s+with\s+(.{2,80}?)(?:\.|,|;)/gi,
  /\b(?:research|development)\s+(?:collaboration|partnership)\s+with\s+(.{2,80}?)(?:\.|,|;)/gi,
  /\bco[- ]developed\s+with\s+(.{2,80}?)(?:\.|,|;)/gi,
  /\b(?:advised|supported|guided)\s+by\s+(?:leading\s+|top\s+|world[- ](?:class|renowned)\s+)?(?:researchers?|scientists?|experts?|professors?|advisors?)\b/gi,
  /\bscientific\s+advisory\s+board\b/gi,
  /\b(?:acclaimed|renowned|distinguished|eminent|world[- ](?:class|renowned|leading))\s+(?:researchers?|scientists?|experts?|team)\b/gi,
];

// Indicators that the collaboration might be verifiable
const VERIFICATION_INDICATORS = [
  /https?:\/\/\S+/,
  /\bdoi\s*[:.]?\s*10\.\d{4,}/i,
  /arxiv[:.]\s*\d{4}\.\d+/i,
  /\bet\s+al\.?\b/i,
  /\[\d+\]/,
  /\bpublished\s+(?:in|at)\b/i,
  /\bpeer[- ]reviewed\b/i,
  /\bpaper\s+(?:titled|entitled)\b/i,
];

function isVerifiable(text: string, matchStart: number): boolean {
  // Check nearby text (within 300 chars) for verification indicators
  const windowStart = Math.max(0, matchStart - 150);
  const windowEnd = Math.min(text.length, matchStart + 300);
  const window = text.slice(windowStart, windowEnd);
  return VERIFICATION_INDICATORS.some((p) => p.test(window));
}

export const fakeCollab: Rule = {
  id: "fake-collab",
  label: "Unverifiable Collaborations",
  description: '40 points for each research "collaboration" that cannot be verified.',
  pointsPer: 40,
  mode: "per-match",
  detect(text: string): Match[] {
    const matches: Match[] = [];
    const seen = new Set<number>();

    for (const pattern of COLLAB_PATTERNS) {
      pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        let dominated = false;
        for (const s of seen) {
          if (Math.abs(s - m.index) < 20) {
            dominated = true;
            break;
          }
        }
        if (dominated) continue;

        if (isVerifiable(text, m.index)) continue;

        seen.add(m.index);

        const snippet = m[0].replace(/\n/g, " ").slice(0, 120);
        matches.push({
          snippet: snippet + (m[0].length > 120 ? "…" : ""),
          reason: `Unverifiable collaboration claim: "${m[0].trim().slice(0, 80)}"`,
          start: m.index,
          end: m.index + m[0].length,
        });
      }
    }

    return matches;
  },
};
