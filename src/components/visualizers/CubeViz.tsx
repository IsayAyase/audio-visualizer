import gsap from "gsap";
import React, { useEffect, useRef } from "react";

interface CubeVizProps {
  audioBands?: React.MutableRefObject<Float32Array>;
  rotationSpeed?: number;
  enableRotate?: boolean;
  enableShake?: boolean;
  shakeIntensity?: number;
}

const colors = [
  { main: "#e63946", glow: "#ff6b6b" },
  { main: "#2a9d8f", glow: "#4ecdc4" },
  { main: "#e9c46a", glow: "#ffe66d" },
  { main: "#8ab17d", glow: "#a8d5a2" },
  { main: "#f4a261", glow: "#ffcfa3" },
  { main: "#9b5de5", glow: "#c490f0" },
];

const CubeViz: React.FC<CubeVizProps> = ({
  audioBands,
  rotationSpeed = 20,
  enableRotate = true,
  enableShake = true,
  shakeIntensity = 10,
}) => {
  const cubeWrapperRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number>(0);
  const translateZStateRef = useRef({ z: 64 });
  const lastKickTimeRef = useRef(0);
  const coloredFacesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (cubeRef.current && enableRotate) {
      gsap.to(cubeRef.current, {
        rotationY: 360,
        rotationX: 360,
        duration: rotationSpeed,
        repeat: -1,
        ease: "none",
      });
    } else if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    const updateFaces = () => {
      const z = translateZStateRef.current.z;
      faceRefs.current.forEach((face, index) => {
        if (face) {
          const transforms = [
            `translateZ(${z}px)`,
            `rotateY(90deg) translateZ(${z}px)`,
            `rotateY(-90deg) translateZ(${z}px)`,
            `rotateX(90deg) translateZ(${z}px)`,
            `rotateX(-90deg) translateZ(${z}px)`,
            `translateZ(-${z}px) rotateY(180deg)`,
          ];
          face.style.transform = transforms[index];
        }
      });
    };

    const triggerKickEffect = () => {
      const colorIndex = Math.floor(Math.random() * colors.length);

      const whiteFaces: number[] = [];
      for (let i = 0; i < 6; i++) {
        if (!coloredFacesRef.current.has(i)) {
          whiteFaces.push(i);
        }
      }

      if (whiteFaces.length === 0) {
        coloredFacesRef.current.clear();
        whiteFaces.push(0, 1, 2, 3, 4, 5);
      }

      const faceIndex =
        whiteFaces[Math.floor(Math.random() * whiteFaces.length)];
      coloredFacesRef.current.add(faceIndex);

      colors.forEach((_, i) => {
        const face = faceRefs.current[i];
        if (face) {
          if (i === faceIndex) {
            gsap.to(face, {
              backgroundColor: colors[colorIndex].main,
              boxShadow: `inset 0 0 30px ${colors[colorIndex].glow}80, 0 0 20px ${colors[colorIndex].glow}40`,
              borderColor: colors[colorIndex].glow,
              duration: 0.1,
              ease: "power2.out",
              onComplete: () => {
                setTimeout(() => {
                  coloredFacesRef.current.delete(i);
                  gsap.to(face, {
                    backgroundColor: "var(--secondary)",
                    boxShadow: "none",
                    borderColor: "var(--border)",
                    duration: 0.3,
                    ease: "power2.out",
                  });
                }, 800);
              },
            });
          }
        }
      });
    };

    const animate = () => {
      let bassLevel = 0;
      if (audioBands?.current && audioBands.current.length >= 40) {
        bassLevel =
          (audioBands.current[0] +
            audioBands.current[1] +
            audioBands.current[2]) /
          3;
      }

      const targetTranslateZ = 64 + bassLevel * 80;

      gsap.to(translateZStateRef.current, {
        z: targetTranslateZ,
        duration: 0.15,
        ease: "power2.out",
        onUpdate: updateFaces,
      });

      if (enableShake && cubeWrapperRef.current) {
        const shakeX = (Math.random() - 0.5) * bassLevel * shakeIntensity;
        const shakeY = (Math.random() - 0.5) * bassLevel * shakeIntensity;
        cubeWrapperRef.current.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
      }

      if (bassLevel > 0.6) {
        const now = Date.now();
        if (now - lastKickTimeRef.current > 150) {
          triggerKickEffect();
          lastKickTimeRef.current = now;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioBands, rotationSpeed, enableRotate, enableShake, shakeIntensity]);

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-56 h-56 hidden md:flex items-center justify-center">
        <div ref={cubeWrapperRef} className="shrink-0 w-32 h-32 p-0" style={{ perspective: "1000px" }}>
          <div
            ref={cubeRef}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  faceRefs.current[index] = el;
                }}
                className="absolute w-full h-full bg-secondary"
                style={{
                  opacity: 0.7,
                  transform: [
                    `translateZ(64px)`,
                    `rotateY(90deg) translateZ(64px)`,
                    `rotateY(-90deg) translateZ(64px)`,
                    `rotateX(90deg) translateZ(64px)`,
                    `rotateX(-90deg) translateZ(64px)`,
                    `translateZ(-64px) rotateY(180deg)`,
                  ][index],
                  border: "3px solid var(--border)",
                  transition: "box-shadow 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeViz;
