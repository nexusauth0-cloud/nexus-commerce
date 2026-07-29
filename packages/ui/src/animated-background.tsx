"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@nexus/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const spotlightX = useTransform(springX, (v) => `${v * 100}%`);
  const spotlightY = useTransform(springY, (v) => `${v * 100}%`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -top-[15%] -right-[10%] h-[60%] w-[60%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 217, 255, 0.15) 0%, transparent 60%)",
        }}
      />

      <div
        className="absolute -bottom-[10%] -left-[10%] h-[50%] w-[50%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
        }}
      />

      <div className="grid-pattern absolute inset-0" />

      <motion.div
        className="absolute h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[80px]"
        style={{
          left: spotlightX,
          top: spotlightY,
          background:
            "radial-gradient(circle, rgba(0, 217, 255, 0.25) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
