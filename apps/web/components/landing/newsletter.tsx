'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { Button } from '@nexus/ui';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Stay ahead of the curve
          </h2>
          <p className="text-text-secondary mt-3">
            Get early access to new features, AI updates, and exclusive offers. No spam, ever.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={submitted}
                  className="border-border bg-surface text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:ring-primary/20 w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all focus:ring-2"
                />
              </div>
              <Button type="submit" disabled={submitted} size="lg" className="gap-2">
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-success mt-3 text-sm"
              >
                You&apos;re subscribed! Welcome to NEXUS.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
