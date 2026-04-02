import type { Rule, Match } from "./types";

/**
 * Rule: 20 points for each instance of Ivy League namedropping.
 * Also includes other prestigious institutions commonly namedropped.
 */

const INSTITUTIONS = [
  // Ivy League
  "Harvard",
  "Yale",
  "Princeton",
  "Columbia",
  "Cornell",
  "Penn(?:sylvania)?",
  "Dartmouth",
  "Brown",
  // Other frequently namedropped
  "MIT",
  "Stanford",
  "Caltech",
  "Oxford",
  "Cambridge",
  "Berkeley",
  "Carnegie Mellon",
];

// Patterns that suggest namedropping rather than neutral mention
const NAMEDROP_CONTEXTS = [
  // "researchers from X", "team from X", "scientists at X"
  (inst: string) =>
    new RegExp(
      `\\b(?:researchers?|scientists?|engineers?|experts?|team|professors?|PhDs?|alumni|fellows?|faculty)\\s+(?:from|at|out\\s+of)\\s+(?:the\\s+)?${inst}\\b`,
      "gi"
    ),
  // "X-trained", "X-educated", "X-backed"
  (inst: string) =>
    new RegExp(`\\b${inst}[- ](?:trained|educated|backed|grad(?:uate)?s?|alum(?:ni|s)?)\\b`, "gi"),
  // "developed at X", "built at X", "born at X"
  (inst: string) =>
    new RegExp(
      `\\b(?:developed|built|created|designed|invented|born|incubated|spun\\s+out)\\s+(?:at|from|out\\s+of)\\s+(?:the\\s+)?${inst}\\b`,
      "gi"
    ),
  // "backed by X", "funded by X"
  (inst: string) =>
    new RegExp(`\\b(?:backed|funded|supported|endorsed)\\s+by\\s+(?:the\\s+)?${inst}\\b`, "gi"),
  // "from X University/Lab"
  (inst: string) =>
    new RegExp(
      `\\bfrom\\s+(?:the\\s+)?${inst}\\s+(?:University|Lab(?:oratory)?|Institute|School|Center|Centre)\\b`,
      "gi"
    ),
  // "X PhD", "X professor"
  (inst: string) =>
    new RegExp(
      `\\b${inst}\\s+(?:PhDs?|professors?|researchers?|scientists?|engineers?|fellows?|scholars?|dropouts?)\\b`,
      "gi"
    ),
  // Standalone mentions preceded by "our" or "the" in boastful context
  (inst: string) =>
    new RegExp(
      `\\b(?:our|the)\\s+${inst}\\s+(?:team|pedigree|heritage|roots|lineage|connection|network|talent)\\b`,
      "gi"
    ),
  // "founded by X alumni/graduates"
  (inst: string) =>
    new RegExp(
      `\\bfounded\\s+by\\s+(?:a\\s+)?(?:team\\s+of\\s+)?${inst}\\s+(?:alum(?:ni|s)?|grad(?:uate)?s?|PhDs?)\\b`,
      "gi"
    ),
];

export const ivyLeague: Rule = {
  id: "ivy-league",
  label: "Ivy League Namedropping",
  description: "20 points for each instance of Ivy League namedropping.",
  pointsPer: 20,
  mode: "per-match",
  detect(text: string): Match[] {
    const matches: Match[] = [];
    const seen = new Set<number>();

    for (const inst of INSTITUTIONS) {
      for (const makePattern of NAMEDROP_CONTEXTS) {
        const pattern = makePattern(inst);
        let m: RegExpExecArray | null;
        while ((m = pattern.exec(text)) !== null) {
          let dominated = false;
          for (const s of seen) {
            if (Math.abs(s - m.index) < 10) {
              dominated = true;
              break;
            }
          }
          if (dominated) continue;
          seen.add(m.index);

          const start = Math.max(0, m.index - 20);
          const end = Math.min(text.length, m.index + m[0].length + 20);
          const snippet = text.slice(start, end).replace(/\n/g, " ");

          matches.push({
            snippet: (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : ""),
            reason: `Ivy League / elite institution namedrop: "${m[0].trim()}"`,
            start: m.index,
            end: m.index + m[0].length,
          });
        }
      }
    }

    return matches;
  },
};
