"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@nexus/utils";

interface AnimatedBackgroundProps {
  className?: string;
  aurora?: boolean;
  grid?: boolean;
  particles?: boolean;
  noise?: boolean;
  spotlight?: boolean;
  glowBlobs?: boolean;
  particleCount?: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const seed = i * 137 + 42;
    return {
      id: i,
      x: Math.round(seededRandom(seed) * 10000) / 100,
      y: Math.round(seededRandom(seed + 1000) * 10000) / 100,
      size: Math.round((seededRandom(seed + 2000) * 3 + 1) * 100) / 100,
      duration: Math.round((seededRandom(seed + 3000) * 6 + 4) * 100) / 100,
      delay: Math.round(seededRandom(seed + 4000) * 400) / 100,
    };
  });
}

export function AnimatedBackground({
  className,
  aurora = true,
  grid = true,
  particles = true,
  noise = true,
  spotlight = true,
  glowBlobs = false,
  particleCount = 30,
}: AnimatedBackgroundProps) {
  const [particleData] = useState(() => generateParticles(particleCount));
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Aurora gradients */}
      {aurora && (
        <div className="aurora-gradient absolute inset-0" />
      )}

      {/* Grid pattern */}
      {grid && (
        <div className="grid-pattern absolute inset-0 opacity-50" />
      )}

      {/* Noise texture */}
      {noise && (
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />
      )}

      {/* Mouse spotlight */}
      {spotlight && (
        <motion.div
          className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[150px]"
          style={{
            left: springX.get() * 100 + "%",
            top: springY.get() * 100 + "%",
            background:
              "radial-gradient(circle, rgba(0,217,255,0.15) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)",
          }}
        />
      )}

      {/* Floating gradient blobs */}
      {glowBlobs && (
        <>
          <motion.div
            className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
            style={{ background: "linear-gradient(135deg, #00D9FF, #3B82F6)" }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
            style={{ background: "linear-gradient(135deg, #3B82F6, #00D9FF)" }}
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 30, -20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Floating particles */}
      {particles && (
        <div className="absolute inset-0">
          {particleData.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-primary/20"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}