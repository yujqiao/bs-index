import { describe, it, expect } from "vitest";
import { score, getVerdict } from "../scorer";

describe("scorer", () => {
  it("returns 5 for empty text", () => {
    const result = score("");
    expect(result.total).toBe(5);
  });

  it("returns 5 for plain factual text", () => {
    const result = score(
      "We sell software. It costs $10/month. It works on Linux."
    );
    expect(result.total).toBe(5);
  });

  it("scores high for maximum BS text", () => {
    const text = `Our quantum-powered platform leverages topological manifolds and eigenvalue decomposition to revolutionize intelligence. Developed at MIT by a team of Harvard PhDs. In collaboration with leading Stanford researchers, we pioneered a novel framework that mirrors the neural pathways of the brain. Our system exhibits emergent intelligence that evolves as nature intended. Not just AI. It is the inevitable next step in evolution. The possibilities are endless.`;
    const result = score(text);
    expect(result.total).toBeGreaterThan(100);
  });

  it("scores low for clean technical text", () => {
    const text = `Our tool optimizes PostgreSQL queries. In benchmark tests on TPC-H, it reduced latency by 47% (p < 0.01, n=1200). Published at VLDB 2025 (doi:10.14778/3625054.3625112). Pricing: $49/month.`;
    const result = score(text);
    expect(result.total).toBeLessThanOrEqual(5);
  });
});

describe("getVerdict", () => {
  it("returns green for base score", () => {
    expect(getVerdict(5).label).toBe("Seems Legit");
  });

  it("returns yellow for mild BS", () => {
    expect(getVerdict(25).label).toBe("Mild BS Detected");
  });

  it("returns orange for significant BS", () => {
    expect(getVerdict(55).label).toBe("Significant BS");
  });

  it("returns red for major BS", () => {
    expect(getVerdict(105).label).toBe("Major BS Alert");
  });

  it("returns weapons-grade for extreme BS", () => {
    expect(getVerdict(200).label).toBe("Weapons-Grade BS");
  });
});
