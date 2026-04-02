import type { Rule, Match } from "./types";

/**
 * Rule: 20 points for claiming that the product does what "nature" does
 * or what "the universe" does.
 */

const PATTERNS = [
  /\b(?:like|as|the\s+way|just\s+as|much\s+like|inspired\s+by|modeled\s+(?:on|after)|mimick?(?:s|ing|ed)?|mirror(?:s|ing|ed)?)\s+nature\b/gi,
  /\bwhat\s+nature\s+(?:does|has\s+(?:always\s+)?done|intended|designed)\b/gi,
  /\bas\s+nature\s+intended\b/gi,
  /\bnature['']s\s+(?:own|way|design|blueprint|algorithm|intelligence|wisdom|logic|approach|solution|method)\b/gi,
  /\b(?:harness(?:es|ed|ing)?|tap(?:ping|s|ped)?\s+into|leverag(?:e|es|ed|ing)|channel(?:s|ed|ing)?|unlock(?:s|ed|ing)?)\s+(?:the\s+)?(?:power|force|energy|wisdom|intelligence|beauty)\s+of\s+nature\b/gi,
  /\bthe\s+(?:way|how)\s+the\s+universe\s+(?:works|operates|functions|computes|processes|thinks|evolves)\b/gi,
  /\b(?:like|as|the\s+way|just\s+as)\s+the\s+universe\b/gi,
  /\bthe\s+universe['']s\s+(?:own|way|design|blueprint|algorithm|intelligence|wisdom|logic)\b/gi,
  /\b(?:harness(?:es|ed|ing)?|tap(?:ping|s|ped)?\s+into|leverag(?:e|es|ed|ing)|channel(?:s|ed|ing)?|unlock(?:s|ed|ing)?)\s+(?:the\s+)?(?:power|force|energy|wisdom|intelligence)\s+of\s+the\s+universe\b/gi,
  /\b(?:built|designed|engineered|architected|modeled)\s+(?:the\s+way\s+)?(?:like\s+)?nature\b/gi,
  /\b(?:nature|the\s+universe)\s+(?:has\s+)?(?:already\s+)?(?:solved|figured\s+out|optimized|perfected)\b/gi,
  /\blearning\s+from\s+(?:nature|the\s+universe|the\s+cosmos)\b/gi,
  /\b(?:cosmic|universal)\s+(?:intelligence|wisdom|truth|principle|law|order)\b/gi,
  /\bthe\s+natural\s+(?:order|law|intelligence|wisdom)\s+of\s+(?:things|the\s+universe|the\s+cosmos)\b/gi,
  /\b(?:follow|obey|align\s+with|in\s+harmony\s+with)\s+(?:the\s+laws\s+of\s+)?nature\b/gi,
  /\bbiomimetic\b/gi,
  /\bbio[- ]?inspired\b/gi,
];

export const natureUniverse: Rule = {
  id: "nature-universe",
  label: "Nature / Universe Claims",
  description:
    '20 points for claiming that the product does what "nature" does or what "the universe" does.',
  pointsPer: 20,
  mode: "per-match",
  detect(text: string): Match[] {
    const matches: Match[] = [];
    const seen = new Set<number>();

    for (const pattern of PATTERNS) {
      pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        // Deduplicate overlapping matches
        let dominated = false;
        for (const s of seen) {
          if (Math.abs(s - m.index) < 10) {
            dominated = true;
            break;
          }
        }
        if (dominated) continue;
        seen.add(m.index);

        const start = Math.max(0, m.index - 30);
        const end = Math.min(text.length, m.index + m[0].length + 30);
        const snippet = text.slice(start, end).replace(/\n/g, " ");

        matches.push({
          snippet: (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : ""),
          reason: `Claims product mimics nature/universe: "${m[0].trim()}"`,
          start: m.index,
          end: m.index + m[0].length,
        });
      }
    }

    return matches;
  },
};
