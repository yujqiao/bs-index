import { describe, it, expect } from "vitest";
import { noFalsifiable } from "../noFalsifiable";

describe("noFalsifiable", () => {
  it("triggers on long text with no numbers or metrics", () => {
    const text =
      "Our platform delivers unprecedented value to enterprise customers through our revolutionary approach to data intelligence. We transform the way organizations think about their most critical assets and unlock new possibilities for growth and innovation across every vertical and industry segment that we serve globally.";
    const matches = noFalsifiable.detect(text);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does NOT trigger when text has percentages", () => {
    const text =
      "Our platform improves query performance by 45% on average across a dataset of over ten thousand benchmark queries drawn from production workloads that represent real enterprise data patterns.";
    const matches = noFalsifiable.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when text has dollar amounts", () => {
    const text =
      "Customers save an average of $12,000 per month after adopting our platform for their daily analytics workflow and operations across all departments and business units that participate in our program.";
    const matches = noFalsifiable.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when text mentions benchmarks", () => {
    const text =
      "Our model outperforms the state-of-the-art baseline on standard benchmark tests across multiple domains including natural language processing and computer vision and speech recognition tasks.";
    const matches = noFalsifiable.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger on short text", () => {
    const text = "We are the best company.";
    const matches = noFalsifiable.detect(text);
    expect(matches).toHaveLength(0);
  });

  it("does NOT trigger when text has SLA/uptime metrics", () => {
    const text =
      "We guarantee availability of 99.9% uptime SLA backed by service credits and our enterprise support team monitors all systems around the clock to ensure continuous operation for our customers worldwide.";
    const matches = noFalsifiable.detect(text);
    expect(matches).toHaveLength(0);
  });
});
