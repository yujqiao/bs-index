import { Textarea } from "@/components/ui/textarea";
import { SAMPLES } from "@/data/samples";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label
          htmlFor="input-text"
          className="text-sm font-medium text-foreground"
        >
          Paste marketing text
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {SAMPLES.map((sample) => (
            <button
              key={sample.title}
              onClick={() => onChange(sample.text)}
              className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        id="input-text"
        placeholder="Paste AI marketing text here to calculate its BS Index…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[240px] text-sm leading-relaxed font-mono resize-y"
      />
      <p className="text-xs text-muted-foreground">
        {value.trim().split(/\s+/).filter(Boolean).length} words
      </p>
    </div>
  );
}
