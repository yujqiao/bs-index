import type { RuleResult } from "@/lib/rules/types";
import { RubricItem } from "./RubricItem";

interface RubricBreakdownProps {
  ruleResults: RuleResult[];
}

export function RubricBreakdown({ ruleResults }: RubricBreakdownProps) {
  const triggered = ruleResults.filter((r) => r.matches.length > 0);
  const untriggered = ruleResults.filter((r) => r.matches.length === 0);

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-muted-foreground px-3 pb-1">
        Breakdown{" "}
        <span className="font-normal">
          ({triggered.length} of {ruleResults.length} rules triggered)
        </span>
      </h3>
      {triggered.map((result) => (
        <RubricItem key={result.rule.id} result={result} />
      ))}
      {untriggered.length > 0 && (
        <>
          <div className="border-t my-2" />
          {untriggered.map((result) => (
            <RubricItem key={result.rule.id} result={result} />
          ))}
        </>
      )}
    </div>
  );
}
