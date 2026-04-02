import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

function Section({
  title,
  points,
  mode,
  children,
}: {
  title: string;
  points: number;
  mode: "boolean" | "per-match";
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        {title}
        <span className="text-xs font-normal text-muted-foreground">
          {points} pts{mode === "per-match" ? " each" : ""}
        </span>
      </h3>
      <div className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1 py-0.5 rounded bg-muted text-[11px] font-mono inline-block break-all">
      {children}
    </code>
  );
}

function PatternList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-4 space-y-0.5">
      {items.map((item, i) => (
        <li key={i} className="break-words">{item}</li>
      ))}
    </ul>
  );
}

export function MethodologyModal() {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground cursor-pointer"
      >
        <Info className="h-3.5 w-3.5" />
        Methodology
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] p-0 overflow-hidden [&>*]:min-w-0">
        <DialogHeader className="px-4 sm:px-6 pt-6 pb-2">
          <DialogTitle>Scoring Methodology</DialogTitle>
          <DialogDescription>
            All scoring is regex-based pattern matching in your browser. No LLM
            is used. Each rule describes exactly what text patterns are detected.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-4 sm:px-6 pb-6 max-h-[calc(85vh-100px)]">
          <div className="space-y-6 pr-4 overflow-hidden break-words min-w-0">
            {/* Base score */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">Base Score: 5</h3>
              <p className="text-xs text-muted-foreground">
                Benefit of the doubt. The total begins at 5 and
                rules add points from there.
              </p>
            </div>

            <hr />

            {/* 1. No Citation */}
            <Section title="1. No Citation" points={10} mode="boolean">
              <p>
                Triggers <strong>once</strong> when the text contains
                invention/novelty claims but has <em>zero</em> citations.
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Invention claims detected:
              </p>
              <PatternList
                items={[
                  '"invented", "developed", "created", "designed", "built", "pioneered", "discovered"',
                  '"novel", "groundbreaking", "breakthrough", "revolutionary", "first-of-its-kind", "patented", "proprietary"',
                  '"new paradigm/framework/architecture/methodology/algorithm/technique/model/platform/engine"',
                  '"introduces a new/novel/unique …"',
                  '"unlike any/anything/other/traditional/existing …"',
                ]}
              />
              <p className="font-medium text-foreground/80 mt-1">
                Suppressed if any of these citation markers are present:
              </p>
              <PatternList
                items={[
                  "URLs (http/https)",
                  'DOIs (doi: 10.xxxx/…)',
                  "arXiv references (arxiv:YYYY.NNNNN)",
                  '"et al."',
                  "Bracketed references like [1]",
                  "Year in parentheses like (2024)",
                  'Venue names (IEEE, ACM, NeurIPS, ICML, Nature, Science, …)',
                  '"peer-reviewed", "published in/at", "preprint", "journal", "proceedings"',
                ]}
              />
            </Section>

            <hr />

            {/* 2. Misused Scientific Terms */}
            <Section
              title="2. Misused Scientific Terms"
              points={10}
              mode="per-match"
            >
              <p>
                Each <strong>unique</strong> scientific term is counted once
                (repeats of the same word don't add points).
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Mathematics ({"\u224836"} terms):
              </p>
              <p>
                <Code>eigenvalue</Code> <Code>eigenvector</Code>{" "}
                <Code>manifold</Code> <Code>Hilbert space</Code>{" "}
                <Code>tensor</Code> <Code>topological</Code>{" "}
                <Code>homomorphism</Code> <Code>isomorphism</Code>{" "}
                <Code>stochastic</Code> <Code>Bayesian</Code>{" "}
                <Code>Markov</Code> <Code>Fourier</Code>{" "}
                <Code>Lagrangian</Code> <Code>Hamiltonian</Code>{" "}
                <Code>Hessian</Code> <Code>Jacobian</Code>{" "}
                <Code>simplex</Code> <Code>non-Euclidean</Code>{" "}
                <Code>Riemannian</Code> <Code>Gaussian</Code>{" "}
                <Code>polynomial</Code> <Code>asymptote</Code>{" "}
                <Code>singularity</Code> <Code>dimensionality</Code>{" "}
                <Code>convex optimization</Code>{" "}
                <Code>gradient descent</Code>{" "}
                <Code>backpropagation</Code> <Code>latent space</Code>{" "}
                <Code>embedding space</Code> <Code>vector space</Code>{" "}
                <Code>hyperplane</Code> <Code>orthogonal</Code>{" "}
                <Code>n-dimensional</Code>{" "}
                <Code>multi-dimensional</Code>
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Physics ({"\u224826"} terms):
              </p>
              <p>
                <Code>quantum</Code> <Code>entanglement</Code>{" "}
                <Code>superposition</Code> <Code>wave function</Code>{" "}
                <Code>dark matter</Code> <Code>dark energy</Code>{" "}
                <Code>string theory</Code> <Code>relativity</Code>{" "}
                <Code>entropy</Code> <Code>thermodynamic</Code>{" "}
                <Code>black hole</Code> <Code>event horizon</Code>{" "}
                <Code>unified field</Code> <Code>multiverse</Code>{" "}
                <Code>parallel universe</Code> <Code>spacetime</Code>{" "}
                <Code>photonic</Code> <Code>boson</Code>{" "}
                <Code>fermion</Code> <Code>antimatter</Code>{" "}
                <Code>fusion</Code> <Code>fission</Code>{" "}
                <Code>plasma</Code>
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Life sciences ({"\u224828"} terms):
              </p>
              <p>
                <Code>DNA</Code> <Code>genome</Code> <Code>genomic</Code>{" "}
                <Code>neural pathway</Code> <Code>synaptic</Code>{" "}
                <Code>synapse</Code> <Code>cortical</Code>{" "}
                <Code>neuroplasticity</Code> <Code>epigenetic</Code>{" "}
                <Code>mitochondria</Code> <Code>telomere</Code>{" "}
                <Code>ribosome</Code> <Code>amino acid</Code>{" "}
                <Code>protein folding</Code> <Code>CRISPR</Code>{" "}
                <Code>gene editing</Code> <Code>Darwinian</Code>{" "}
                <Code>organism</Code> <Code>biological clock</Code>{" "}
                <Code>cellular</Code> <Code>photosynthesis</Code>{" "}
                <Code>metamorphosis</Code> <Code>symbiosis</Code>{" "}
                <Code>ecosystem</Code> <Code>biome</Code>{" "}
                <Code>microbiome</Code>
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Suppressed when nearby context includes:
              </p>
              <PatternList
                items={[
                  '"theorem", "proof", "lemma", "corollary", "equation", "formula"',
                  '"derivation", "computation", "implementation"',
                  '"source code", "github.com", "arxiv", "et al"',
                ]}
              />
            </Section>

            <hr />

            {/* 3. Motte-and-Bailey */}
            <Section
              title="3. Motte-and-Bailey Hedging"
              points={20}
              mode="per-match"
            >
              <p>Detects rhetorical hedging patterns (9 variants):</p>
              <PatternList
                items={[
                  '"It is not X. It is Y." / "This was not X. It was Y."',
                  '"This isn\'t X — it\'s Y." / "That isn\'t just X; it\'s Y."',
                  '"We don\'t X. We Y." / "We don\'t just X. We Y."',
                  '"Not just/merely/simply/only X, but Y."',
                  '"More/Bigger/Greater/Deeper than X. It\'s Y."',
                  '"Going beyond X."',
                  '"X is dead. Long live Y."',
                  '"Forget X. Y."',
                  '"Stop thinking about X. Start Y."',
                ]}
              />
            </Section>

            <hr />

            {/* 4. Pseudo-Profound */}
            <Section
              title="4. Pseudo-Profound Endings"
              points={20}
              mode="per-match"
            >
              <p>
                Checks the <strong>last sentence of each paragraph</strong> for
                vague buzzword phrases. Only triggers if the sentence has no
                concrete content (no numbers, percentages, dollar amounts, or
                year references).
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Buzzword patterns detected at paragraph endings:
              </p>
              <PatternList
                items={[
                  '"transforming the way/future/world/everything/industry"',
                  '"redefining the way/boundaries/limits/possibilities"',
                  '"the future of/is/belongs/starts/begins"',
                  '"unlocking the full/true/limitless/infinite potential/power/possibilities"',
                  '"reimagining the way/future/world"',
                  '"paradigm shift"',
                  '"change the world/game/everything/rules"',
                  '"everything you know about … is …"',
                  '"this changes everything"',
                  '"the only/last … you\'ll ever need"',
                  '"limitless/infinite/boundless potential/possibilities/opportunity"',
                  '"welcome to the future/new era/revolution"',
                  '"the possibilities are endless/infinite/limitless"',
                  '"a new era/dawn/chapter/age/paradigm/frontier of …"',
                  '"nothing will ever be the same"',
                  '"the question is not whether … but when/how fast"',
                ]}
              />
            </Section>

            <hr />

            {/* 5. Nature/Universe */}
            <Section
              title="5. Nature / Universe Claims"
              points={20}
              mode="per-match"
            >
              <p>
                Matches claims that the product mimics, mirrors, or is inspired
                by nature or the universe:
              </p>
              <PatternList
                items={[
                  '"like/as/the way/inspired by/modeled on/mimics/mirrors nature"',
                  '"what nature does/intended/designed"',
                  '"as nature intended"',
                  '"nature\'s own/way/design/blueprint/algorithm/intelligence/wisdom"',
                  '"harness/tap into/leverage/unlock the power/wisdom/intelligence of nature"',
                  '"the way the universe works/operates/computes/thinks/evolves"',
                  '"the universe\'s own/design/blueprint/algorithm"',
                  '"built/designed/engineered the way nature …"',
                  '"nature/the universe has already solved/optimized/perfected"',
                  '"learning from nature/the universe/the cosmos"',
                  '"cosmic/universal intelligence/wisdom/truth/principle"',
                  '"follow/align with the laws of nature"',
                  '"biomimetic", "bio-inspired"',
                ]}
              />
            </Section>

            <hr />

            {/* 6. Emergent Properties */}
            <Section
              title="6. Emergent Properties"
              points={20}
              mode="per-match"
            >
              <p>Detects unwarranted use of emergence language:</p>
              <PatternList
                items={[
                  '"emergent properties/behavior/capabilities/intelligence/features/phenomena"',
                  '"emergence of/in/from/through"',
                  '"true/genuine/organic/spontaneous emergence"',
                  '"emerges naturally/organically/spontaneously/autonomously"',
                  '"self-organizing", "self-assembling", "self-evolving"',
                  '"properties/behavior/intelligence that emerge(s)"',
                ]}
              />
              <p className="font-medium text-foreground/80 mt-1">
                Suppressed when text is legitimately about complex systems
                (≥2 of these present):
              </p>
              <PatternList
                items={[
                  '"complex systems/theory/science"',
                  '"cellular automata"',
                  '"agent-based model"',
                  '"swarm intelligence"',
                  '"self-organizing maps/systems/networks"',
                  '"et al", "arxiv"',
                ]}
              />
            </Section>

            <hr />

            {/* 7. Ivy League */}
            <Section
              title="7. Ivy League Namedropping"
              points={20}
              mode="per-match"
            >
              <p className="font-medium text-foreground/80">
                Institutions tracked:
              </p>
              <p>
                <Code>Harvard</Code> <Code>Yale</Code>{" "}
                <Code>Princeton</Code> <Code>Columbia</Code>{" "}
                <Code>Cornell</Code> <Code>Penn</Code>{" "}
                <Code>Dartmouth</Code> <Code>Brown</Code>{" "}
                <Code>MIT</Code> <Code>Stanford</Code>{" "}
                <Code>Caltech</Code> <Code>Oxford</Code>{" "}
                <Code>Cambridge</Code> <Code>Berkeley</Code>{" "}
                <Code>Carnegie Mellon</Code>
              </p>
              <p className="font-medium text-foreground/80 mt-1">
                Only triggers in namedropping contexts (not neutral mentions):
              </p>
              <PatternList
                items={[
                  '"researchers/scientists/engineers/experts/team from/at [Institution]"',
                  '"[Institution]-trained/-educated/-backed/-graduates/-alumni"',
                  '"developed/built/created/invented/born/incubated at [Institution]"',
                  '"backed/funded/supported/endorsed by [Institution]"',
                  '"from [Institution] University/Lab/Institute/School"',
                  '"[Institution] PhD/professor/researcher/engineer/fellow/dropout"',
                  '"our [Institution] team/pedigree/heritage/talent"',
                  '"founded by [Institution] alumni/graduates/PhDs"',
                ]}
              />
            </Section>

            <hr />

            {/* 8. No Falsifiable Claims */}
            <Section
              title="8. No Falsifiable Claims"
              points={30}
              mode="boolean"
            >
              <p>
                Triggers <strong>once</strong> if the text is ≥30 words long but
                contains <em>none</em> of these verifiable markers:
              </p>
              <PatternList
                items={[
                  "Numbers with units (%, ms, seconds, x faster, tokens, GB, …)",
                  "Dollar amounts ($10, $1.2M, …)",
                  "Specific dates or years (2024, Q3 2025, January 2026)",
                  'Named benchmarks or comparisons ("benchmark", "baseline", "compared to", "outperforms", "SOTA")',
                  'Specific metrics with values ("accuracy of 95%", "latency = 12ms")',
                  '"reduces/improves X by N%"',
                  '"reproducible", "peer-reviewed", "independently verified", "audited"',
                  "Confidence intervals, p-values, statistical significance",
                ]}
              />
            </Section>

            <hr />

            {/* 9. Fake Collaborations */}
            <Section
              title="9. Unverifiable Collaborations"
              points={40}
              mode="per-match"
            >
              <p>Detects collaboration claims without supporting evidence:</p>
              <PatternList
                items={[
                  '"in collaboration/partnership/cooperation with …"',
                  '"partnered with leading/top/world-class …"',
                  '"working (closely) with researchers/scientists/experts at/from …"',
                  '"joint research/development/project with …"',
                  '"co-developed with …"',
                  '"advised/supported/guided by leading/world-renowned researchers/experts"',
                  '"scientific advisory board"',
                  '"acclaimed/renowned/distinguished/world-class researchers/scientists"',
                ]}
              />
              <p className="font-medium text-foreground/80 mt-1">
                Suppressed if nearby text (within 300 chars) contains:
              </p>
              <PatternList
                items={[
                  "URLs, DOIs, arXiv references",
                  '"et al.", bracketed references [N]',
                  '"published in/at", "peer-reviewed"',
                  '"paper titled/entitled"',
                ]}
              />
            </Section>

            <hr />

            <div className="space-y-1 pb-2">
              <h3 className="text-sm font-semibold">Limitations</h3>
              <p className="text-xs text-muted-foreground">
                This is a heuristic tool, not a judge. Regex patterns can
                produce false positives (flagging legitimate text) and false
                negatives (missing subtle BS). Scientific terms used
                metaphorically in non-marketing contexts may still trigger. The
                tool is meant to be fun and directionally useful, not
                authoritative.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
