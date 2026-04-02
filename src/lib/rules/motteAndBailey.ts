import type { Rule, Match } from "./types";

/**
 * Rule: 20 points for doing the usual motte-and-bailey or hedging in
 * the form of "It is not X. It is Y."
 *
 * Detects patterns like:
 * - "It is not X. It is Y."
 * - "This isn't X — it's Y."
 * - "We don't X. We Y."
 * - "Not just X, but Y."
 * - "More than X. It's Y."
 * - "Beyond X."
 * - "X is dead. Long live Y."
 */

const PATTERNS: Array<{ regex: RegExp; label: string }> = [
  // "It is not X. It is Y." — period separator
  {
    regex:
      /(?:it|this|that|our\s+\w+)\s+(?:is|was)\s+not\s+(?:just\s+)?(.{2,60}?)\.\s+(?:it|this|that)\s+(?:is|was)\s+(.{2,80}?)\./gi,
    label: '"It is not X. It is Y."',
  },
  // "X is not Y, it is Z." — comma separator
  {
    regex:
      /\b(?:is|was)\s+not\s+(?:just\s+|an?\s+)?(.{2,60}?),\s*(?:it|this|that)\s+(?:is|was)\s+(.{2,80}?)[."]/gi,
    label: '"X is not Y, it is Z."',
  },
  // "is not X. It is Y." — subject before "is not" (e.g. "the ability... is not optional. It is foundational.")
  {
    regex:
      /\bis\s+not\s+(?:just\s+)?(.{2,60}?)\.\s+(?:It|This|That)\s+(?:is|was)\s+(.{2,80}?)\./gi,
    label: '"…is not X. It is Y."',
  },
  // "This isn't X — it's Y."
  {
    regex:
      /(?:it|this|that|our\s+\w+)\s+isn['']t\s+(?:just\s+)?(.{2,60}?)[.;,—–-]\s*(?:it|this|that)['']?s?\s+(.{2,80}?)\./gi,
    label: '"This isn\'t X — it\'s Y."',
  },
  // "We don't X. We Y."
  {
    regex:
      /we\s+don['']t\s+(?:just\s+)?(.{2,60}?)\.\s+we\s+(.{2,80}?)\./gi,
    label: '"We don\'t X. We Y."',
  },
  // "Not just X, but Y."
  {
    regex: /not\s+(?:just|merely|simply|only)\s+(.{2,60}?)[,;—–-]\s*but\s+(.{2,80}?)\./gi,
    label: '"Not just X, but Y."',
  },
  // "is not X but Y" — without qualifiers (e.g. "is not an afterthought but a strategic capability")
  {
    regex: /\b(?:is|was|are|were)\s+not\s+(?:an?\s+)?(.{2,60}?)\s+but\s+(?:an?\s+)?(.{2,60}?)\./gi,
    label: '"is not X but Y."',
  },
  // "More than X. It's Y."
  {
    regex:
      /(?:more|bigger|greater|deeper)\s+than\s+(?:just\s+)?(.{2,60}?)\.\s*(?:it|this|that|we)['']?(?:s|re)?\s+(.{2,80}?)\./gi,
    label: '"More than X. It\'s Y."',
  },
  // "go/move/push beyond X."
  {
    regex: /\b(?:go(?:ing|es)?|mov(?:e|es|ed|ing)|push(?:es|ed|ing)?)\s+beyond\s+(.{2,60}?)\./gi,
    label: '"Move/go beyond X."',
  },
  // "X rather than Y" — hedging via "rather than"
  {
    regex: /\bas\s+(?:a|an)\s+(.{2,60}?)\s+rather\s+than\s+(?:as\s+)?(?:a|an)\s+(.{2,60}?)[."]/gi,
    label: '"X rather than Y."',
  },
  // "X is dead. Long live Y."
  {
    regex: /(.{2,40}?)\s+(?:is|are)\s+dead\.\s*(?:long\s+live\s+)?(.{2,60}?)\./gi,
    label: '"X is dead. Long live Y."',
  },
  // "Forget X. Y."
  {
    regex: /\bforget\s+(?:about\s+)?(.{2,40}?)[.;—–-]\s*(.{2,80}?)\./gi,
    label: '"Forget X. Y."',
  },
  // "Stop X. Start Y."
  {
    regex: /\bstop\s+(?:thinking\s+(?:about|of)\s+)?(.{2,40}?)[.;—–-]\s*(?:start|think)\s+(.{2,80}?)\./gi,
    label: '"Stop X. Start Y."',
  },
];

export const motteAndBailey: Rule = {
  id: "motte-and-bailey",
  label: "Motte-and-Bailey",
  description:
    '20 points for doing the usual motte-and-bailey or hedging in the form of "It is not X. It is Y."',
  pointsPer: 20,
  mode: "per-match",
  detect(text: string): Match[] {
    const matches: Match[] = [];
    const seen = new Set<string>();

    for (const { regex, label } of PATTERNS) {
      regex.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) {
        const key = `${m.index}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const snippet = m[0].replace(/\n/g, " ").slice(0, 120);
        matches.push({
          snippet: snippet + (m[0].length > 120 ? "…" : ""),
          reason: `Motte-and-bailey pattern: ${label}`,
          start: m.index,
          end: m.index + m[0].length,
        });
      }
    }

    return matches;
  },
};
