'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@nexus/ui';

export function CTA() {
  return (
    <section className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-primary/20 from-primary/5 via-secondary/5 to-primary/5 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-12 text-center sm:p-16 lg:p-24"
        >
          {/* Glow effect */}
          <div className="bg-gradient-conic from-primary/10 via-secondary/5 to-primary/10 pointer-events-none absolute -inset-40 opacity-30 blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="from-primary to-secondary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br"
            >
              <Rocket className="h-8 w-8 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Ready to build the <span className="gradient-primary-text">future</span> of commerce?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-text-secondary mx-auto mt-4 max-w-xl text-lg"
            >
              Join thousands of forward-thinking brands already using NEXUS to power their AI-driven
              commerce experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="xl" className="group gap-2 text-base">
                Get Started Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline" size="xl" className="text-base">
                Talk to Sales
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
