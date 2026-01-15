import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  audioBands?: React.MutableRefObject<Float32Array>;
}

interface Ribbon {
  points: { x: number; y: number }[];
  vx: number;
  vy: number;
  width: number;
  color: string;
  life: number;
  curvature: number;
  maxLength: number;
  curveDir: 1 | -1;
  curvePhase: number;
}

const colors = [
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#f97316",
  "#a855f7",
  "#ec4899",
  "#06b6d4",
];

const createRibbon = (
  dir: number,
  cx: number,
  cy: number,
  energy: number
): Ribbon => {
  const baseAngles = [
    Math.PI * 0.25, // ↗
    Math.PI * 0.75, // ↖
    Math.PI * 1.25, // ↙
    Math.PI * 1.75, // ↘
  ];

  const spread = (Math.random() - 0.5) * 0.28;
  const angle = baseAngles[dir] + spread;

  const baseSpeed = 0.15;
  const speed = baseSpeed + energy * 22;

  // OUTWARD curvature bias per quadrant
  const curveDir: 1 | -1 = dir === 0 || dir === 2 ? 1 : -1;

  return {
    points: [{ x: cx, y: cy }],
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    width: 4 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1,
    curvature: 0.004 + Math.random() * 0.004,
    maxLength: 30 + Math.random() * 40,
    curveDir,
    curvePhase: Math.random() * Math.PI * 2,
  };
};

const Confetti: React.FC<ConfettiProps> = ({ audioBands }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const ribbonsRef = useRef<Ribbon[]>([]);
  const lastSpawnTimeRef = useRef(0);
  const bassThreshold = 0.3;

  const logoRedRef = useRef<HTMLDivElement>(null);
  const logoGreenRef = useRef<HTMLDivElement>(null);
  const logoBlueRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);

  const maxSplit = 6;
  const currentSplitRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawRibbon = (ctx: CanvasRenderingContext2D, ribbon: Ribbon) => {
      ctx.save();
      ctx.globalAlpha = ribbon.life * 0.9;
      ctx.strokeStyle = ribbon.color;
      ctx.lineWidth = ribbon.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 18;
      ctx.shadowColor = ribbon.color;

      ctx.beginPath();
      ribbon.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.restore();
    };

    const render = () => {
      let bassLevel = 0;

      if (audioBands?.current && audioBands.current.length >= 40) {
        for (let i = 0; i < 7; i++) {
          bassLevel += audioBands.current[i];
        }
        bassLevel /= 7;
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isBassActive = bassLevel > bassThreshold;
      const speedMult = isBassActive ? bassLevel : 0;

      currentSplitRef.current = bassLevel * maxSplit;
      const now = Date.now();

      const spawnRate = Math.max(40, 120 - bassLevel * 120);

      if (isBassActive && now - lastSpawnTimeRef.current > spawnRate) {
        const dir = Math.floor(Math.random() * 4);
        ribbonsRef.current.push(
          createRibbon(dir, centerX, centerY, bassLevel),
          createRibbon((dir + 2) % 4, centerX, centerY, bassLevel)
        );
        lastSpawnTimeRef.current = now;
      }

      ribbonsRef.current = ribbonsRef.current.filter((ribbon) => {
        const head = ribbon.points[ribbon.points.length - 1];

        // gentle curve — applied ONCE per frame, very subtle
        const bassBoost = Math.max(0, bassLevel - bassThreshold);

        // smooth acceleration
        const accel = bassBoost * 1.2;
        const damping = 0.985;

        // distance-based curvature (fans outward)
        const dx = head.x - centerX;
        const dy = head.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;

        // smooth oscillation so curve feels alive
        ribbon.curvePhase += 0.02;
        const wave = Math.sin(ribbon.curvePhase) * 0.4 + 0.6;

        // curvature grows as ribbon moves outward
        const curveStrength =
          ribbon.curvature * ribbon.curveDir * wave * Math.min(dist / 250, 1);

        // rotate velocity vector slightly
        const cos = Math.cos(curveStrength);
        const sin = Math.sin(curveStrength);

        const vx = ribbon.vx * cos - ribbon.vy * sin;
        const vy = ribbon.vx * sin + ribbon.vy * cos;

        ribbon.vx = vx;
        ribbon.vy = vy;

        // bass acceleration (pushes along curve)
        ribbon.vx += (vx / dist) * accel;
        ribbon.vy += (vy / dist) * accel;

        // apply damping so it relaxes smoothly
        ribbon.vx *= damping;
        ribbon.vy *= damping;

        const next = {
          x: head.x + ribbon.vx,
          y: head.y + ribbon.vy,
        };

        ribbon.points.push(next);

        // limit trail length (long ribbons)
        // grow first, then decay
        if (ribbon.points.length > ribbon.maxLength) {
          ribbon.points.shift();
        }

        ribbon.life -= 0.025;
        if (ribbon.life <= 0) return false;

        drawRibbon(ctx, ribbon);
        return true;
      });

      if (
        mainTextRef.current &&
        logoRedRef.current &&
        logoGreenRef.current &&
        logoBlueRef.current
      ) {
        const split = currentSplitRef.current;
        const opacity = split / maxSplit;

        logoRedRef.current.style.transform = `translate(${-split}px, 0)`;
        logoRedRef.current.style.opacity = opacity.toString();

        logoGreenRef.current.style.transform = `translate(0, ${-split}px)`;
        logoGreenRef.current.style.opacity = opacity.toString();

        logoBlueRef.current.style.transform = `translate(${split}px, ${split}px)`;
        logoBlueRef.current.style.opacity = opacity.toString();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [audioBands]);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-black">
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 inset-0 flex items-center justify-center pointer-events-none bg-black">
        <div
          className="relative text-5xl font-bold tracking-wider font-mono"
          ref={mainTextRef}
        >
          <div className="text-foreground/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
            prabhatlabs
          </div>
          <div
            ref={logoRedRef}
            className="absolute -z-10 top-0 left-0 text-red-500/65 opacity-0 transition-opacity drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]"
          >
            prabhatlabs
          </div>
          <div
            ref={logoGreenRef}
            className="absolute -z-10 top-0 left-0 text-green-500/45 opacity-0 transition-opacity drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]"
          >
            prabhatlabs
          </div>
          <div
            ref={logoBlueRef}
            className="absolute -z-10 top-0 left-0 text-blue-500/65 opacity-0 transition-opacity drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]"
          >
            prabhatlabs
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Confetti;
