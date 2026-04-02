import { describe, it, expect } from "vitest";
import { pseudoProfound } from "../pseudoProfound";

describe("pseudoProfound", () => {
  it("detects paragraph ending with 'the possibilities are endless'", () => {
    const text =
      "Our platform connects data across silos.\n\nWith our approach, the possibilities are endless.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects paragraph ending with 'transforming the way'", () => {
    const text =
      "We built this tool for teams.\n\nOur technology is transforming the way businesses operate.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'welcome to the future'", () => {
    const text =
      "Some intro text here.\n\nWelcome to the future of computing.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'this changes everything'", () => {
    const text =
      "We analyzed the market.\n\nThis changes everything.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger when paragraph ends with concrete numbers", () => {
    const text =
      "Our tool helps teams.\n\nWe reduced latency by 47% and improved throughput by 3.2x.";
    const matches = pseudoProfound.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger on plain factual endings", () => {
    const text =
      "The software runs on Linux.\n\nIt supports PostgreSQL 14 and MySQL 8.";
    const matches = pseudoProfound.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("detects 'a new era of'", () => {
    const text =
      "We started in 2020.\n\nA new era of intelligence has begun.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });
});
