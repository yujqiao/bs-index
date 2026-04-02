import type { Rule, Match } from "./types";

/**
 * Rule: 30 points for having NO falsifiable claims or predictions
 * anywhere in the "technical" description.
 *
 * A falsifiable claim contains measurable, verifiable information:
 * numbers, percentages, benchmarks, specific dates, comparisons with
 * named baselines, concrete metrics.
 */

const FALSIFIABLE_INDICATORS = [
  // Specific numbers with units
  /\b\d+(?:\.\d+)?(?:\s*(?:%|percent|ms|seconds?|minutes?|hours?|days?|x|times|faster|slower|cheaper|more|less|tokens?|parameters?|users?|customers?|clients?|TB|GB|MB|KB|TFLOPS?|GFLOPS?|QPS|RPS|TPS|ops\/s))\b/i,
  // Dollar amounts
  /\$\d+(?:[,.]?\d+)*(?:\s*(?:M|B|K|million|billion|thousand))?/i,
  // Specific years or dates
  /\b(?:20[12]\d|Q[1-4]\s+20[12]\d|January|February|March|April|May|June|July|August|September|October|November|December)\s+20[12]\d\b/i,
  // Named benchmarks or comparisons
  /\b(?:benchmark(?:s|ed|ing)?|baseline|compared?\s+(?:to|with|against)|outperform(?:s|ed|ing)?|state[- ]of[- ]the[- ]art|SOTA|SoTA)\b/i,
  // Specific metrics
  /\b(?:accuracy|precision|recall|F1|AUC|ROC|latency|throughput|uptime|SLA|availability)\s*(?:of|:|\s+is|\s+=)\s*\d/i,
  // "reduces X by Y%", "improves X by Y"
  /\b(?:reduc|improv|increas|decreas)(?:e|es|ed|ing)\s+.{1,30}\bby\s+\d/i,
  // Peer-reviewed or reproducible claims
  /\b(?:reproducib(?:le|ility)|peer[- ]reviewed|independently\s+verified|audited)\b/i,
  // Confidence intervals, p-values
  /\b(?:p\s*[<>=]\s*0\.\d|confidence\s+interval|statistical(?:ly)?\s+significant)\b/i,
];

export const noFalsifiable: Rule = {
  id: "no-falsifiable",
  label: "No Falsifiable Claims",
  description:
    '30 points for having no falsifiable claims or predictions anywhere in the "technical" description.',
  pointsPer: 30,
  mode: "boolean",
  detect(text: string): Match[] {
    // Only meaningful for texts of reasonable length
    if (text.trim().split(/\s+/).length < 30) return [];

    const hasFalsifiable = FALSIFIABLE_INDICATORS.some((p) => p.test(text));
    if (hasFalsifiable) return [];

    return [
      {
        snippet: text.slice(0, 100).replace(/\n/g, " ") + (text.length > 100 ? "…" : ""),
        reason:
          "No falsifiable claims found: no numbers, percentages, benchmarks, dates, or measurable predictions",
        start: 0,
        end: text.length,
      },
    ];
  },
};
