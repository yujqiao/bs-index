import { describe, it, expect } from "vitest";
import { natureUniverse } from "../natureUniverse";

describe("natureUniverse", () => {
  it("detects 'inspired by nature'", () => {
    const text = "Our system is inspired by nature to solve complex optimization problems.";
    const matches = natureUniverse.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'the way the universe works'", () => {
    const text = "Our algorithm processes data the way the universe computes.";
    const matches = natureUniverse.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'as nature intended'", () => {
    const text = "Intelligence that grows organically, as nature intended.";
    const matches = natureUniverse.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'nature's blueprint'", () => {
    const text = "We follow nature's blueprint for efficient computation.";
    const matches = natureUniverse.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'harness the power of nature'", () => {
    const text = "Our platform harnesses the power of nature to deliver results.";
    const matches = natureUniverse.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'biomimetic'", () => {
    const text = "Our biomimetic algorithm outperforms traditional approaches.";
    const matches = natureUniverse.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger on unrelated nature references", () => {
    const text = "We care about nature conservation and support local wildlife.";
    const matches = natureUniverse.detect(text);
    expect(matches).toHaveLength(0);
  });
});
