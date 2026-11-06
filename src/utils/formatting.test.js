import { it, expect, describe } from "vitest";
import { formatPrice } from "./formatting";

describe("formatPrice", () => {
  it("should format price correctly", () => {
    expect(formatPrice(12345)).toBe("$123.45");
    expect(formatPrice(0)).toBe("$0.00");
    expect(formatPrice(999)).toBe("$9.99");
  });

  it("should format price with leading zeros correctly", () => {
    expect(formatPrice(5)).toBe("$0.05");
    expect(formatPrice(50)).toBe("$0.50");
    expect(formatPrice(500)).toBe("$5.00");
  });
});
