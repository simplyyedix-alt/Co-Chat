import { describe, expect, it } from "vitest";
import { cameraFilterOptions, cameraFilterStyle } from "./CameraStudio";

describe("camera filter engine", () => {
  it("exposes every advertised filter with a distinct live style", () => {
    const styles = cameraFilterOptions.map(({ id }) => cameraFilterStyle(id, 1));
    expect(styles).toHaveLength(11);
    expect(new Set(styles).size).toBe(styles.length);
  });

  it("supports a natural reset and intensity scaling", () => {
    expect(cameraFilterStyle("none", 0)).toBe("none");
    expect(cameraFilterStyle("mono", 0)).toBe("grayscale(0.00) contrast(1)");
    expect(cameraFilterStyle("mono", 0.5)).toBe("grayscale(0.50) contrast(1.06)");
  });
});
