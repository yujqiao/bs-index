import { describe, it, expect } from "vitest";
import { motteAndBailey } from "../motteAndBailey";

describe("motteAndBailey", () => {
  it('detects "It is not X. It is Y."', () => {
    const text = "It is not a chatbot. It is a cognitive companion.";
    const matches = motteAndBailey.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('detects "This isn\'t X — it\'s Y."', () => {
    const text = "This isn't just another dashboard — it's a revolution.";
    const matches = motteAndBailey.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('detects "Not just X, but Y."', () => {
    const text = "Not just machine learning, but a fundamentally new paradigm.";
    const matches = motteAndBailey.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('detects "Forget X. Y."', () => {
    const text = "Forget everything you know about AI. This changes everything.";
    const matches = motteAndBailey.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger on normal comparative text", () => {
    const text =
      "Our product is faster than the competition. We measured a 30% improvement in throughput.";
    const matches = motteAndBailey.detect(text);
    expect(matches).toHaveLength(0);
  });

  it('detects "We don\'t X. We Y."', () => {
    const text = "We don't just process data. We understand it.";
    const matches = motteAndBailey.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('detects "X is dead."', () => {
    const text = "Traditional analytics is dead. Welcome to the future.";
    const matches = motteAndBailey.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });
});
