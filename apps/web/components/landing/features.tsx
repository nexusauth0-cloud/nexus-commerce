'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Sparkles, BarChart3, Infinity } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Shopping',
    description:
      'Our intelligent engine learns your preferences and delivers personalized product recommendations that improve over time.',
    gradient: 'from-primary to-secondary',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on Next.js 15 with edge computing, streaming, and instant page transitions for a native-app feel.',
    gradient: 'from-secondary to-primary',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption, SOC 2 compliance, and advanced fraud detection keep every transaction safe.',
    gradient: 'from-success to-primary',
  },
  {
    icon: Sparkles,
    title: 'Smart Search',
    description:
      "Find exactly what you need with natural language queries. 'A laptop for gaming under $1500' returns perfect matches instantly.",
    gradient: 'from-warning to-secondary',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description:
      'Comprehensive dashboards with real-time data on sales, traffic, conversion rates, and customer behavior.',
    gradient: 'from-primary to-success',
  },
  {
    icon: Infinity,
    title: 'Unlimited Scalability',
    description:
      'Cloud-native architecture that scales effortlessly from hundreds to millions of products without skipping a beat.',
    gradient: 'from-secondary to-warning',
  },
];

export function Features() {
  return (
    <section className="relative py-32">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-primary mb-4 inline-block text-xs font-semibold uppercase tracking-widest">
            Why NEXUS
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Built for the <span className="gradient-primary-text">next generation</span> of commerce
          </h2>
          <p className="text-text-secondary mt-4 text-lg">
            Every feature is crafted to deliver an unparalleled shopping experience that drives
            growth and customer satisfaction.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-border bg-card hover:border-border-hover hover:bg-surface-hover group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300"
            >
              {/* Gradient accent */}
              <div
                className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10`}
              />

              <div className="relative z-10">
                <div
                  className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </div>

              {/* Hover shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
