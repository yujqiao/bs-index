import type { Rule, Match } from "./types";

/**
 * Rule: 20 points for referring to "emergent properties" where this
 * is clearly not warranted.
 */

const PATTERNS = [
  /\bemergent\s+(?:propert(?:y|ies)|behavio(?:u?r|u?rs)|capabilit(?:y|ies)|intelligence|feature(?:s)?|phenomenon|phenomena|pattern(?:s)?|quality|qualities|characteristic(?:s)?)\b/gi,
  /\bemergence\s+(?:of|in|from|through)\b/gi,
  /\b(?:true|genuine|real|organic|spontaneous|natural)\s+emergence\b/gi,
  /\bemerge(?:s|d)?\s+(?:naturally|organically|spontaneously|autonomously)\b/gi,
  /\bself[- ](?:organiz(?:e|es|ed|ing)|assembl(?:e|es|ed|ing)|evolv(?:e|es|ed|ing))\b/gi,
  /\b(?:propert(?:y|ies)|behavio(?:u?r|u?rs)|intelligence|capabilit(?:y|ies))\s+(?:that\s+)?emerge(?:s|d)?\b/gi,
];

// If the text is clearly about complex systems science, these terms may be legit
const LEGITIMATE_CONTEXT = [
  /\bcomplex(?:ity)?\s+(?:science|theory|systems)\b/i,
  /\bcellular\s+automat(?:a|on)\b/i,
  /\bagent[- ]based\s+model/i,
  /\bswarm\s+intelligence\b/i,
  /\bself[- ]organiz(?:ation|ing)\s+(?:maps?|systems?|networks?)\b/i,
  /\bet\s+al\b/i,
  /\barxiv\b/i,
];

export const emergentProps: Rule = {
  id: "emergent-properties",
  label: "Emergent Properties",
  description:
    '20 points for referring to "emergent properties" where this is clearly not warranted.',
  pointsPer: 20,
  mode: "per-match",
  detect(text: string): Match[] {
    // If the entire text seems to be legitimately about complex systems, skip
    const legitimateCount = LEGITIMATE_CONTEXT.filter((p) => p.test(text)).length;
    if (legitimateCount >= 2) return [];

    const matches: Match[] = [];
    const seen = new Set<number>();

    for (const pattern of PATTERNS) {
      pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        let dominated = false;
        for (const s of seen) {
          if (Math.abs(s - m.index) < 15) {
            dominated = true;
            break;
          }
        }
        if (dominated) continue;
        seen.add(m.index);

        const start = Math.max(0, m.index - 40);
        const end = Math.min(text.length, m.index + m[0].length + 40);
        const snippet = text.slice(start, end).replace(/\n/g, " ");

        matches.push({
          snippet: (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : ""),
          reason: `Unwarranted use of emergence: "${m[0].trim()}"`,
          start: m.index,
          end: m.index + m[0].length,
        });
      }
    }

    return matches;
  },
};
