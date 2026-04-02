import { describe, it, expect } from "vitest";
import { misusedTerms } from "../misusedTerms";

describe("misusedTerms", () => {
  it("detects 'quantum' in marketing context", () => {
    const text = "Our quantum-powered analytics engine delivers unprecedented insights.";
    const matches = misusedTerms.detect(text);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].reason).toContain("quantum");
  });

  it("detects 'entropy' in marketing context", () => {
    const text = "We harness entropy to organize your data into actionable intelligence.";
    const matches = misusedTerms.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'manifold' in marketing context", () => {
    const text = "Our platform maps your business onto a high-dimensional manifold for optimization.";
    const matches = misusedTerms.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects multiple terms and scores each", () => {
    const text =
      "Using quantum entanglement and topological manifolds, our eigenvalue-based system harnesses dark energy.";
    const matches = misusedTerms.detect(text);
    expect(matches.length).toBeGreaterThanOrEqual(3);
  });

  it("skips terms near arxiv references (technical context)", () => {
    const text =
      "We use a Bayesian approach following arxiv:2301.12345 to estimate the posterior distribution.";
    const matches = misusedTerms.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("detects DNA used in non-biological marketing", () => {
    const text = "Innovation is in our DNA. We live and breathe cutting-edge technology.";
    const matches = misusedTerms.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'neural pathway' in marketing", () => {
    const text = "Our platform mimics the neural pathways of the human brain.";
    const matches = misusedTerms.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });
});
