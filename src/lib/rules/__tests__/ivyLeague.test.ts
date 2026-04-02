import { describe, it, expect } from "vitest";
import { ivyLeague } from "../ivyLeague";

describe("ivyLeague", () => {
  it("detects 'team from MIT'", () => {
    const text = "Our team from MIT has years of experience in AI research.";
    const matches = ivyLeague.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'Harvard PhDs'", () => {
    const text = "Founded by Harvard PhDs who wanted to change the world.";
    const matches = ivyLeague.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'developed at Stanford'", () => {
    const text = "Our algorithm was developed at Stanford over five years of research.";
    const matches = ivyLeague.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'backed by Princeton'", () => {
    const text = "We are backed by Princeton and leading venture firms.";
    const matches = ivyLeague.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'Stanford engineers'", () => {
    const text = "Built by a team of Stanford engineers.";
    const matches = ivyLeague.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("counts multiple namedrops separately", () => {
    const text =
      "Our researchers from Harvard, alongside experts at MIT, and Stanford-trained engineers built this.";
    const matches = ivyLeague.detect(text);
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });

  it("does NOT trigger on plain neutral mention", () => {
    const text = "The conference was held at Harvard University last year.";
    const matches = ivyLeague.detect(text);
    expect(matches).toHaveLength(0);
  });
});
