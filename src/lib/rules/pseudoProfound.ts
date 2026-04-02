import type { Rule, Match } from "./types";

/**
 * Rule: 20 points for ending a paragraph with pseudo-profound nonsense.
 *
 * Detects paragraph-ending sentences that contain vague buzzwords and
 * grandiose claims without concrete specifics.
 */

const BUZZWORD_PATTERNS = [
  /\btransform(?:ing|s|ed)?\s+(?:the\s+)?(?:way|how|future|world|everything|industry|landscape)/i,
  /\bredefin(?:e|es|ed|ing)\s+(?:the\s+)?(?:way|how|future|what|boundaries|limits|possibilities|industry)/i,
  /\bthe\s+future\s+(?:of|is|belongs|starts|begins)\b/i,
  /\bunlock(?:ing|s|ed)?\s+(?:the\s+)?(?:full|true|real|limitless|infinite|unprecedented|unbounded)\s+(?:potential|power|possibilities|value|capability)/i,
  /\breimagin(?:e|es|ed|ing)\s+(?:the\s+)?(?:way|how|what|future|world|possibilities)/i,
  /\bparadigm\s+shift/i,
  /\bchange\s+(?:the\s+)?(?:world|game|everything|rules)/i,
  /\beverything\s+(?:you\s+)?(?:know|thought|believed)\s+(?:about|is)\b/i,
  /\bthis\s+changes\s+everything\b/i,
  /\bthe\s+(?:only|last)\s+\w+\s+you[''](?:ll|d)\s+ever\s+need\b/i,
  /\b(?:limitless|infinite|boundless|unbounded|unprecedented)\s+(?:potential|possibilities|opportunity|power|capability|growth)/i,
  /\bwelcome\s+to\s+the\s+(?:future|new\s+era|next\s+chapter|revolution|age)\b/i,
  /\band\s+(?:that|this)\s+(?:changes|makes\s+all\s+the\s+difference|is\s+(?:just|only)\s+the\s+beginning)\b/i,
  /\bthe\s+(?:possibilities|opportunities)\s+are\s+(?:endless|infinite|limitless|boundless)\b/i,
  /\b(?:we|it|this)\s+(?:will|shall|can)\s+change\s+(?:the\s+)?(?:world|course|future|game)\b/i,
  /\b(?:a|the)\s+new\s+(?:era|dawn|chapter|age|paradigm|frontier)\s+(?:of|in|for|has)\b/i,
  /\bnothing\s+(?:will\s+(?:ever\s+)?be|is)\s+the\s+same\b/i,
  /\bthe\s+question\s+is\s+not\s+(?:whether|if)\b.*\bbut\s+(?:when|how\s+fast)\b/i,
];

function splitParagraphs(text: string): Array<{ content: string; start: number }> {
  const paragraphs: Array<{ content: string; start: number }> = [];
  const parts = text.split(/\n\s*\n/);
  let offset = 0;
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length > 0) {
      const idx = text.indexOf(part, offset);
      paragraphs.push({ content: trimmed, start: idx >= 0 ? idx : offset });
    }
    offset += part.length + 1;
  }
  return paragraphs;
}

function getLastSentence(paragraph: string): { sentence: string; start: number } {
  // Split on sentence-ending punctuation
  const sentences = paragraph.split(/(?<=[.!?])\s+/);
  const last = sentences[sentences.length - 1].trim();
  const start = paragraph.lastIndexOf(last);
  return { sentence: last, start: start >= 0 ? start : 0 };
}

function hasConcreteContent(sentence: string): boolean {
  // Numbers, percentages, specific metrics suggest concrete claims
  if (/\d+(?:\.\d+)?%/.test(sentence)) return true;
  if (/\$\d/.test(sentence)) return true;
  if (/\b\d{4}\b/.test(sentence)) return true; // years
  if (/\b\d+(?:\.\d+)?\s*(?:x|times|ms|seconds|GB|TB|MB)\b/i.test(sentence)) return true;
  return false;
}

export const pseudoProfound: Rule = {
  id: "pseudo-profound",
  label: "Pseudo-Profound Endings",
  description: "20 points for ending a paragraph with pseudo-profound nonsense.",
  pointsPer: 20,
  mode: "per-match",
  detect(text: string): Match[] {
    const matches: Match[] = [];
    const paragraphs = splitParagraphs(text);

    for (const para of paragraphs) {
      const { sentence, start: sentenceOffset } = getLastSentence(para.content);
      if (sentence.length < 15) continue;
      if (hasConcreteContent(sentence)) continue;

      for (const pattern of BUZZWORD_PATTERNS) {
        if (pattern.test(sentence)) {
          const absStart = para.start + sentenceOffset;
          matches.push({
            snippet: sentence.slice(0, 120) + (sentence.length > 120 ? "…" : ""),
            reason: "Paragraph ends with pseudo-profound nonsense",
            start: absStart,
            end: absStart + sentence.length,
          });
          break; // One match per paragraph
        }
      }
    }

    return matches;
  },
};
