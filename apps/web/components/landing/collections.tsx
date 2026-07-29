"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Headphones, Monitor, Palette } from "lucide-react";
import { Section } from "@nexus/ui/section";
import { Heading } from "@nexus/ui/heading";
import { Button } from "@nexus/ui/button";
import { Glass } from "@nexus/ui/glass";

interface Collection {
  title: string;
  description: string;
  gradient: string;
  accent: string;
  count: string;
  icon: React.ElementType;
}

const collections: Collection[] = [
  {
    title: "Summer Essentials",
    description: "Curated picks for the season ahead",
    gradient: "from-orange-500/20 via-rose-500/10 to-purple-500/20",
    accent: "from-orange-500 to-rose-500",
    count: "124 Products",
    icon: ShoppingBag,
  },
  {
    title: "AI-Tech Favorites",
    description: "Top-rated smart devices and gadgets",
    gradient: "from-primary/20 via-secondary/10 to-primary/20",
    accent: "from-primary to-secondary",
    count: "89 Products",
    icon: Monitor,
  },
  {
    title: "Minimalist Living",
    description: "Clean design for modern spaces",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    accent: "from-emerald-500 to-cyan-500",
    count: "56 Products",
    icon: Palette,
  },
  {
    title: "Premium Collection",
    description: "Exclusive luxury selections",
    gradient: "from-amber-500/20 via-yellow-500/10 to-amber-500/20",
    accent: "from-amber-500 to-yellow-500",
    count: "42 Products",
    icon: Headphones,
  },
];

const largeCard = collections[0]!;
const smallCards = collections.slice(1);

function CollectionCard({
  collection,
  index,
  large,
}: {
  collection: Collection;
  index: number;
  large?: boolean;
}) {
  const Icon = collection.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        large && "md:col-span-2",
      )}
      style={{ minHeight: large ? "400px" : "190px" }}
    >
      <Glass variant="card" hover className="relative h-full overflow-hidden p-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} transition-transform duration-700 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div
          className={cn(
            "relative flex flex-col justify-end",
            large ? "p-8 md:p-10" : "p-6",
          )}
        >
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${collection.accent} px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white`}
          >
            <Icon className="h-3 w-3" />
            {collection.count}
          </div>
          <h3 className={cn(
            "font-bold text-white",
            large ? "text-2xl md:text-3xl" : "text-lg",
          )}>
            {collection.title}
          </h3>
          <p className={cn(
            "mt-1 text-white/60",
            large ? "text-sm" : "text-xs",
          )}>
            {collection.description}
          </p>
          {large && (
            <div className="mt-6 flex gap-4">
              <Button size="sm" className="gap-2">
                Explore
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Glass>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Collections() {
  return (
    <Section size="xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center justify-between gap-4 md:flex-row"
      >
        <Heading
          badge="Collections"
          badgeIcon={<Sparkles className="h-3.5 w-3.5" />}
          size="3xl"
        >
          Featured{" "}
          <span className="gradient-primary-text">Collections</span>
        </Heading>
        <Button variant="outline" size="sm" className="gap-2">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <CollectionCard collection={largeCard} index={0} large />
        {smallCards.map((collection, i) => (
          <CollectionCard key={collection.title} collection={collection} index={i + 1} />
        ))}
      </div>
    </Section>
  );
}