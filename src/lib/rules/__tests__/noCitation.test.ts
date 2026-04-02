import { describe, it, expect } from "vitest";
import { noCitation } from "../noCitation";

describe("noCitation", () => {
  it("triggers on invention claims without citations", () => {
    const text =
      "We invented a novel framework that revolutionizes data processing using our proprietary algorithm.";
    const matches = noCitation.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger when text contains URLs", () => {
    const text =
      "We developed a novel framework. See https://example.com/paper.pdf for details.";
    const matches = noCitation.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when text contains DOIs", () => {
    const text =
      "We invented a new approach (doi: 10.1234/example.2025).";
    const matches = noCitation.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when text contains 'et al.'", () => {
    const text =
      "We built on the groundbreaking work of Smith et al. to develop a novel technique.";
    const matches = noCitation.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger on short text", () => {
    const text = "Hello world.";
    const matches = noCitation.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when no invention claims are made", () => {
    const text =
      "Our company provides data analytics services. We help businesses make better decisions with their existing data.";
    const matches = noCitation.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("triggers on 'proprietary' without citations", () => {
    const text =
      "Our proprietary algorithm uses a breakthrough method to solve complex problems at scale.";
    const matches = noCitation.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });
});
