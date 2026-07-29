'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@nexus/ui';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder, Lumina Beauty',
    content:
      'NEXUS transformed our online store. The AI recommendations increased our average order value by 40% within the first month. Our customers love the personalized experience.',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO, TechVault',
    content:
      'The developer experience is unmatched. Clean APIs, excellent documentation, and the AI features are genuinely game-changing. We migrated our entire catalog in under a week.',
    avatar: 'MJ',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'CEO, Artisan Market',
    content:
      'Finally, a platform that understands both aesthetics and functionality. Our conversion rate jumped 65% after switching to NEXUS. The AI search is pure magic.',
    avatar: 'ER',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-primary mb-4 inline-block text-xs font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Loved by <span className="gradient-primary-text">innovators</span> worldwide
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="border-border bg-card hover:border-border-hover group relative rounded-2xl border p-8 transition-all duration-300"
            >
              <Quote className="text-primary/30 mb-4 h-8 w-8" />
              <p className="text-text-secondary leading-relaxed">{t.content}</p>

              <div className="mt-6 flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">{t.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.role}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="text-warning h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
