"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Sparkles, ArrowRight } from "lucide-react";
import { Section } from "@nexus/ui/section";
import { Heading } from "@nexus/ui/heading";
import { Button } from "@nexus/ui/button";
import { Glass } from "@nexus/ui/glass";

const benefits = [
  "Early access to new AI features",
  "Exclusive product drops and deals",
  "Monthly insights and trends report",
  "No spam — unsubscribe anytime",
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Section size="xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl"
      >
        <Glass variant="card" className="overflow-hidden p-0 md:flex md:items-stretch">
          {/* Left: Form side */}
          <div className="flex flex-col justify-center p-8 md:w-3/5 md:p-12">
            <Heading
              badge="Stay Connected"
              badgeIcon={<Sparkles className="h-3.5 w-3.5" />}
              size="xl"
            >
              Get early access to{" "}
              <span className="gradient-primary-text">AI features</span>
            </Heading>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Be the first to know about new AI capabilities, product drops, and
              exclusive offers.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={submitted}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitted}
                  size="lg"
                  className="gap-2"
                >
                  {submitted ? (
                    <>
                      <Check className="h-4 w-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-sm text-success"
              >
                <Check className="h-4 w-4" />
                Welcome to NEXUS! Check your inbox for a confirmation.
              </motion.p>
            )}
          </div>

          {/* Right: Benefits */}
          <div className="border-t border-border bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] p-8 md:w-2/5 md:border-l md:border-t-0 md:p-12">
            <p className="mb-6 text-sm font-semibold text-white">
              What you&apos;ll get:
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-text-secondary">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Glass>
      </motion.div>
    </Section>
  );
}