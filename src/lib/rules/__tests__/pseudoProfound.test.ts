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

  it("detects 'at the forefront of'", () => {
    const text =
      "Some intro.\n\nThe company remains at the forefront of AI-driven innovation.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'builds for the long term'", () => {
    const text =
      "Some intro.\n\nThis approach shapes how the company builds for the long term.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'problems we have yet to discover'", () => {
    const text =
      "Some intro.\n\nWe will tackle the problems we have yet to discover with the solutions we plan to invent.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'problems that are still being defined'", () => {
    const text =
      "Some intro.\n\nOur platform is designed for problems that are still being defined.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'the ultimate X that will'", () => {
    const text =
      "Some intro.\n\nThis is the ultimate investment that will give us the power to innovate.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'continues that trajectory'", () => {
    const text =
      "Some intro.\n\nThe expansion continues that trajectory across global markets.";
    const matches = pseudoProfound.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });
});
