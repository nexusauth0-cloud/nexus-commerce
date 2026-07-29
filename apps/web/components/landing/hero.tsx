'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from '@nexus/ui';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Aurora background */}
      <div className="aurora-gradient pointer-events-none absolute inset-0" />

      {/* Grid pattern */}
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="bg-primary/20 absolute rounded-full"
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
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient orb */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,217,255,0.3) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)',
          x: springX,
          y: springY,
        }}
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex items-center justify-center"
        >
          <span className="border-primary/20 bg-accent-glass text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Commerce Engine
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="gradient-primary-text">The Future</span>
          <br />
          <span className="text-white">of Commerce is</span>
          <br />
          <span className="gradient-primary-text">Intelligent</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl"
        >
          NEXUS combines cutting-edge AI with premium design to create a shopping experience that
          feels like magic. Discover products tailored to your taste in seconds.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="xl" className="group gap-2 text-base">
            <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
            Start Shopping
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="outline" size="xl" className="group gap-2 text-base">
            <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
            See AI in Action
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { value: '10K+', label: 'Products' },
            { value: '50K+', label: 'Happy Customers' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9★', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="text-text-secondary mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="from-background pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t to-transparent" />
    </section>
  );
}
