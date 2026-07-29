"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Rocket, Mail, Sparkles } from "lucide-react";
import { CTABlock } from "@nexus/ui/cta-block";
import { Heading } from "@nexus/ui/heading";
import { Button } from "@nexus/ui/button";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.03, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <CTABlock variant="primary" size="lg">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mx-auto mb-8">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow-primary">
                <Rocket className="h-8 w-8 text-white" />
                <motion.div
                  className="absolute -right-1 -top-1"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-4 w-4 text-warning" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Heading as="h2" size="3xl">
                Ready to build the{" "}
                <span className="gradient-primary-text">future</span> of
                commerce?
              </Heading>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-lg text-text-secondary"
            >
              Join thousands of forward-thinking brands already using NEXUS to
              power their AI-driven commerce experience.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="xl" className="group gap-2 text-base shadow-glow-primary">
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="gap-2 text-base"
              >
                <Mail className="h-5 w-5" />
                Talk to Sales
              </Button>
            </motion.div>
          </motion.div>
        </CTABlock>
      </motion.div>
    </section>
  );
}