import { useEffect, useRef, useState } from "react";
import { getVerdict } from "@/lib/scorer";

interface ScoreBoardProps {
  total: number;
}

export function ScoreBoard({ total }: ScoreBoardProps) {
  const [displayed, setDisplayed] = useState(total);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const start = displayed;
    const diff = total - start;
    if (diff === 0) return;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const verdict = getVerdict(total);

  return (
    <div className="flex flex-col items-center gap-2 py-6">
      <div className="text-6xl font-bold tabular-nums font-mono">
        <span className={verdict.color}>{displayed}</span>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <span className="text-2xl">{verdict.emoji}</span>
        <span className={`font-semibold ${verdict.color}`}>
          {verdict.label}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Starting score: −5 (benefit of the doubt)
      </p>
    </div>
  );
}
