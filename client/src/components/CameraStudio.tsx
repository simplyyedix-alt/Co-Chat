import { useEffect, useMemo, useRef, useState } from "react";

export type CameraFilter = "none" | "enhance" | "golden" | "cool" | "mono" | "retro" | "dreamy" | "cinematic" | "vivid" | "portrait" | "night" | "vhs" | "y2k" | "pastel" | "glow";
export type CameraLens = "natural" | "puppy" | "cat" | "eyes" | "hearts" | "sunglasses" | "crown" | "particles" | "confetti";

export const cameraFilterOptions: Array<{ id: CameraFilter; label: string; icon: string; category: "Natural" | "Portrait" | "Cinematic" }> = [
  { id: "none", label: "Natural", icon: "◉", category: "Natural" },
  { id: "vhs", label: "VHS", icon: "▤", category: "Cinematic" },
  { id: "y2k", label: "Y2K", icon: "✺", category: "Natural" },
  { id: "pastel", label: "Pastel glow", icon: "❀", category: "Portrait" },
  { id: "glow", label: "Soft glow", icon: "✧", category: "Portrait" },
  { id: "enhance", label: "Enhanced", icon: "✦", category: "Natural" },
  { id: "golden", label: "Golden hour", icon: "☀", category: "Portrait" },
  { id: "cool", label: "Cool pop", icon: "❄", category: "Portrait" },
  { id: "mono", label: "Mono mood", icon: "◐", category: "Cinematic" },
  { id: "retro", label: "Retro film", icon: "▣", category: "Cinematic" },
  { id: "dreamy", label: "Dreamy", icon: "✧", category: "Portrait" },
  { id: "cinematic", label: "Cinematic", icon: "▰", category: "Cinematic" },
  { id: "vivid", label: "Vivid", icon: "◆", category: "Natural" },
  { id: "portrait", label: "Soft portrait", icon: "●", category: "Portrait" },
  { id: "night", label: "Night", icon: "☾", category: "Cinematic" },
];

export const cameraFilterCss: Record<CameraFilter, string> = {
  none: "none",
  enhance: "brightness(1.06) contrast(1.12) saturate(1.14)",
  golden: "sepia(.25) saturate(1.25) contrast(1.04) brightness(1.04)",
  cool: "hue-rotate(165deg) saturate(1.15) contrast(1.04)",
  mono: "grayscale(1) contrast(1.12)",
  retro: "sepia(.42) saturate(.82) contrast(1.12) brightness(1.04)",
  dreamy: "brightness(1.06) saturate(1.08) contrast(.95)",
  cinematic: "contrast(1.18) saturate(.9) brightness(.98)",
  vivid: "saturate(1.42) contrast(1.08)",
  portrait: "brightness(1.03) saturate(1.06) contrast(.96)",
  night: "brightness(1.16) contrast(1.06) saturate(.9) hue-rotate(8deg)",
  vhs: "contrast(1.08) saturate(.82) sepia(.18) hue-rotate(342deg)",
  y2k: "brightness(1.08) saturate(1.35) contrast(.96) hue-rotate(320deg)",
  pastel: "brightness(1.08) saturate(.82) contrast(.9) sepia(.08)",
  glow: "brightness(1.07) saturate(1.08) contrast(.9)",
};

export const cameraLensOptions: Array<{ id: CameraLens; label: string; icon: string; description: string; ar: boolean }> = [
  { id: "natural", label: "Natural", icon: "◉", description: "Clean camera", ar: false },
  { id: "puppy", label: "Puppy", icon: "🐶", description: "Face-tracked ears", ar: true },
  { id: "cat", label: "Cat", icon: "🐱", description: "Whiskers and ears", ar: true },
  { id: "eyes", label: "Big eyes", icon: "👀", description: "Tracked eye effect", ar: true },
  { id: "hearts", label: "Hearts", icon: "💗", description: "Follow your face", ar: true },
  { id: "sunglasses", label: "Shades", icon: "🕶", description: "Face-attached shades", ar: true },
  { id: "crown", label: "Sparkle crown", icon: "✦", description: "Crown follows head", ar: true },
  { id: "particles", label: "Particles", icon: "✧", description: "Ambient particles", ar: false },
  { id: "confetti", label: "Confetti", icon: "🎉", description: "Animated scene effect", ar: false },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function cameraFilterStyle(filter: CameraFilter, intensity: number) {
  const amount = clamp(intensity, 0, 1);
  if (filter === "none") return "none";
  const base = cameraFilterCss[filter];
  if (amount >= 0.98) return base;
  const scale = (value: number) => 1 + (value - 1) * amount;
  switch (filter) {
    case "enhance": return `brightness(${scale(1.06)}) contrast(${scale(1.12)}) saturate(${scale(1.14)})`;
    case "golden": return `sepia(${(0.25 * amount).toFixed(2)}) saturate(${scale(1.25)}) contrast(${scale(1.04)}) brightness(${scale(1.04)})`;
    case "cool": return `hue-rotate(${Math.round(165 * amount)}deg) saturate(${scale(1.15)}) contrast(${scale(1.04)})`;
    case "mono": return `grayscale(${amount.toFixed(2)}) contrast(${scale(1.12)})`;
    case "retro": return `sepia(${(0.42 * amount).toFixed(2)}) saturate(${1 - (1 - .82) * amount}) contrast(${scale(1.12)}) brightness(${scale(1.04)})`;
    case "dreamy": return `brightness(${scale(1.06)}) saturate(${scale(1.08)}) contrast(${1 - .05 * amount})`;
    case "cinematic": return `contrast(${scale(1.18)}) saturate(${1 - .1 * amount}) brightness(${1 - .02 * amount})`;
    case "vivid": return `saturate(${scale(1.42)}) contrast(${scale(1.08)})`;
    case "portrait": return `brightness(${scale(1.03)}) saturate(${scale(1.06)}) contrast(${1 - .04 * amount})`;
    case "night": return `brightness(${scale(1.16)}) contrast(${scale(1.06)}) saturate(${1 - .1 * amount}) hue-rotate(${Math.round(8 * amount)}deg)`;
    case "vhs": return `contrast(${scale(1.08)}) saturate(${1 - .18 * amount}) sepia(${(.18 * amount).toFixed(2)}) hue-rotate(${Math.round(-18 * amount)}deg)`;
    case "y2k": return `brightness(${scale(1.08)}) saturate(${scale(1.35)}) contrast(${1 - .04 * amount}) hue-rotate(${Math.round(320 * amount)}deg)`;
    case "pastel": return `brightness(${scale(1.08)}) saturate(${1 - .18 * amount}) contrast(${1 - .1 * amount}) sepia(${(.08 * amount).toFixed(2)})`;
    case "glow": return `brightness(${scale(1.07)}) saturate(${scale(1.08)}) contrast(${1 - .1 * amount})`;
    default: return base;
  }
}

async function loadImage(dataUrl: string) {
  const image = new Image();
  image.src = dataUrl;
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not process the camera photo."));
  });
  return image;
}

export async function processCameraDataUrl(dataUrl: string, filter: CameraFilter, intensity = 1, mirror = false) {
  const image = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Camera filters are unavailable on this device.");
  context.save();
  if (mirror) { context.translate(canvas.width, 0); context.scale(-1, 1); }
  context.filter = cameraFilterStyle(filter, intensity);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  context.restore();
  const amount = clamp(intensity, 0, 1);
  if (filter === "enhance") {
    context.globalAlpha = 0.06 * amount;
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
  }
  if (filter === "golden") {
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `rgba(255,190,90,${0.16 * amount})`);
    gradient.addColorStop(1, `rgba(255,102,52,${0.05 * amount})`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (filter === "dreamy") {
    context.globalAlpha = 0.12 * amount;
    context.fillStyle = "#f7eaff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
  }
  if (filter === "retro") {
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width * .15, canvas.width / 2, canvas.height / 2, canvas.width * .7);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, `rgba(15,8,2,${0.26 * amount})`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.07 * amount;
    context.fillStyle = "#fff";
    const grainCount = Math.min(1800, Math.round(canvas.width * canvas.height / 9000));
    for (let index = 0; index < grainCount; index += 1) context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    context.globalAlpha = 1;
  }
  if (filter === "cinematic") {
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width * .25, canvas.width / 2, canvas.height / 2, canvas.width * .78);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, `rgba(0,0,0,${0.28 * amount})`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (filter === "night") {
    context.globalAlpha = .12 * amount;
    context.fillStyle = "#243e78";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
  }
  return canvas.toDataURL("image/jpeg", .92);
}

export async function cameraDataUrlToFile(dataUrl: string, filter: CameraFilter, intensity = 1, mirror = false) {
  const processed = await processCameraDataUrl(dataUrl, filter, intensity, mirror);
  const response = await fetch(processed);
  let blob = await response.blob();
  // Social uploads are capped at 5 MB. Keep the largest practical JPEG
  // quality, then step down only when the actual encoded bytes require it.
  if (blob.size > 4.8 * 1024 * 1024) {
    const image = await loadImage(processed);
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, Math.sqrt((4.8 * 1024 * 1024) / blob.size));
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      for (const quality of [.9, .84, .78, .72]) {
        blob = await new Promise<Blob>((resolve) => canvas.toBlob((value) => resolve(value || blob), "image/jpeg", quality));
        if (blob.size <= 4.8 * 1024 * 1024) break;
      }
    }
  }
  return new File([blob], "co-chat-camera.jpg", { type: "image/jpeg" });
}

type FaceBox = { x: number; y: number; width: number; height: number };
type FaceDetectorLike = { detect: (source: HTMLVideoElement) => Promise<Array<{ boundingBox: FaceBox }>> };
type FaceDetectorConstructor = new (options?: { maxDetectedFaces?: number; fastMode?: boolean }) => FaceDetectorLike;

function readFaceDetector() {
  return (window as Window & { FaceDetector?: FaceDetectorConstructor }).FaceDetector;
}

function smoothFace(previous: FaceBox | null, next: FaceBox) {
  if (!previous) return next;
  const mix = .34;
  return { x: previous.x + (next.x - previous.x) * mix, y: previous.y + (next.y - previous.y) * mix, width: previous.width + (next.width - previous.width) * mix, height: previous.height + (next.height - previous.height) * mix };
}

export function CameraStudio({ isOpen, onClose, onCapture, onError, onNativeFallback }: {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (capture: { dataUrl: string; filter: CameraFilter; intensity: number; mirror: boolean }) => void;
  onError: (message: string) => void;
  onNativeFallback?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const inferenceRef = useRef<number | null>(null);
  const faceRef = useRef<FaceBox | null>(null);
  const [facing, setFacing] = useState<"user" | "environment">("environment");
  const [filter, setFilter] = useState<CameraFilter>("none");
  const [intensity, setIntensity] = useState(0.85);
  const [lens, setLens] = useState<CameraLens>("natural");
  const [timer, setTimer] = useState<0 | 3 | 10>(0);
  const [grid, setGrid] = useState(false);
  const [mirror, setMirror] = useState(false);
  const [torch, setTorch] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomRange, setZoomRange] = useState({ min: 1, max: 1, step: .1 });
  const [captured, setCaptured] = useState<string | null>(null);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(true);
  const [cameraMessage, setCameraMessage] = useState("");
  const [retryToken, setRetryToken] = useState(0);
  const [face, setFace] = useState<FaceBox | null>(null);
  const [trackingAvailable, setTrackingAvailable] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [dockCategory, setDockCategory] = useState<"popular" | "lenses" | "looks" | "fx">("popular");
  const selectedLens = useMemo(() => cameraLensOptions.find((option) => option.id === lens) || cameraLensOptions[0], [lens]);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    let active = true;
    setCameraLoading(true);
    setCameraMessage("");
    const open = async () => {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("This browser does not support live camera access. Use a current browser over HTTPS.");
      stopStream();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facing }, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30, max: 60 } }, audio: false });
      if (!active) { stream.getTracks().forEach((track) => track.stop()); return; }
      streamRef.current = stream;
      const track = stream.getVideoTracks()[0];
      const capabilities = track?.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean; zoom?: { min: number; max: number; step?: number } } | undefined;
      setTorchSupported(Boolean(capabilities?.torch));
      if (capabilities?.zoom) { setZoomRange({ min: capabilities.zoom.min, max: capabilities.zoom.max, step: capabilities.zoom.step || .1 }); setZoom(capabilities.zoom.min); }
      else { setZoomRange({ min: 1, max: 1, step: .1 }); setZoom(1); }
      setTorch(false);
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play().catch(() => undefined); }
      if (active) setCameraLoading(false);
    };
    open().catch((error) => {
      if (!active) return;
      const message = error instanceof DOMException && (error.name === "NotReadableError" || error.name === "AbortError") ? "Camera is already in use by another app or browser tab." : error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "SecurityError") ? "Camera permission is blocked. Allow camera access, then try again." : error instanceof Error ? error.message : "Could not open the camera.";
      setCameraLoading(false);
      setCameraMessage(message);
      onError(message);
      if (onNativeFallback && /support|permission|blocked|available/i.test(message)) { onClose(); onNativeFallback(); }
    });
    return () => { active = false; stopStream(); if (timerRef.current) window.clearTimeout(timerRef.current); if (inferenceRef.current) window.cancelAnimationFrame(inferenceRef.current); };
  }, [isOpen, facing, retryToken]);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return undefined;
    const Detector = readFaceDetector();
    if (!selectedLens.ar) { setTrackingAvailable(false); setFace(null); return undefined; }
    // FaceDetector is still unavailable in several Chromium/Android WebViews.
    // Keep AR lenses functional there with a centered framing guide instead of
    // hiding the lens or presenting a dead-end warning.
    if (!Detector) {
      const video = videoRef.current;
      const applyFallback = () => {
        const width = video?.videoWidth || 640;
        const height = video?.videoHeight || 480;
        const fallback = { x: width * .25, y: height * .14, width: width * .5, height: height * .68 };
        faceRef.current = fallback;
        setFace(fallback);
      };
      applyFallback();
      video?.addEventListener("loadedmetadata", applyFallback, { once: true });
      setTrackingAvailable(true);
      return () => { video?.removeEventListener("loadedmetadata", applyFallback); faceRef.current = null; setFace(null); };
    }
    let active = true;
    let detector: FaceDetectorLike;
    try { detector = new Detector({ maxDetectedFaces: 1, fastMode: true }); } catch { setTrackingAvailable(false); return undefined; }
    setTrackingAvailable(true);
    const detect = async () => {
      if (!active || !videoRef.current || videoRef.current.readyState < 2) return;
      try {
        const faces = await detector.detect(videoRef.current);
        const next = faces[0]?.boundingBox;
        if (next) { faceRef.current = smoothFace(faceRef.current, next); setFace(faceRef.current); }
        else { faceRef.current = null; setFace(null); }
      } catch { setTrackingAvailable(false); }
    };
    let last = 0;
    const frame = (now: number) => { if (!active) return; if (now - last > 120) { last = now; void detect(); } inferenceRef.current = window.requestAnimationFrame(frame); };
    inferenceRef.current = window.requestAnimationFrame(frame);
    return () => { active = false; if (inferenceRef.current) window.cancelAnimationFrame(inferenceRef.current); faceRef.current = null; setFace(null); };
  }, [isOpen, selectedLens.ar]);

  useEffect(() => {
    if (!captured) { setCapturedPreview(null); return; }
    let active = true;
    processCameraDataUrl(captured, filter, intensity, mirror).then((result) => { if (active) setCapturedPreview(result); }).catch(() => { if (active) setCapturedPreview(captured); });
    return () => { active = false; };
  }, [captured, filter, intensity, mirror]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); stopStream(); }, []);

  const applyTrackConstraints = async (constraints: MediaTrackConstraintSet) => {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track?.applyConstraints) return;
    try { await track.applyConstraints(constraints); } catch { /* unsupported controls are deliberately ignored */ }
  };

  const changeTorch = async () => {
    const next = !torch;
    await applyTrackConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] } as MediaTrackConstraintSet);
    setTorch(next);
  };

  const changeZoom = async (value: number) => { setZoom(value); await applyTrackConstraints({ advanced: [{ zoom: value } as MediaTrackConstraintSet] } as MediaTrackConstraintSet); };

  const drawCapture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) { setCameraMessage("Your camera is still starting. Please try again in a moment."); return; }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) { setCameraMessage("Could not capture this photo."); return; }
    context.save();
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const faceBox = faceRef.current;
    const drawText = (text: string, x: number, y: number, size: number, color: string) => { context.font = `${size}px system-ui, sans-serif`; context.textAlign = "center"; context.textBaseline = "middle"; context.fillStyle = color; context.shadowColor = "rgba(0,0,0,.55)"; context.shadowBlur = Math.max(2, size * .12); context.fillText(text, x, y); context.shadowBlur = 0; };
    if (faceBox && (lens === "puppy" || lens === "cat")) { drawText(lens === "puppy" ? "🐶" : "🐱", faceBox.x + faceBox.width * .15, faceBox.y - faceBox.height * .2, Math.max(28, faceBox.width * .28), "#fff"); drawText(lens === "puppy" ? "🐶" : "🐱", faceBox.x + faceBox.width * .85, faceBox.y - faceBox.height * .2, Math.max(28, faceBox.width * .28), "#fff"); drawText(lens === "puppy" ? "●" : "♡", faceBox.x + faceBox.width * .5, faceBox.y + faceBox.height * .58, Math.max(18, faceBox.width * .13), "#ff91ae"); }
    if (faceBox && lens === "eyes") { context.fillStyle = "rgba(121,217,255,.82)"; context.strokeStyle = "#fff"; context.lineWidth = Math.max(3, faceBox.width * .025); for (const x of [faceBox.x + faceBox.width * .3, faceBox.x + faceBox.width * .7]) { context.beginPath(); context.arc(x, faceBox.y + faceBox.height * .38, faceBox.width * .1, 0, Math.PI * 2); context.fill(); context.stroke(); } }
    if (faceBox && lens === "sunglasses") { context.fillStyle = "rgba(7,8,16,.88)"; context.strokeStyle = "#fff"; context.lineWidth = Math.max(2, faceBox.width * .015); context.fillRect(faceBox.x + faceBox.width * .1, faceBox.y + faceBox.height * .3, faceBox.width * .8, faceBox.height * .18); context.strokeRect(faceBox.x + faceBox.width * .1, faceBox.y + faceBox.height * .3, faceBox.width * .8, faceBox.height * .18); }
    if (faceBox && lens === "crown") drawText("✦ ✦ ✦", faceBox.x + faceBox.width * .5, faceBox.y - faceBox.height * .2, Math.max(26, faceBox.width * .18), "#ffd76f");
    if (faceBox && lens === "hearts") { drawText("♥", faceBox.x - faceBox.width * .08, faceBox.y + faceBox.height * .15, Math.max(22, faceBox.width * .16), "#ff78ac"); drawText("♥", faceBox.x + faceBox.width * 1.08, faceBox.y + faceBox.height * .42, Math.max(22, faceBox.width * .16), "#ff78ac"); }
    if (lens === "particles" || lens === "confetti") { const particles = [[.15, .22], [.78, .27], [.24, .72], [.84, .76], [.52, .12], [.53, .86]]; particles.forEach(([x, y], index) => { context.fillStyle = index % 2 ? "#ff9fca" : "#b69cff"; context.beginPath(); context.arc(canvas.width * x, canvas.height * y, Math.max(4, canvas.width * .008), 0, Math.PI * 2); context.fill(); }); }
    context.restore();
    setCaptured(canvas.toDataURL("image/jpeg", .94));
    setFlash(true);
    window.setTimeout(() => setFlash(false), 140);
  };

  const capture = () => {
    if (countdown !== null || cameraLoading) return;
    if (timer === 0) { drawCapture(); return; }
    setCountdown(timer);
    let remaining = timer;
    const tick = () => { remaining -= 1; if (remaining <= 0) { setCountdown(null); drawCapture(); } else { setCountdown(remaining); timerRef.current = window.setTimeout(tick, 1000); } };
    timerRef.current = window.setTimeout(tick, 1000);
  };

  const flip = () => { stopStream(); setFacing((value) => value === "environment" ? "user" : "environment"); setMirror(facing === "environment"); };

  if (!isOpen) return null;
  const boxStyle = face && videoRef.current?.videoWidth ? { left: `${(face.x / videoRef.current.videoWidth) * 100}%`, top: `${(face.y / videoRef.current.videoHeight) * 100}%`, width: `${(face.width / videoRef.current.videoWidth) * 100}%`, height: `${(face.height / videoRef.current.videoHeight) * 100}%` } : undefined;
  return <div className="camera-studio-shell" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="camera-studio-full" role="dialog" aria-modal="true" aria-label="Camera studio">
      <header className="camera-studio-topbar"><button className="camera-studio-icon" type="button" aria-label="Close camera" onClick={onClose}>×</button><div><strong>Camera studio</strong><small>{captured ? "Review your capture" : "Create a moment"}</small></div><button className="camera-studio-icon" type="button" aria-label="Toggle tools" aria-expanded={showTools} onClick={() => setShowTools((value) => !value)}>⋯</button></header>
      <div className={`camera-stage ${grid ? "with-grid" : ""} ${captured ? "is-captured" : ""}`}>
        {captured ? <img className="camera-captured-image" src={capturedPreview || captured} alt="Captured preview" style={{ filter: cameraFilterStyle(filter, intensity), transform: mirror ? "scaleX(-1)" : undefined }} /> : <video ref={videoRef} className="camera-live-video" muted playsInline style={{ filter: cameraFilterStyle(filter, intensity), transform: mirror ? "scaleX(-1)" : undefined }} />}
        {!captured && lens !== "natural" && <div className={`camera-lens-layer lens-${lens}`} style={{ transform: mirror ? "scaleX(-1)" : undefined }} aria-hidden="true">{face && boxStyle && (lens === "puppy" || lens === "cat") && <div className="face-lens-anchor" style={boxStyle}><span className="lens-ear left">{lens === "puppy" ? "🐶" : "🐱"}</span><span className="lens-ear right">{lens === "puppy" ? "🐶" : "🐱"}</span><span className="lens-nose">{lens === "puppy" ? "●" : "♡"}</span></div>}{face && boxStyle && lens === "eyes" && <div className="face-lens-anchor" style={boxStyle}><span className="lens-eye left" /><span className="lens-eye right" /></div>}{face && boxStyle && lens === "sunglasses" && <div className="face-lens-layer" style={boxStyle}><span className="lens-sunglasses">▰</span></div>}{face && boxStyle && lens === "crown" && <div className="face-lens-anchor" style={boxStyle}><span className="lens-crown">✦ ✦ ✦</span></div>}{face && boxStyle && lens === "hearts" && <div className="face-lens-anchor" style={boxStyle}><span className="lens-heart one">♥</span><span className="lens-heart two">♥</span><span className="lens-heart three">♥</span></div>}{(lens === "particles" || lens === "confetti") && <div className="ambient-particles"><i /><i /><i /><i /><i /><i /></div>}</div>}
        {grid && <div className="camera-grid-lines" aria-hidden="true"><i /><i /><i /><i /></div>}
        {cameraLoading && <div className="camera-status"><span className="loading-spinner" /> Starting camera…</div>}
        {cameraMessage && <div className="camera-status camera-status-error"><strong>{cameraMessage}</strong><button type="button" className="camera-studio-secondary" onClick={() => { setCameraMessage(""); setCameraLoading(true); setRetryToken((value) => value + 1); }}>Try again</button></div>}
        {countdown !== null && <div className="camera-countdown" aria-live="polite">{countdown}</div>}
        {flash && <div className="camera-capture-flash" aria-hidden="true" />}
        {selectedLens.ar && !trackingAvailable && !cameraLoading && <div className="camera-tracking-note">Face tracking is unavailable here; choose a conventional lens or move to a supported browser.</div>}
      </div>
      {captured ? <div className="camera-review-actions"><button className="camera-studio-secondary" type="button" onClick={() => setCaptured(null)}>Retake</button><button className="camera-studio-primary" type="button" onClick={() => { onCapture({ dataUrl: captured, filter, intensity, mirror }); onClose(); }}>Use photo</button></div> : <>
        <div className="camera-control-row" aria-label="Camera controls"><button className="camera-control" type="button" onClick={flip} aria-label="Switch front and rear camera">↺<small>Flip</small></button>{zoomRange.max > zoomRange.min && <label className="camera-zoom-control"><span>Zoom {zoom.toFixed(1)}×</span><input aria-label="Camera zoom" type="range" min={zoomRange.min} max={zoomRange.max} step={zoomRange.step} value={zoom} onChange={(event) => void changeZoom(Number(event.target.value))} /></label>}<button className={`camera-shutter-large ${countdown !== null ? "is-counting" : ""}`} type="button" aria-label={timer ? `Capture photo in ${timer} seconds` : "Capture photo"} onClick={capture}><i /></button><button className={`camera-control ${grid ? "active" : ""}`} type="button" aria-label="Toggle grid" onClick={() => setGrid((value) => !value)}>▦<small>Grid</small></button><button className={`camera-control ${showTools ? "active" : ""}`} type="button" aria-label="Open camera tools" onClick={() => setShowTools((value) => !value)}>⚙<small>Tools</small></button></div>
        {showTools && <div className="camera-tools-panel"><label>Timer<select value={timer} onChange={(event) => setTimer(Number(event.target.value) as 0 | 3 | 10)}><option value={0}>Off</option><option value={3}>3 seconds</option><option value={10}>10 seconds</option></select></label><label>Filter intensity<input type="range" min="0" max="1" step=".05" value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} /></label><label className="camera-toggle"><input type="checkbox" checked={mirror} onChange={(event) => setMirror(event.target.checked)} /> Mirror front preview</label><button type="button" className="camera-tool-button" disabled={!torchSupported} onClick={() => void changeTorch()}>{torch ? "Torch on" : "Torch off"}</button></div>}
        <nav className="camera-dock-tabs" aria-label="Camera categories">{([["popular", "Popular", "✦"], ["lenses", "AR Lenses", "◉"], ["looks", "Color", "◌"], ["fx", "FX Party", "✧"]] as const).map(([id, label, icon]) => <button key={id} type="button" className={dockCategory === id ? "active" : ""} onClick={() => setDockCategory(id)}><span>{icon}</span>{label}</button>)}</nav>
        {(dockCategory !== "lenses" || dockCategory === "popular") && <div className="camera-filter-strip"><div className="camera-strip-label"><strong>Looks</strong><span>{cameraFilterOptions.find((option) => option.id === filter)?.label}</span></div><div className="camera-filter-scroll">{cameraFilterOptions.filter((option) => dockCategory === "popular" || dockCategory === "looks" ? true : option.category === "Portrait").map((option) => <button key={option.id} className={filter === option.id ? "active" : ""} type="button" onClick={() => setFilter(option.id)}><span>{option.icon}</span><small>{option.label}</small></button>)}</div></div>}
        <div className="camera-lens-strip"><div className="camera-strip-label"><strong>Lenses</strong><span>{selectedLens.description}</span></div><div className="camera-filter-scroll">{cameraLensOptions.filter((option) => dockCategory === "popular" || dockCategory === "lenses" || (dockCategory === "fx" && option.id !== "natural")).map((option) => <button key={option.id} className={lens === option.id ? "active" : ""} type="button" onClick={() => setLens(option.id)}><span>{option.icon}</span><small>{option.label}</small></button>)}</div></div>
      </>}
    </section>
  </div>;
}
