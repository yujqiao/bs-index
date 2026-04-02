import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { RuleResult } from "@/lib/rules/types";
import { useState } from "react";

interface RubricItemProps {
  result: RuleResult;
}

export function RubricItem({ result }: RubricItemProps) {
  const [open, setOpen] = useState(false);
  const { rule, matches, points } = result;
  const triggered = matches.length > 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors hover:bg-accent/50 cursor-pointer ${
          triggered ? "bg-accent/30" : ""
        }`}
      >
          <ChevronRight
            className={`h-4 w-4 mt-1 shrink-0 transition-transform ${
              open ? "rotate-90" : ""
            } ${!triggered ? "opacity-30" : ""}`}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm font-medium ${
                  triggered ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {rule.label}
              </span>
              <Badge
                variant={triggered ? "default" : "outline"}
                className={`text-xs ${
                  triggered ? "" : "opacity-50"
                }`}
              >
                {rule.mode === "boolean"
                  ? `${rule.pointsPer} pts`
                  : `${rule.pointsPer} pts each`}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {rule.description}
            </p>
          </div>
          <div className="shrink-0 text-right">
            {triggered ? (
              <div>
                <span className="text-sm font-bold text-red-500">
                  +{points}
                </span>
                {rule.mode === "per-match" && matches.length > 1 && (
                  <span className="text-xs text-muted-foreground block">
                    ×{matches.length}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">—</span>
            )}
          </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {matches.length > 0 && (
          <div className="ml-10 mr-3 mb-3 space-y-2">
            {matches.map((match, i) => (
              <div
                key={i}
                className="rounded-md bg-muted/50 p-2.5 text-xs space-y-1"
              >
                <p className="text-muted-foreground italic">
                  "{match.snippet}"
                </p>
                <p className="text-muted-foreground/80">{match.reason}</p>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
