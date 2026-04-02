export interface Match {
  /** The matched text fragment */
  snippet: string;
  /** Short explanation of why this matched */
  reason: string;
  /** Start index in the original text */
  start: number;
  /** End index in the original text */
  end: number;
}

export interface Rule {
  id: string;
  label: string;
  description: string;
  pointsPer: number;
  /** Whether the rule scores once (boolean) or per-match */
  mode: "per-match" | "boolean";
  detect: (text: string) => Match[];
}

export interface RuleResult {
  rule: Rule;
  matches: Match[];
  points: number;
}

export interface ScoreResult {
  total: number;
  ruleResults: RuleResult[];
}
