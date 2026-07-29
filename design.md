# NEXUS Commerce — Navbar, Hero & Background Redesign

## Design Audit & Refined Proposal

---

## TASK 1: Design Audit

### Navbar — 9 Issues

| # | Issue | Why It's a Problem |
|---|-------|-------------------|
| 1 | **Full-width, sharp corners** — `fixed left-0 right-0 top-0`, no border-radius | The spec requires a floating centered pill (`radius: 999px`). A full-width bar with square corners signals a generic web app, not a premium product. Apple/Stripe/Vercel all use floating centered navs. |
| 2 | **No glass before scroll** — `bg-transparent` until scrolled | The spec requires glass+blur from the start. The initial transparent state looks unsupported/floating without any backdrop. Visually jarring as content scrolls under it with zero separation. |
| 3 | **Missing nav links** — No "AI Shopping", no "Home", no "About" | "AI Shopping" is the core product differentiator. Its absence means the nav doesn't tell the "AI Commerce" story. The spec explicitly lists `Home, Shop, Collections, AI Shopping, About`. |
| 4 | **No "Get Started" button on desktop** — Only "Sign In" exists | The spec requires both "Sign In" and "Get Started" as visible desktop CTAs. "Get Started" is the primary conversion action. Its absence leaves revenue on the table. |
| 5 | **Height mismatch** — `h-16` mobile / `h-20` desktop vs spec `72px` | 72px (Tailwind `h-18`) is taller than `h-16` (64px) but shorter than `h-20` (80px). Visual consistency matters. |
| 6 | **No shadow on scroll** — Only `border-b` and `bg-background/80` added | Without a shadow, the scrolled navbar doesn't feel "elevated." Spec requires "very soft" shadow to signal depth without heaviness. |
| 7 | **Mobile menu lacks glass** — `bg-background/95 backdrop-blur-2xl` but no glass rounding | The mobile dropdown should feel like an extension of the floating pill, not a separate panel. |
| 8 | **Hardcoded cart badge "0"** — Static value | Minor but erodes trust. A static "0" looks like placeholder code. Even without state, a subtle dot or no badge at all would feel more intentional. |
| 9 | **Nav links lack "active" state** — No indication of current page | Users need to know where they are. Without an active indicator, every link looks identical. |

### Hero — 14 Issues

| # | Issue | Why It's a Problem |
|---|-------|-------------------|
| 1 | **CRITICAL: Single-column centered layout** — Everything stacked vertically | The spec requires a left/right split: copy on the left, floating product dashboard on the right. Currently the right ~50% of viewport is unused. This is the single biggest gap — the hero feels generic because there's no product storytelling on the right. |
| 2 | **Headline doesn't emphasize "AI Commerce"** — Currently "The Future of / Commerce / is Intelligent" with only "Commerce" in accent | Spec: only "AI Commerce" uses the accent color; everything else stays white. The current gradient on "Commerce" is close but the phrase structure buries the AI narrative. The spec headline is "Future of AI Commerce Starts Here." |
| 3 | **Headline `max-w-5xl` is too wide** — ~1024px vs spec 620px | A narrower headline (620px) forces shorter line length, which increases readability and typographic impact. Wide headlines look like paragraph text. |
| 4 | **Subtitle `max-w-2xl` is too wide** — ~672px vs spec 560px | Same principle — narrower copy is more readable and more elegant. |
| 5 | **Secondary button is "outline" not "ghost"** | Spec requires "Watch Demo" as a ghost button (no border). The current outline variant has a visible border that competes with the primary CTA. Ghost is quieter, letting the primary dominate. |
| 6 | **Metrics are weak** — Customer avatars + 4.9 stars vs spec 50K+ Products / 98% Satisfaction / 250+ Brands / 4ms Search | The current metrics are soft social proof ("trusted by 2,000+"). The spec metrics are hard numerical proof (product count, satisfaction rate, brand count, search speed). Numbers convert better than sentiments. |
| 7 | **No Trust Bar** — Missing Stripe, Shopify, Vercel, OpenAI monochrome logos | Logos from known brands build instant credibility. Every premium landing page has a "trusted by" row. Its absence is noticeable. |
| 8 | **Floating product showcase is decorative** — A macOS window with 3 gradient placeholder boxes | The right side should tell the product story: AI Assistant answering queries, Revenue analytics with chart, Cart with items, Recommendations, Inventory. Current implementation is empty UI — it doesn't sell the product. |
| 9 | **No "Watch Demo" CTA** — Currently "Try AI Assistant" is secondary | "Watch Demo" is a different intent — it shows the product in action. "Try AI Assistant" is interactive but harder to understand at a glance. Demos convert well because they reduce risk. |
| 10 | **No scroll-driven narrative** — Hero simply fades out on scroll | The scroll opacity/scale transform is one-note. More interesting: elements reveal progressively as you scroll, creating a story. |
| 11 | **Empty space on large screens** — Centered layout at >1280px leaves massive gutters on both sides | This is the most impactful visual waste. On a 1920px screen, the hero content occupies ~800px centered, with 560px of empty space on each side. The spec fills this with the right-side dashboard. |
| 12 | **Bottom gradient fade is unnecessary** — `h-40 bg-gradient-to-t from-background to-transparent` | The AnimatedBackground already handles section transitions gracefully. An extra gradient layer is redundant DOM. |
| 13 | **All AnimatedBackground features enabled simultaneously** — aurora + grid + particles + noise + spotlight + glowBlobs | Visual clutter. Too many layers competing for attention. The spec is more restrained: layered radials at 15%/10%, grid at 3%, spotlight at 8%. Less is more. |
| 14 | **Noise texture present at opacity 0.015** | Spec says: "Heavy grain is forbidden. Busy textures are forbidden." The noise layer adds a subtle grit that contradicts the clean, sophisticated aesthetic. |

### Background — 7 Issues

| # | Issue | Why It's a Problem |
|---|-------|-------------------|
| 1 | **Over-designed** — 6 visual layers active simultaneously | Creates visual noise. The spec defines exactly 6 layers with precise opacities (radial ×2, grid ×1, particles ×1, spotlight ×1, solid ×1). Current implementation mixes inconsistent opacities and adds `glowBlobs`. |
| 2 | **`aurora-gradient` triple radial is busy** — 3 ellipses at 15/10/5% | The spec asks for 2 radial gradients (top-right at 15%, bottom-left at 10%). Three overlapping ellipses create a muddy center. |
| 3 | **`glowBlobs` are not in spec** — 2 animated gradient orbs | Extra motion that doesn't serve the design. Increases GPU usage unnecessarily. |
| 4 | **Grid pattern opacity too high** — `opacity-50` on `rgba(255,255,255,0.03)` dots | The effective opacity of the grid dots is ~1.5% (50% × 3%). The spec asks for exactly 3% grid opacity. Minor but additive. |
| 5 | **Particle count too high + opacity too high** — 30 particles at 20% opacity | The spec calls for "tiny particles" at 5% opacity. 30 particles at 20% opacity creates visible moving dots that distract from content. |
| 6 | **Spotlight radius too wide** — 600px with 150px blur vs spec 280px radius with 80px blur | Current spotlight is ~600px diameter at 150px blur, creating a very diffuse glow. Spec wants a tighter 280px radius with 80px blur — more focused, more intentional. |
| 7 | **Entire component is `"use client"`** — All layers are client-side | The static layers (solid background, radial gradients, grid) should be server-rendered. Only particles and spotlight need client hydration. 30 `motion.div` particles = 30 unnecessary client components. |

---

## TASK 2: Refined Design Proposal

### Design Philosophy

The homepage must not feel like "a marketing website with floating cards." It must feel like **a living AI Commerce Operating System.** The visitor's first impression should be: *"This is an actual product"* — not *"This is a landing page."*

### Visual Story Arc

Every element serves an emotional progression:

```
Curiosity → Intelligence → Trust → Confidence → Action
```

| Stage | Element | Feeling |
|-------|---------|---------|
| **Curiosity** | AI Badge + Headline + Command Center | "What is this? I want to know more." |
| **Intelligence** | AI Shopping Assistant workflow | "It understands my needs and thinks for me." |
| **Trust** | Metrics + Trust Bar + Premium Product | "Real companies use this. The product looks real." |
| **Confidence** | Unified dashboard, live data motion | "This is a mature platform, not a prototype." |
| **Action** | CTA buttons + Add to Cart flow | "I know exactly what to do next." |

### Product Identity Test

If all text disappeared, would someone still recognize this as an AI Commerce platform? Yes — the Command Center with its shopping workflow, revenue analytics, product showcase, cart, and recommendations communicates "AI-powered commerce" through visual language alone.

---

### 1. Component Hierarchy

```
HomePage (Server Component)
├── Navbar (Client — scroll listener, mobile toggle)
│   └── FloatingPill (72px, centered, rounded-999px, glass)
│       ├── Logo + Wordmark
│       ├── NavLinks (Home, Shop, Collections, AI Shopping, About)
│       │   └── ActiveIndicator (animated underline dot, Linear-style)
│       ├── Actions
│       │   ├── Search (icon button, cmd+k hint)
│       │   ├── ThemeToggle (icon button)
│       │   ├── CartIcon (with animated dot indicator)
│       │   ├── SignIn (Button ghost, subtle)
│       │   └── GetStarted (Button primary, filled accent, 44px h)
│       └── MobileMenu (Client — AnimatePresence, glass extension)
│
└── Hero (Client — scroll + mouse effects)
    ├── Background (Server + Client islands)
    │   ├── SolidBase (#05070B, Server)
    │   ├── RadialTopRight (soft cyan-blue, 15% at center, Server)
    │   ├── RadialBottomLeft (soft purple, 10% at center, Server)
    │   ├── Grid (very faint dots, 3% opacity, Server)
    │   └── Spotlight (280px radius, 80px blur, 8% opacity, Client lazy)
    │
    ├── LeftColumn (48% width, 640px max)
    │   ├── AIBadge (Server — pill with "NEW" tag + "AI-Powered Commerce")
    │   ├── Headline (Server — "Future of AI Commerce Starts Here.")
    │   │   └── AccentSpan (only "AI Commerce" in cyan, rest white)
    │   ├── Subtitle (20px, 540px max, balanced line breaks)
    │   ├── CTARow (Client — hover + glow effects)
    │   │   ├── StartShopping (Button primary, filled cyan, subtle glow)
    │   │   └── WatchDemo (Button ghost, subtle arrow animation)
    │   ├── MetricsRow (Server — 4 metrics, precise alignment)
    │   │   ├── 50K+ Products
    │   │   ├── 98% Satisfaction
    │   │   ├── 250+ Brands
    │   │   └── 4ms Search
    │   └── TrustBar (Server — Stripe, Shopify, Vercel, OpenAI monochrome)
    │
    └── RightColumn (52% width)
        └── CommerceCommandCenter (Client — single unified composable surface)
            ├── Header (Revenue KPI bar, top)
            ├── MainContent
            │   ├── AIWorkflowAssistant (left panel — shopping bundle builder)
            │   └── PremiumProductShowcase (center — Apple-style 3D presentation)
            ├── MidRow
            │   ├── OrdersPanel (left)
            │   └── SearchInsights (right)
            ├── LowerRow
            │   ├── InventoryPanel (left)
            │   └── AnalyticsSparkline (right)
            └── Footer
                ├── RecommendationRail (left, horizontal scroll hint)
                └── ActiveCartPreview (right, with checkout CTA)
```

---

### 2. The Commerce Command Center

**Core concept:** Replace six independent floating cards with **one unified composable surface.** The right side of the hero becomes a single visual composition — a living dashboard for an AI Commerce Operating System.

#### Layout Architecture

```
┌──────────────────────────────────────────────┐
│  COMMERCE COMMAND CENTER                     │
│                                              │
│  ┌── REVENUE ────────────────────────────┐   │
│  │  $32,450     ↑ 12.3%    vs last week  │   │
│  │  ▁▂▃▄▅▆▇██▇▆▅▄▃▂▁  (sparkline)       │   │
│  └────────────────────────────────────────┘   │
│                                              │
│  ┌─ AI WORKFLOW ─────┐ ┌─ PREMIUM PRODUCT ─┐ │
│  │ "gaming setup    │ │   ╔══════════╗     │ │
│  │  under $1800"    │ │   ║  🎧      ║     │ │
│  │ ───────────────── │ │   ║          ║     │ │
│  │ Analyzing budget→ │ │   ╚══════════╝     │ │
│  │ ✓ Laptop   $999  │ │   Soft pedestal     │ │
│  │ ✓ Keyboard $149  │ │   Subtle reflect    │ │
│  │ ✓ Mouse     $79  │ │   Rim lighting      │ │
│  │ ✓ Monitor  $349  │ │   Floating shadow   │ │
│  │ ───────────────── │ │                    │ │
│  │ Total: $1,576    │ │                    │ │
│  │ [Add Bundle]     │ │                    │ │
│  └──────────────────┘ └────────────────────┘ │
│                                              │
│  ┌── ORDERS ──────┐ ┌── SEARCH INSIGHTS ──┐ │
│  │ #1042  ✅ Done │ │ 🔍  "wireless ..."  │ │
│  │ #1043  🔄 Ship │ │ 1. Gaming headset  │ │
│  │ #1044  ⏳ Pack  │ │ 2. Wireless mouse  │ │
│  │                │ │ 3. USB microphone   │ │
│  └────────────────┘ └──────────────────────┘ │
│                                              │
│  ┌── INVENTORY ────┐ ┌── ANALYTICS ───────┐ │
│  │ 🟢 245 in stock │ │ ↑ 23% conversion   │ │
│  │ 🟡 12 low stock │ │ ↓ 5% bounce rate   │ │
│  │ 🔴 3 reorder    │ │ ▁▃▂▅▄▇▆ (mini)     │ │
│  └────────────────┘ └──────────────────────┘ │
│                                              │
│  ┌── RECOMMENDATIONS ──────────┐ ┌── CART ─┐│
│  │ Customers also bought       │ │ 🛒 3    ││
│  │ Keyboard → Mouse → Monitor  │ │ $1,250  ││
│  │ [→]  [→]  [→]              │ │ Checkout││
│  └─────────────────────────────┘ └─────────┘│
└──────────────────────────────────────────────┘
```

#### Design Principles for the Command Center

| Principle | Application |
|-----------|-------------|
| **Single surface** | One dark glass panel with very subtle border, not 6 separate cards |
| **Consistent rhythm** | Every panel is sized on a 4px grid; gaps are uniform |
| **Visual hierarchy** | Product showcase is largest (2×), Revenue is second (full width) |
| **Connection not separation** | Panels share subtle hairline dividers, not heavy borders |
| **Data first** | Every panel shows live-looking data to feel real |
| **Depth through opacity** | Base panel at `bg-black/40 backdrop-blur-xl`, inner panels at `bg-white/5` |
| **Unified accent** | Only cyan for interactive elements, white for data, green for positive metrics |

#### Why This Works

1. **It feels like a real product** — one unified OS interface, not a collage of widgets
2. **It tells a story** — you see AI receiving a request → building a bundle → revenue goes up → inventory adjusts → analytics reflect the change
3. **Every pixel sells** — no empty UI, no decorative elements that don't communicate product value
4. **Visual weight is balanced** — the product is the largest element, AI workflow is the second largest, everything else supports

---

### 3. AI Shopping Assistant — Workflow Design

**Do not build a generic chatbot.** Design a shopping workflow that communicates AI commerce immediately.

#### States

| State | What the User Sees | Feeling |
|-------|-------------------|---------|
| **Idle** | "I need a complete gaming setup under $1800" (example text) + cursor blink | Invitation to engage |
| **Processing** | Text morphs → "Analyzing budget..." → "Checking compatibility..." → "Finding best value..." | Intelligence in action |
| **Result** | Bundle appears with checkmarks, prices, total | Confidence |
| **CTR** | "Add Entire Bundle" button glows | Action |

#### Visual Design

- Input area: clean, no heavy chat-bubble styling (this is not a chat app)
- Processing state: fade through 3 short messages (200ms each), NOT a spinner
- Result: compact table layout, checkmarks in accent, prices right-aligned, total bolded
- CTA: subtle pulse on "Add Entire Bundle" to draw the eye

```
┌────────────────────────────────────────┐
│ ┌────────────────────────────────────┐ │
│ │ "I need a complete gaming setup   │ │
│ │  under $1800"                     │ │
│ └────────────────────────────────────┘ │
│                                         │
│ → Analyzing budget...                   │
│ → Checking compatibility...             │
│ → Finding best value...                 │
│                                         │
│ ┌────────────────────────────────────┐ │
│ │ Recommended Bundle                 │ │
│ │ ✓ Gaming Laptop (RTX 4060)  $999  │ │
│ │ ✓ Mechanical Keyboard       $149  │ │
│ │ ✓ Wireless Mouse              $79  │ │
│ │ ✓ 165Hz Gaming Monitor       $349  │ │
│ │ ─────────────────────────────────  │ │
│ │ Bundle Total              $1,576  │ │
│ │                                    │ │
│ │ [ Add Entire Bundle ]    Save $247 │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

---

### 4. Premium Product Showcase

**Avoid a simple floating PNG.** Design a premium product presentation inspired by Apple product photography.

#### Elements

| Element | Implementation | Purpose |
|---------|---------------|---------|
| **Soft pedestal** | Elliptical gradient glow beneath product, `bg-gradient-radial from-white/5 to-transparent` | Grounds the product, gives it physical presence |
| **Reflection** | Subtle flipped opacity gradient below pedestal, `mask-image: linear-gradient(to bottom, black 20%, transparent 80%)` | Adds polish, Apple-quality attention to detail |
| **Rim lighting** | Very subtle top-edge highlight on the product container, `box-shadow: 0 -1px 2px rgba(255,255,255,0.1) inset` | Defines form against the dark background |
| **Depth** | Multiple shadow layers: tight (2px blur, 20% black) + medium (8px blur, 15% black) + wide (24px blur, 10% black) | Creates realistic 3D presence |
| **Perspective** | Subtle 3D tilt on hover (max 5deg) via mouse tracking | Delight, makes the product feel tangible |
| **Back glow** | Soft radial glow behind the product | Draws the eye, creates separation from dashboard |
| **Size** | Container is ~280×320px, product takes ~60% of that space | Dominant but not overwhelming within the Command Center |

#### Inspirations

- Apple AirPods Max product page (floating presentation)
- Apple MacBook Pro hero (subtle reflection + shadow depth)
- Arc Browser website (soft pedestal for browser mockup)

---

### 5. Navbar — Premium Control Surface

**Elevate beyond navigation.** It should feel like a premium control surface inspired by Arc Browser, Linear, and Raycast.

#### Specifications

| Property | Value |
|----------|-------|
| Height | 72px (`h-18`) |
| Shape | Pill, `rounded-[999px]`, centered horizontally |
| Background | `bg-white/5 backdrop-blur-2xl` initial, subtle increase on scroll |
| Shadow | None initial, `shadow-[0_8px_32px_rgba(0,0,0,0.3)]` on scroll |
| Width | `max-w-5xl` (~1024px) on desktop, full-width on mobile |
| Max links | 5 (Home, Shop, Collections, AI Shopping, About) |
| Typography | 14px, medium weight, uppercase tracking-wider (Linear-inspired) |

#### Link Design

- Inactive: `text-white/60`, no decoration
- Hover: `text-white`, subtle background at `bg-white/5` with `rounded-lg`
- Active: `text-white` with a small dot indicator beneath (2px circle, cyan, `rounded-full`)
- Transition: 150ms ease-out on color + background

#### Action Buttons

| Element | Style |
|---------|-------|
| Search | Icon only, `lucide-react Search`, `aria-label="Search"`, shows `⌘K` on hover tooltip |
| Theme Toggle | Icon only, `lucide-react Sun/Moon` |
| Cart | Icon only with animated dot, `lucide-react ShoppingBag`, dot appears when items exist |
| Sign In | `Button variant="ghost"`, `h-9`, `px-4`, `text-sm`, `text-white/70 hover:text-white` |
| Get Started | `Button variant="primary"`, `h-11`, `px-5`, `text-sm`, filled accent, subtle glow hover |

#### Mobile

- Compact pill (56px height, full width)
- Hamburger icon (three-line), not word "Menu"
- Dropdown is a direct extension of the pill (same glass, same rounding at bottom)
- Links stack vertically with 8px gap
- Action buttons collapse into the dropdown

#### Inspiration

- **Arc Browser** — the compact, perfectly balanced top bar
- **Linear** — the typographic precision, the active dot indicator
- **Raycast** — the command-palette feel of the search

---

### 6. Background — Refined

**Simplify further. Remove everything unnecessary.**

| Layer | Type | Opacity | Size | Blur | Notes |
|-------|------|---------|------|------|-------|
| 1 | Solid `#05070B` | 100% | Full | — | Base |
| 2 | Radial gradient (top-right, cyan-blue) | 15% at center | 60% of viewport | — | Soft atmospheric light |
| 3 | Radial gradient (bottom-left, deep purple) | 10% at center | 50% of viewport | — | Adds depth, prevents flatness |
| 4 | Grid (1px dots, `rgba(255,255,255,0.03)`) | 100% (dots at 3%) | Full | — | Faint structure, 24px spacing |
| 5 | Spotlight (circular, mouse-following) | 8% at center | 280px radius | 80px | Interactive depth cue |

**Particles removed.** At 5% opacity with only 30 particles, they added visual noise without meaningful improvement. The spotlight provides enough atmospheric motion.

**No noise/grain.** Clean surfaces only.

**Server vs Client split:**
- Layers 1-4: Server-rendered (pure CSS, zero JS)
- Layer 5 (Spotlight): Client-only, lazy-loaded via `next/dynamic`

---

### 7. Spacing Architecture

Every spacing decision follows a 4px/8px grid system. Nothing is arbitrary.

| Context | Spacing Rule | Why |
|---------|-------------|-----|
| Navbar padding (horizontal) | 12px from edge, 20px between sections | Tight enough for compactness, wide enough for breathing room |
| Navbar link gap | 4px | Tight grouping strengthens "command surface" feel |
| Left column vertical rhythm | 32px between AI Badge → Headline, 24px Headline → Subtitle, 32px Subtitle → CTAs, 40px CTAs → Metrics, 32px Metrics → Trust Bar | Wider spacing at visual breaks, tighter within groups |
| Command Center internal gap | 8px between panels | Dense enough to feel like one surface, spaced enough to read each panel |
| Command Center padding | 16px outer, 12px inner panel padding | Feels contained but not cramped |
| Hero left/right column gap | 48px | Clear separation without disconnection |
| Trust bar logo gap | 32px | Even breathing room for each brand |
| Metrics value/label gap | 4px | Value dominates, label supports |

**Whitespace creates luxury.** Where most sites would compress, we leave room. The composition breathes.

---

### 8. Typography

| Element | Size | Weight | Line Height | Letter Spacing | Max Width |
|---------|------|--------|-------------|----------------|-----------|
| AI Badge | 13px | 600 (semibold) | 16px | 0.05em | auto |
| Headline | 72px (desktop), 56px (tablet), 36px (mobile) | 700 (bold) | 1.05 | -0.02em | 620px |
| Accent "AI Commerce" | Same as headline | 700 | — | — | — |
| Subtitle | 20px | 400 (normal) | 1.6 | 0 | 540px |
| Metric value | 36px | 700 | 1 | 0 | — |
| Metric label | 13px | 400 | 1.4 | 0.02em | — |
| CTA button text | 15px | 600 | 1 | 0 | — |
| Nav link | 14px | 500 | 1 | 0.06em | — |
| Command Center panel header | 11px | 600 | 1 | 0.08em | — |
| Command Center data | 14px | 500 | 1.4 | 0 | — |

**Line break optimization:** The headline "Future of AI Commerce Starts Here." breaks naturally as:
```
Future of
AI Commerce
Starts Here.
```
This gives "AI Commerce" its own line — the precise emphasis the spec requires.

---

### 9. Motion — Expensive & Elegant

**Philosophy:** Motion should feel expensive, not flashy. Think Apple keynote transitions, Linear's precise fades, Framer's spring interactions.

#### Entry Sequence (Staggered, 0.45s total)

| Element | Animation | Delay | Duration | Easing |
|---------|-----------|-------|----------|--------|
| AI Badge | slide-up + fade | 0.1s | 0.35s | cubic-bezier(0.16, 1, 0.3, 1) |
| Headline | slide-up + fade | 0.15s | 0.4s | same |
| Subtitle | slide-up + fade | 0.2s | 0.4s | same |
| CTAs | slide-up + fade | 0.25s | 0.35s | same |
| Metrics | stagger-in (each item) | 0.3s base, 80ms stagger | 0.3s | same |
| Trust Bar | fade-in | 0.45s | 0.4s | same |
| Command Center | scale-in (0.95→1) + fade | 0.2s | 0.5s | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Panels (inside CC) | stagger slide-up | 0.3s base, 60ms stagger | 0.35s | cubic-bezier(0.16, 1, 0.3, 1) |

#### Interaction Motion

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Nav link | hover | Background appear + color shift | 150ms |
| Nav link active dot | page change | Scale-in from 0 to 1 with spring | 300ms |
| Button primary | hover | Scale 1.02 + shadow deepen | 200ms |
| Button ghost | hover | Arrow translateX(+4px) | 200ms |
| Command Center | mouse move | Subtle parallax (max 6px) on panels | spring, mass 0.5 |
| Product showcase | hover | 3D tilt (max 5deg) via CSS `transform-style: preserve-3d` | 300ms |
| Product showcase | mouse move | Parallax within tilt (2px range) | reactive |
| Revenue sparkline | entry | Draw-in animation (stroke-dashoffset) | 600ms |
| AI workflow | state change | Crossfade between states | 200ms |
| Spotlight | mouse move | Spring-follow with `damping: 20, stiffness: 150` | — |

#### Loop Animations (Use Sparingly)

| Element | Animation | Duration | Delay |
|---------|-----------|----------|-------|
| Revenue sparkline | Subtle pulse (opacity 0.8↔1) | 4s | 0s |
| Product showcase | Very subtle float (Y ±4px) | 8s | 0s |
| Cart dot | Gentle pulse when items present | 2s | 0s |

**No floating cards bouncing up and down.** The spec explicitly says no flashy animations. Loop animations are restrained to 3 elements max.

#### Reduced Motion

All animated elements check `prefers-reduced-motion`. When active:
- Entry animations: initial = animate state (no movement)
- Hover effects: instant, no transition
- Loop animations: paused
- Spotlight: disabled

---

### 10. Responsive Behavior

| Element | Desktop ≥1024 | Tablet 768-1023 | Mobile <768 |
|---------|--------------|-----------------|-------------|
| Layout | Two-column split (48/52) | Single column | Single column |
| Navbar | 72px pill, centered, 1024px max-w | 64px pill, centered | 56px compact, full-width, hamburger |
| Headline | 72px, 620px max-w | 56px, full width | 36px, full width |
| Command Center | Full right column | Below hero copy, compact 2-col | 1-col stacked |
| AI Workflow | Left panel, medium | Top of CC | 2nd position |
| Product Showcase | Center, largest | Center, large | 1st position |
| Metrics | 4 in a row | 2×2 grid | 2×2 grid |
| Trust bar | 4 logos visible | 2 logos + "& more" | Text only |
| CTAs | Side by side | Side by side | Stacked, full-width |
| Panels inside CC | 6-panel grid | 4-panel grid + scroll | 1-up stack |

---

### 11. Accessibility

- **Reduced motion**: All `motion.div` checks `prefers-reduced-motion`. Static fallback state.
- **Heading hierarchy**: `h1` for headline, `h2` for Command Center panels, `h3` for panel headers. No skipped levels.
- **Focus states**: All interactive elements have visible `focus-visible:ring-2 ring-cyan-400/50` outlines.
- **ARIA**: Search → `aria-label="Search"`. Cart → `aria-label="Shopping cart"`. Mobile menu → `aria-expanded`, `aria-controls`. Command Center → `role="region" aria-label="Commerce Command Center"`.
- **Color contrast**: All text WCAG AA against `#05070B`. Cyan `#00D9FF` passes AA for large text (18px+).
- **Touch targets**: All buttons ≥44×44px. Cards are not buttons — they use `role="region"`.
- **Keyboard navigation**: Tab order follows visual order. Command Center panels are reachable but skip-able with a skip link.
- **Screen readers**: Product showcase gets `role="img" aria-label="Premium wireless headphones"`. AI workflow has `aria-live="polite"` for state changes.

---

### 12. Performance

- **Server components first**: Background (layers 1-4), AI Badge, Headline, Subtitle, Metrics, Trust Bar render on the server with zero JS.
- **Client islands**: Spotlight is the only lazy-loaded client component. Command Center is one client component (single hydration point instead of 6).
- **No individual particle motion.divs**: Particles removed entirely.
- **CSS animations where possible**: Float loops, hover effects, active dot use CSS `@keyframes` and transitions. Framer-motion reserved for entry sequence and spotlight.
- **Product image**: `next/image` with `priority`, blur placeholder, WebP format.
- **Bundle**: Tree-shaken `lucide-react` imports. Framer-motion only for entry/spotlight. No chart library — sparklines are inline SVG `<path>`.
- **Lazy load**: Spotlight via `next/dynamic` with `ssr: false` and small skeleton.
- **No layout shifts**: All panels have explicit dimensions. Skeleton states for lazy content.
- **Font**: System font stack for Command Center data (avoids loading a second font family for UI text).

---

### 13. Server vs Client Components

| Component | Type | Reason |
|-----------|------|--------|
| `HomePage` | Server | Composes children, no interactivity |
| `Navbar` | Client | Scroll listener, mobile toggle, AnimatePresence |
| `Hero` | Client | Scroll-driven transforms, mouse parallax, spotlight |
| `Background/SolidBase` | Server | Static CSS, no interactivity |
| `Background/RadialGradient` | Server | Static CSS background |
| `Background/Grid` | Server | Static CSS pattern |
| `Background/Spotlight` | Client (lazy) | Mouse tracking, never visible to SSR |
| `AIBadge` | Server | Static content, no interactivity |
| `Headline` | Server | Static text with gradient span |
| `Subtitle` | Server | Static text |
| `CTARow` | Client | Hover states, glow effect |
| `MetricsRow` | Server | Static numbers, CSS counter animation (optional) |
| `TrustBar` | Server | Static logos with CSS grayscale |
| `CommerceCommandCenter` | Client | Entry animation, mouse parallax, AI workflow states |
| `AIWorkflowAssistant` | Client (part of CC) | State machine for workflow steps |
| `PremiumProductShowcase` | Client (part of CC) | 3D tilt, mouse tracking |
| `Dashboard panels` | Server (rendered inside CC) | Static data display, CSS animations only |

---

### 14. Refined ASCII Wireframes

```
Desktop (1440px)
┌──────────────────────────────────────────────────────────────────────┐
│            ┌──────────────────────────────────────────┐              │
│            │  ⌘ NEXUS  Home  Shop  Collections       │              │
│            │  AI Shopping  About      🔍 ☀ 🛒 · Sign │              │
│            │                               Get Started              │
│            └──────────────────────────────────────────┘              │
│                                                                      │
│  ┌────────── 48% ──────────┐   ┌────────── 52% ───────────────────┐ │
│                              │                                      │ │
│  ┌────────────────────────┐ │   │  ┌── COMMERCE COMMAND CENTER ─┐ │ │
│  │  🪄 NEW · AI Powered   │ │   │  │ ┌────────────────────────┐ │ │
│  │  Commerce              │ │   │  │ │  Revenue +$32,450 ↑12% │ │ │
│  └────────────────────────┘ │   │  │ └────────────────────────┘ │ │ │
│                              │   │  │ ┌────────┐ ┌────────────┐ │ │ │
│  Future of                  │   │  │ │ AI     │ │ ♫ Premium  │ │ │ │
│  AI Commerce                │   │  │ │ Work-  │ │   Product  │ │ │ │
│  Starts Here.               │   │  │ │ flow   │ │   ╔══╗     │ │ │ │
│                              │   │  │ │ Bundle │ │   ║  ║     │ │ │ │
│  20px supporting copy that  │   │  │ │ Builder│ │   ╚══╝     │ │ │ │
│  explains the value          │   │  │ └────────┘ └────────────┘ │ │ │
│                              │   │  │ ┌────────┐ ┌────────────┐ │ │ │
│  [Start Shopping] [Watch →] │   │  │ │ Orders │ │ Search     │ │ │ │
│                              │   │  │ │ #1042  │ │ Insights   │ │ │ │
│  50K+    98%    250+   4ms  │   │  │ └────────┘ └────────────┘ │ │ │
│  Products Sat.  Brands Speed│   │  │ ┌────────┐ ┌────────────┐ │ │ │
│                              │   │  │ │ Inven- │ │ Analytics  │ │ │ │
│  Stripe  Shopify  Vercel OAI│   │  │ │ tory   │ │ ↑23%       │ │ │ │
│                              │   │  │ └────────┘ └────────────┘ │ │ │
│                              │   │  │ ┌───────────────────────┐ │ │ │
│                              │   │  │ │ Recommendations →     │ │ │ │
│                              │   │  │ │ Customers also bought │ │ │ │
│                              │   │  │ └───────────────────────┘ │ │ │
│                              │   │  └──────────────────────────┘ │ │
└──────────────────────────────┴───┴────────────────────────────────┘ │

Tablet (768px)
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────┐          │
│  │  ⌘ NEXUS  ···  🔍 ☀ 🛒 Sign  │          │
│  └────────────────────────────────┘          │
│                                               │
│  🪄 NEW · AI Powered Commerce                 │
│                                               │
│  Future of                                    │
│  AI Commerce                                  │
│  Starts Here.                                 │
│                                               │
│  20px supporting copy...                      │
│                                               │
│  [Start Shopping] [Watch →]                  │
│                                               │
│  50K+ Products    98% Satisfaction           │
│  250+ Brands      4ms Search                 │
│                                               │
│  Stripe  Shopify  +2                          │
│                                               │
│  ┌── COMMERCE COMMAND CENTER ────────────┐   │
│  │ ┌──────────┐ ┌──────────────────────┐ │   │
│  │ │ AI       │ │  ♫ Premium Product  │ │   │
│  │ │ Workflow │ │    ╔══╗             │ │   │
│  │ │ Builder  │ │    ║  ║             │ │   │
│  │ └──────────┘ └──────────────────────┘ │   │
│  │ ┌──────────┐ ┌──────────────────────┐ │   │
│  │ │ Revenue  │ │  Orders             │ │   │
│  │ │ +$32,450 │ │  #1042, #1043       │ │   │
│  │ └──────────┘ └──────────────────────┘ │   │
│  │ ┌──────────┐ ┌──────────────────────┐ │   │
│  │ │ Search   │ │  Cart 🛒            │ │   │
│  │ │ Insights │ │  $1,250 · Checkout  │ │   │
│  │ └──────────┘ └──────────────────────┘ │   │
│  └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘

Mobile (375px)
┌──────────────────────────┐
│  ⌘ NEXUS  ···           │
│                          │
│  🪄 NEW · AI Powered    │
│  Commerce                │
│                          │
│  Future of               │
│  AI Commerce             │
│  Starts Here.            │
│                          │
│  20px supporting copy   │
│                          │
│  [Start Shopping]       │
│  [Watch →]               │
│                          │
│  50K+      98%           │
│  Products  Satisfaction  │
│  250+      4ms           │
│  Brands    Search        │
│                          │
│  ┌── COMMAND CENTER ──┐  │
│  │ ♫ Premium Product │  │
│  │ ╔══╗              │  │
│  │ ║  ║              │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ AI Workflow        │  │
│  │ Bundle Builder     │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ Revenue            │  │
│  │ +$32,450 ↑12%     │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ Cart 🛒 $1,250     │  │
│  │ → Checkout         │  │
│  └────────────────────┘  │
└──────────────────────────┘
```
