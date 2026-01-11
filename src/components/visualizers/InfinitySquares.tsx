import React, { useEffect, useRef } from "react";

interface InfinitySquaresProps {
  squareCount?: number;
  baseSize?: number;
  speed?: number;
  audioBands?: React.MutableRefObject<Float32Array>;
}

const InfinitySquares: React.FC<InfinitySquaresProps> = ({
  squareCount = 30,
  baseSize = 500,
  speed = 3,
  audioBands,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const zOffsetRef = useRef(0);
  const baseSpeedRef = useRef(speed);
  const currentSpeedRef = useRef(speed);
  const colorOffsetRef = useRef(0);
  const targetColorOffsetRef = useRef(0);
  const centerOffsetRef = useRef({ x: 0, y: 0 });
  const targetCenterOffsetRef = useRef({ x: 0, y: 0 });
  const lastKickTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const squareSpacing = baseSize / 2.5;
    const totalTunnelLength = squareCount * squareSpacing;

    const animate = () => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2 + centerOffsetRef.current.x;
      const centerY = height / 2 + centerOffsetRef.current.y;
      const fov = 350;

      let bassLevel = 0;
      if (audioBands?.current && audioBands.current.length >= 40) {
        bassLevel = (audioBands.current[0] + audioBands.current[1] + audioBands.current[2]) / 3;
      }

      const targetSpeed = baseSpeedRef.current * (1 + bassLevel * 5);
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.1;

      if (bassLevel > 0.6) {
        const now = Date.now();
        if (now - lastKickTimeRef.current > 150) {
          targetCenterOffsetRef.current = {
            x: (Math.random() - 0.5) * 180,
            y: (Math.random() - 0.5) * 180,
          };
          lastKickTimeRef.current = now;
        }
      }

      centerOffsetRef.current.x += (targetCenterOffsetRef.current.x - centerOffsetRef.current.x) * 0.05;
      centerOffsetRef.current.y += (targetCenterOffsetRef.current.y - centerOffsetRef.current.y) * 0.05;

      if (bassLevel > 0.6) {
        targetColorOffsetRef.current += 0.5 + bassLevel * 0.5;
      }

      colorOffsetRef.current += (targetColorOffsetRef.current - colorOffsetRef.current) * 0.08;

      zOffsetRef.current += currentSpeedRef.current;

      for (let i = 0; i < squareCount; i++) {
        const spacing = squareSpacing;
        let zPosition = (zOffsetRef.current - i * spacing) % totalTunnelLength;

        if (zPosition > 300) {
          zPosition -= totalTunnelLength;
        }

        const depth = fov - zPosition;
        if (depth <= 0) continue;

        const scale = fov / depth;
        const size = baseSize * scale;
        const x2d = centerX;
        const y2d = centerY;

        const distFromCamera = Math.abs(zPosition);
        const maxDist = totalTunnelLength / 2;
        const alpha = Math.max(0, 1 - distFromCamera / maxDist);
        const lineWidth = Math.max(0.5, 2.5 * scale);

        if (alpha > 0.03) {
          const hue = (colorOffsetRef.current + i * 15) % 360;
          const saturation = 0.5 + bassLevel * 0.5;
          const lightness = 0.4 + bassLevel * 0.3;

          ctx.fillStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha * 0.2})`;
          ctx.fillRect(x2d - size / 2, y2d - size / 2, size, size);

          ctx.strokeStyle = `hsla(${hue}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.strokeRect(x2d - size / 2, y2d - size / 2, size, size);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [squareCount, baseSize, speed, audioBands]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default InfinitySquares;
