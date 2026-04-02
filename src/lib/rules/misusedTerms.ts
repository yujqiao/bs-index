import type { Rule, Match } from "./types";

/**
 * Rule: 10 points for each instance of a term from mathematics, physics,
 * or the life sciences where, by rights, it should not appear.
 *
 * We maintain a curated list of scientific terms that are commonly misused
 * in marketing. We match them with word boundaries and exclude contexts
 * where they appear in genuinely technical passages.
 */

// Terms grouped by domain
const MATH_TERMS = [
  "eigenvalue",
  "eigenvector",
  "manifold",
  "hilbert space",
  "tensor",
  "topolog(?:y|ical)",
  "homomorphi(?:sm|c)",
  "isomorphi(?:sm|c)",
  "stochastic",
  "bayesian",
  "markov",
  "fourier",
  "lagrangian",
  "hamiltonian",
  "hessian",
  "jacobian",
  "simplex",
  "non-euclidean",
  "riemannian",
  "gaussian",
  "polynomial",
  "asymptot(?:e|ic)",
  "singularity",
  "dimensionality",
  "convex optimization",
  "gradient descent",
  "backpropagat(?:e|ion)",
  "latent space",
  "embedding space",
  "vector space",
  "hyperplane",
  "orthogonal",
  "n-dimensional",
  "multi-dimensional",
];

const PHYSICS_TERMS = [
  "quantum",
  "entangle(?:d|ment)",
  "superposition",
  "wave function",
  "dark matter",
  "dark energy",
  "string theory",
  "relativity",
  "entropy",
  "thermodynamic",
  "black hole",
  "event horizon",
  "singularity",
  "unified field",
  "multiverse",
  "parallel universe",
  "time dilation",
  "spacetime",
  "photon(?:ic)?",
  "boson",
  "fermion",
  "antimatter",
  "fusion(?!\\s+cuisine)",
  "fission",
  "plasma(?!\\s+(?:tv|screen|display))",
];

const BIO_TERMS = [
  "dna(?!\\s*test)",
  "genome",
  "genomic",
  "neural pathways?",
  "synaptic",
  "synapse",
  "cortical",
  "neuroplasticity",
  "epigenetic",
  "mitochondria",
  "telomere",
  "ribosom(?:e|al)",
  "amino acid",
  "protein folding",
  "crispr",
  "gene(?:tic)? editing",
  "evolutionary(?! psychology)",
  "darwin(?:ian)?",
  "organism",
  "biological clock",
  "cellular",
  "photosynthesis",
  "metamorphosis",
  "symbiosis",
  "symbiotic",
  "ecosystem(?!\\s+(?:of|for)\\s+(?:apps|tools|services|products|partners|startups|developers))",
  "biome",
  "microbiome",
];

const ALL_TERMS = [...MATH_TERMS, ...PHYSICS_TERMS, ...BIO_TERMS];

// Build combined pattern
function buildPattern(term: string): RegExp {
  return new RegExp(`\\b${term}\\b`, "gi");
}

// Context words that suggest legitimate technical usage
const TECHNICAL_CONTEXT = [
  /\btheorem\b/i,
  /\bproof\b/i,
  /\blemma\b/i,
  /\bcorollary\b/i,
  /\bequation\b/i,
  /\bformula\b/i,
  /\bderivation\b/i,
  /\bcomputation\b/i,
  /\bimplementation\b/i,
  /\bsource\s*code\b/i,
  /\bgithub\.com\b/i,
  /\barxiv\b/i,
  /\bet\s+al\b/i,
];

function isLikelyTechnical(text: string, matchIndex: number): boolean {
  // Check a window around the match
  const windowStart = Math.max(0, matchIndex - 200);
  const windowEnd = Math.min(text.length, matchIndex + 200);
  const window = text.slice(windowStart, windowEnd);
  return TECHNICAL_CONTEXT.some((p) => p.test(window));
}

export const misusedTerms: Rule = {
  id: "misused-terms",
  label: "Misused Scientific Terms",
  description:
    "10 points for each instance of a term from mathematics, physics, or the life sciences where, by rights, it should not appear.",
  pointsPer: 10,
  mode: "per-match",
  detect(text: string): Match[] {
    const matches: Match[] = [];
    const seenPositions = new Set<number>(); // track start positions to avoid overlaps
    const seenTerms = new Set<string>(); // each unique term counted only once

    for (const term of ALL_TERMS) {
      const pattern = buildPattern(term);
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        if (seenPositions.has(m.index)) continue;
        if (isLikelyTechnical(text, m.index)) continue;

        const normalized = m[0].toLowerCase();
        if (seenTerms.has(normalized)) continue;
        seenTerms.add(normalized);
        seenPositions.add(m.index);

        const start = Math.max(0, m.index - 40);
        const end = Math.min(text.length, m.index + m[0].length + 40);
        const snippet = text.slice(start, end).replace(/\n/g, " ");

        matches.push({
          snippet:
            (start > 0 ? "…" : "") + snippet + (end < text.length ? "…" : ""),
          reason: `Scientific term "${m[0]}" used in marketing context`,
          start: m.index,
          end: m.index + m[0].length,
        });
      }
    }

    return matches;
  },
};
