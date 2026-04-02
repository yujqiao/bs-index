import type { Rule, RuleResult, ScoreResult } from "./rules/types";
import {
  noCitation,
  misusedTerms,
  motteAndBailey,
  pseudoProfound,
  natureUniverse,
  emergentProps,
  ivyLeague,
  noFalsifiable,
  fakeCollab,
} from "./rules";

const BASE_SCORE = 5;

export const ALL_RULES: Rule[] = [
  noCitation,
  misusedTerms,
  motteAndBailey,
  pseudoProfound,
  natureUniverse,
  emergentProps,
  ivyLeague,
  noFalsifiable,
  fakeCollab,
];

export function score(text: string): ScoreResult {
  const ruleResults: RuleResult[] = ALL_RULES.map((rule) => {
    const matches = rule.detect(text);
    const points =
      rule.mode === "boolean"
        ? matches.length > 0
          ? rule.pointsPer
          : 0
        : matches.length * rule.pointsPer;
    return { rule, matches, points };
  });

  const total =
    BASE_SCORE + ruleResults.reduce((sum, r) => sum + r.points, 0);

  return { total, ruleResults };
}

export function getVerdict(total: number): {
  label: string;
  emoji: string;
  color: string;
} {
  if (total <= 5)
    return { label: "Seems Legit", emoji: "✅", color: "text-green-600" };
  if (total <= 35)
    return { label: "Mild BS Detected", emoji: "🤔", color: "text-yellow-600" };
  if (total <= 75)
    return { label: "Significant BS", emoji: "⚠️", color: "text-orange-500" };
  if (total <= 125)
    return { label: "Major BS Alert", emoji: "🚨", color: "text-red-500" };
  return { label: "Weapons-Grade BS", emoji: "🔥", color: "text-red-700" };
}
