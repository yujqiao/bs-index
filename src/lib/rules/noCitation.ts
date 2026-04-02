import type { Rule, Match } from "./types";

/**
 * Rule: 10 points for "inventing" something without providing any citation,
 * paper, or other specification.
 *
 * Triggers when the text contains invention/novelty claims but lacks any
 * citations, references, URLs, DOIs, or academic markers.
 */

const INVENTION_PATTERNS = [
  /\b(?:we\s+)?(?:invented|developed|created|designed|built|pioneered|discovered)\b/gi,
  /\b(?:our\s+)?(?:novel|groundbreaking|breakthrough|revolutionary|first[- ]of[- ](?:its|a)[- ]kind|patent(?:ed)?|proprietary)\b/gi,
  /\b(?:new\s+)?(?:paradigm|framework|architecture|methodology|approach|algorithm|technique|method|technology|platform|system|engine|model)\b/gi,
  /\bintroduc(?:e|es|ed|ing)\s+(?:a\s+)?(?:new|novel|unique)\b/gi,
  /\bunlike\s+(?:any|anything|other|traditional|existing|conventional)\b/gi,
];

const CITATION_PATTERNS = [
  /https?:\/\/\S+/i,
  /\bdoi\s*[:.]?\s*10\.\d{4,}/i,
  /arxiv[:.]\s*\d{4}\.\d+/i,
  /\bet\s+al\.?\b/i,
  /\[\d+\]/,
  /\(\d{4}\)/,
  /\b(?:IEEE|ACM|NeurIPS|ICML|ICLR|AAAI|CVPR|ECCV|Nature|Science|PNAS|JMLR)\b/,
  /\bpeer[- ]reviewed\b/i,
  /\bpublished\s+(?:in|at)\b/i,
  /\bpreprint\b/i,
  /\bjournal\b/i,
  /\bproceedings\b/i,
  /\brefer(?:ence|s)\b/i,
  /\bsee\s+(?:also\s+)?\[/i,
  /\bcf\.\b/i,
  /\bappendix\b/i,
  /\bsupplementary\b/i,
  /\bfootnote\b/i,
];

function hasCitations(text: string): boolean {
  return CITATION_PATTERNS.some((p) => p.test(text));
}

function findInventionClaims(text: string): Match[] {
  const matches: Match[] = [];
  const seen = new Set<string>();

  for (const pattern of INVENTION_PATTERNS) {
    // Reset lastIndex for global regex
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(text)) !== null) {
      const key = `${m.index}:${m[0]}`;
      if (seen.has(key)) continue;
      seen.add(key);

      // Get surrounding context (up to 60 chars each side)
      const start = Math.max(0, m.index - 40);
      const end = Math.min(text.length, m.index + m[0].length + 40);
      const snippet = text.slice(start, end).replace(/\n/g, " ");

      matches.push({
        snippet: (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : ""),
        reason: `Invention/novelty claim "${m[0]}" without any citation or reference`,
        start: m.index,
        end: m.index + m[0].length,
      });
    }
  }
  return matches;
}

export const noCitation: Rule = {
  id: "no-citation",
  label: "No Citation",
  description:
    '10 points for "inventing" something without providing any citation, paper, or other specification.',
  pointsPer: 10,
  mode: "boolean",
  detect(text: string): Match[] {
    if (text.trim().length < 20) return [];
    if (hasCitations(text)) return [];
    const claims = findInventionClaims(text);
    // Only trigger if we found at least one invention-style claim
    if (claims.length === 0) return [];
    // Return just the first match to signal "boolean" trigger
    return [claims[0]];
  },
};
