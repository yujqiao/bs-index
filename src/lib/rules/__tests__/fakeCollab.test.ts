import { describe, it, expect } from "vitest";
import { fakeCollab } from "../fakeCollab";

describe("fakeCollab", () => {
  it("detects 'in collaboration with' without citation", () => {
    const text =
      "In collaboration with leading researchers at the Advanced AI Lab, we developed our system.";
    const matches = fakeCollab.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'partnered with' without citation", () => {
    const text =
      "We partnered with world-class institutions to bring this technology to market.";
    const matches = fakeCollab.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'scientific advisory board'", () => {
    const text =
      "Our scientific advisory board ensures that our research maintains the highest standards.";
    const matches = fakeCollab.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("detects 'world-renowned researchers'", () => {
    const text =
      "We are advised by world-renowned researchers who guide our technical direction.";
    const matches = fakeCollab.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger when collaboration is backed by citation", () => {
    const text =
      'In collaboration with Prof. Smith\'s lab, we published our results. See https://example.com/paper.pdf and Smith et al. "Advances in ML" (2024).';
    const matches = fakeCollab.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when DOI is provided nearby", () => {
    const text =
      "Joint research with the Neural Computing Group (doi: 10.1234/ncg.2025.001) produced significant results.";
    const matches = fakeCollab.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("detects multiple collaboration claims", () => {
    const text =
      "In collaboration with leading universities, and partnered with top research labs, and working closely with renowned experts from elite institutions.";
    const matches = fakeCollab.detect(text);
    expect(matches.length).toBeGreaterThanOrEqual(2);
  });
});
