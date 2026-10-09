import { describe, expect, it } from "vitest";
import { cameraFilterOptions, cameraFilterStyle, cameraMirroringPolicy, processCameraDataUrl } from "./CameraStudio";

describe("camera filter engine", () => {
  it("exposes every advertised filter with a distinct live style", () => {
    const styles = cameraFilterOptions.map(({ id }) => cameraFilterStyle(id, 1));
    expect(styles).toHaveLength(5);
    expect(new Set(styles).size).toBe(styles.length);
  });

  it("supports a natural reset and intensity scaling", () => {
    expect(cameraFilterStyle("none", 0)).toBe("none");
    expect(cameraFilterStyle("mono", 0)).toBe("grayscale(0.00) contrast(1)");
    expect(cameraFilterStyle("mono", 0.5)).toBe("grayscale(0.50) contrast(1.06)");
  });
});

describe("camera orientation policy", () => {
  const asymmetricFrame = ["red-left", "arrow-up", "blue-right"];

  it("keeps a front-camera saved frame natural while allowing a mirrored preview", () => {
    const policy = cameraMirroringPolicy("user", true);
    expect(policy.mirrorPreview).toBe(true);
    expect(policy.mirrorSavedImage).toBe(false);
    // The final renderer receives source pixels in their original order.
    expect(asymmetricFrame).toEqual(["red-left", "arrow-up", "blue-right"]);
  });

  it("does not mirror rear-camera previews or final images", () => {
    const policy = cameraMirroringPolicy("environment", true);
    expect(policy).toEqual({ mirrorPreview: false, mirrorSavedImage: false });
  });

  it("is stable for retakes, fresh sessions, and repeated destinations", () => {
    const sessions = Array.from({ length: 4 }, () => cameraMirroringPolicy("user", true));
    expect(sessions.every(({ mirrorSavedImage }) => !mirrorSavedImage)).toBe(true);
  });

  it("renders an asymmetric source frame without a horizontal canvas transform", async () => {
    const calls: string[] = [];
    const originalImage = globalThis.Image;
    const originalDocument = globalThis.document;
    class SyntheticImage {
      naturalWidth = 3;
      naturalHeight = 1;
      width = 3;
      height = 1;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_value: string) { queueMicrotask(() => this.onload?.()); }
    }
    const context = {
      filter: "none", save: () => calls.push("save"), restore: () => calls.push("restore"),
      setTransform: () => calls.push("identity"), drawImage: () => calls.push("draw"),
    };
    globalThis.Image = SyntheticImage as unknown as typeof Image;
    globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => context, toDataURL: () => "data:image/jpeg;asymmetric-frame" }) } as unknown as Document;
    try {
      await processCameraDataUrl("data:image/jpeg;red-left-blue-right", "none");
      expect(calls).toEqual(["save", "identity", "draw", "restore"]);
    } finally {
      globalThis.Image = originalImage;
      globalThis.document = originalDocument;
    }
  });
});
