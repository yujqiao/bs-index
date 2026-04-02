import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TextInput } from "@/components/TextInput";
import { ScoreBoard } from "@/components/ScoreBoard";
import { RubricBreakdown } from "@/components/RubricBreakdown";
import { score } from "@/lib/scorer";

function App() {
  const [text, setText] = useState("");

  const result = useMemo(() => score(text), [text]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The AI Marketing BS Index
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm leading-relaxed">
            Inspired by{" "}
            <a
              href="https://bastian.rieck.me/blog/2026/bs/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Bastian Rieck's BS Index
            </a>{" "}
            and{" "}
            <a
              href="https://math.ucr.edu/home/baez/crackpot.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              John Baez's Crackpot Index
            </a>
            . Paste marketing text below to score it automatically.
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <TextInput value={text} onChange={setText} />
              </CardContent>
            </Card>
          </div>

          {/* Right: Results */}
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-2">
                <ScoreBoard total={result.total} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-2">
                <RubricBreakdown ruleResults={result.ruleResults} />
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pb-6 space-y-1">
          <p>
            Original rubric by{" "}
            <a
              href="https://bastian.rieck.me/blog/2026/bs/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Bastian Rieck
            </a>
            . Scoring is heuristic-based (regex pattern matching) — not an LLM.
          </p>
          <p>
            All processing happens in your browser. No data is sent anywhere.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
