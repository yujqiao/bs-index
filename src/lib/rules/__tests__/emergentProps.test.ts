import { describe, it, expect } from "vitest";
import { emergentProps } from "../emergentProps";

describe("emergentProps", () => {
  it("detects 'emergent properties'", () => {
    const text = "Our system exhibits emergent properties that rival human intelligence.";
    const matches = emergentProps.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'emergent intelligence'", () => {
    const text = "Through our architecture, emergent intelligence arises spontaneously.";
    const matches = emergentProps.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'emergence of' pattern", () => {
    const text = "We enable the emergence of novel capabilities in your data pipeline.";
    const matches = emergentProps.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'self-organizing'", () => {
    const text = "Our nodes self-organize into optimal configurations.";
    const matches = emergentProps.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger in legitimate complexity science context", () => {
    const text =
      "In our agent-based model of complex systems, we observe self-organizing maps that reflect the expected emergent behavior described by et al.";
    const matches = emergentProps.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("detects 'emerges naturally'", () => {
    const text = "Intelligence emerges naturally from the interaction of our neural components.";
    const matches = emergentProps.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });
});
