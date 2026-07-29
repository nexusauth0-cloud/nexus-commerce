"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Mail } from "lucide-react";
import { Section } from "@nexus/ui/section";
import { CTABlock } from "@nexus/ui/cta-block";
import { Heading } from "@nexus/ui/heading";
import { Button } from "@nexus/ui/button";

export function CTA() {
  return (
    <Section size="xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <CTABlock variant="primary" size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow-primary"
          >
            <Rocket className="h-8 w-8 text-white" />
          </motion.div>

          <Heading as="h2" size="3xl">
            Ready to build the{" "}
            <span className="gradient-primary-text">future</span> of
            commerce?
          </Heading>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-4 max-w-xl text-lg text-text-secondary"
          >
            Join thousands of forward-thinking brands already using NEXUS to
            power their AI-driven commerce experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
        </CTABlock>
      </motion.div>
    </Section>
  );
}