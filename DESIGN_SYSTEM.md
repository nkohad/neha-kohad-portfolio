# Neha Kohad Portfolio — Design System

A portable reference for typography, color, spacing, components, motion, and layout extracted from this portfolio. Copy any section to a new project.

---

## Aesthetic Philosophy

Dark-first, typographically-led. Content breathes with generous whitespace. Color is used sparingly — almost everything is white/black at varying opacity, with gradient accents only for emphasis. Interactions are physical: elements spring, lift on hover, and fade in on scroll. Nothing flashes or jumps.

---

## 1. Typography

### Fonts

```css
/* Import in <head> or index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;900&family=Space+Grotesk:wght@400;500;700;900&display=swap');
```

```css
/* Tailwind theme tokens */
--font-sans:    "Inter", ui-sans-serif, system-ui, sans-serif;
--font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
```

**Rule:** `font-display` (Space Grotesk) for anything the user reads as a heading, number, or named title — including interactive row headings. `font-sans` (Inter) for prose, captions, labels, and metadata.

---

### Type Scale

All sizes use Tailwind's named scale — no raw `text-[Npx]` values.

| Role | Class | Size | Weight | Tracking |
|---|---|---|---|---|
| Page hero H1 | `text-5xl sm:text-6xl lg:text-7xl` | 48 → 60 → 72px | `font-black` | `tracking-tighter` |
| Section subtitle | `text-2xl sm:text-3xl` | 24 → 30px | `font-medium` | `tracking-tight` |
| Section H2 | `text-3xl sm:text-4xl` | 30 → 36px | `font-bold` | `tracking-tight` |
| Card / row heading | `text-sm` | 14px | `font-medium` | default |
| Stat number (hero) | `text-5xl` | 48px | `font-black` | `tracking-tighter` |
| Stat number (section) | `text-6xl` | 60px | `font-black` | `tracking-tighter` |
| Body large | `text-xl sm:text-2xl` | 20 → 24px | `font-normal` | default |
| Body standard | `text-base` | 16px | `font-normal` | default |
| Body small | `text-sm` | 14px | `font-normal` | default |
| Section label | `text-xs font-bold uppercase tracking-widest` | 12px | `font-bold` | `tracking-widest` |
| Caption | `text-xs` | 12px | default | `tracking-wide` |

**Important:** All interactive row titles (feature lists, insight/change tables) use `font-display` even at `text-sm`. Don't drop to `font-sans` for headings just because they're small.

---

### Leading

| Context | Class |
|---|---|
| Headlines | `leading-[1.05]` or `leading-tight` |
| Subtitles / card titles | `leading-snug` |
| Body text | `leading-relaxed` |

---

## 2. Color

### Philosophy

Nearly everything is `white` or `black` at opacity. This means the palette adapts to any brand color drop-in without rework. Accent gradients are multi-stop and directional — never flat.

### Dark Mode Backgrounds

```
#050505  — body / root (deepest)
#0a0a0a  — content areas, modal surface
#0d0d0d  — alternate sections (Stage 3, metric card interiors)
```

### Light Mode Backgrounds

```
#fafafa  — body / root
white    — content areas
zinc-50  — alternate sections
```

### Text Opacity Scale

Use `text-white/{n}` in dark mode, `light:text-zinc-{n}` in light mode.

| Purpose | Dark | Light |
|---|---|---|
| Primary / headings | `text-white` | `light:text-zinc-900` |
| Body | `text-white/70` | `light:text-zinc-600` |
| Secondary / muted body | `text-white/60` | `light:text-zinc-600` |
| Tertiary / labels | `text-white/55` | `light:text-zinc-500` |
| Disabled / placeholder | `text-white/50` | `light:text-zinc-500` |
| Ultra-muted | `text-white/20` | — |

### Border Colors

```
border-white/10   — default card / section divider (dark)
border-white/15   — button default (dark)
border-white/20   — nav container (dark)
border-white/25   — active row highlight (dark)
light:border-black/10   — default (light)
light:border-black/20   — active row (light)
```

### Accent Colors

Accents appear only as gradients — never as solid fills.

```css
/* Violet / Blue — research, strategy */
from-violet-500/45 via-blue-500/20 to-transparent

/* Orange / Red — warnings, constraints */
from-orange-400/45 via-red-500/25 to-transparent

/* Cyan / Slate — clarity, information */
from-cyan-300/35 via-slate-400/20 to-transparent

/* Sky / Blue — insight 1 */
from-sky-500/50 via-blue-600/30 to-transparent

/* Violet / Purple — insight 2 */
from-violet-500/50 via-purple-600/30 to-transparent

/* Rose / Pink — insight 3 */
from-rose-500/50 via-pink-600/30 to-transparent

/* Emerald / Teal — outcome, success */
from-emerald-500/50 via-teal-600/30 to-transparent
```

### Semantic Colors

```
text-emerald-400 / light:text-emerald-600  — positive outcome, design change
text-amber-400   / light:text-amber-600    — warning, caution
```

### Card Contrast Flip

One card in a set of siblings is inverted (white bg, black text) to create visual rhythm without adding color:

```tsx
// Dark mode: card is white bg, black text
// Light mode: card is zinc-900 bg, white text
className="bg-white text-black light:bg-zinc-900 light:text-white border-white/70 light:border-zinc-900"

// Sibling cards: dark surface
className="bg-white/[0.04] text-white light:bg-black/[0.03] light:text-zinc-900 border-white/10 light:border-black/10"
```

---

## 3. Spacing

### Core Scale

These are the values in active use. Stick to these; don't introduce new ones.

| Token | px | Usage |
|---|---|---|
| `gap-3` | 12px | Tag groups, small icon gaps |
| `gap-4` | 16px | Grid columns gap |
| `gap-5` | 20px | Stage 1 card internal gap |
| `gap-6` | 24px | Standard component gap |
| `gap-8` | 32px | Section column gaps |
| `gap-10` | 40px | Section lateral spacing |
| `gap-16` | 64px | Wide section lateral spacing |
| `space-y-5` | 20px | Nav item spacing |
| `space-y-36` | 144px | Inter-section vertical gap (major content sections) |

### Page Layout Padding

```
Horizontal: px-8 md:px-16        (case study content)
Horizontal: px-6 sm:px-12 md:px-20  (home / carousel)
Vertical top: pt-28 (hero section)
Vertical bottom: pb-20 (content area)
```

### Card Internal Padding

```
p-5   — standard card (stat cards, insight cards, callout boxes)
p-7   — large display callout (design challenge block)
p-8   — standalone full-width cards (fallback AI cards)
```

### Section Margins

```
mb-8   — heading bottom margin (component level)
mb-10  — after intro paragraph before grid
mb-12  — after back button in sidebar
mb-48 lg:mb-64  — hero section bottom (About page)
mb-32  — major section bottom (Experience)
mb-24  — minor section bottom (Education)
mt-36  — reflection section top (within impact)
```

---

## 4. Border Radius

| Token | px | Usage |
|---|---|---|
| `rounded-full` | 9999px | Pills, tags, nav, avatar circles |
| `rounded-3xl` | 24px | Cards (stat, insight, metric), callout blocks |
| `rounded-2xl` | 16px | List-item cards, carousel cards, mobile nav items |
| `rounded-xl` | 12px | Callout chips (Key Question), buttons |
| `rounded-[18px]` | 18px | MacBook shell only — don't reuse |
| `rounded-[11px]` | 11px | MacBook screen only — don't reuse |

**Rule:** Never write `rounded-[24px]` — use `rounded-3xl` instead.

---

## 5. Components

### Navigation — Pill Nav

Frosted glass, centered, fixed top. Active tab gets a subtle filled background.

```tsx
// Container
className="flex items-center gap-1 p-1 rounded-full bg-white/10 light:bg-black/5 backdrop-blur-xl border border-white/20 light:border-black/10 shadow-2xl"

// Nav link
className="relative px-6 py-1 rounded-full text-sm font-medium tracking-wide"
// Active: text-white + bg-white/20 fill
// Inactive: text-zinc-300 hover:text-white
```

---

### Section Label

Uppercase, wide-tracked, muted. Used above any grouping of items.

```tsx
<div className="text-xs font-bold uppercase tracking-widest text-white/55 light:text-zinc-500 mb-3">
  Features
</div>
```

---

### Split Stat Card

Big number left, label + description right. One card per group inverts (white/dark flip).

```tsx
<div className="rounded-3xl border flex overflow-hidden bg-white/[0.04] light:bg-black/[0.03] border-white/10 light:border-black/10">
  {/* Left: gradient + number */}
  <div className="w-[42%] shrink-0 bg-gradient-to-br from-violet-500/45 via-blue-500/20 to-transparent flex items-end p-5">
    <span className="font-display font-black text-5xl tracking-tighter leading-none text-white light:text-zinc-900">
      55K+
    </span>
  </div>
  {/* Right: label + description */}
  <div className="flex-1 flex flex-col justify-end p-5 bg-[#0d0d0d] light:bg-white">
    <h3 className="font-display font-bold text-sm tracking-tight text-white light:text-zinc-900 mb-1">
      Enterprise Scale
    </h3>
    <p className="font-sans text-xs leading-snug text-white/50 light:text-zinc-500">
      Description text here.
    </p>
  </div>
</div>
```

---

### Insight Card (4-col grid)

Gradient header strip with icon, then content below.

```tsx
<div className="rounded-3xl border overflow-hidden flex flex-col bg-white/[0.04] light:bg-black/[0.03] border-white/10 light:border-black/10">
  {/* Gradient header strip */}
  <div className="h-20 bg-gradient-to-br from-violet-500/50 via-blue-500/25 to-transparent flex items-end px-5 pb-3">
    <Icon size={22} className="text-white/55" />
  </div>
  {/* Content */}
  <div className="p-5 flex flex-col gap-3 flex-1">
    <h3 className="font-display font-bold text-base tracking-tight text-white light:text-zinc-900">
      Heading
    </h3>
    <p className="font-sans text-sm leading-relaxed flex-1 text-white/60 light:text-zinc-500">
      Body text.
    </p>
    <div className="border-t pt-3 border-white/10 light:border-black/10">
      <div className="text-xs font-bold uppercase tracking-widest mb-1.5 text-white/50">Sub Label</div>
      <p className="font-sans text-sm leading-relaxed text-white/50">Secondary text.</p>
    </div>
  </div>
</div>
```

---

### Interactive Row (Feature / Insight List)

Click or hover to expand. Active row gets full-opacity heading and shows body text.

```tsx
<div className={`py-4 border-t cursor-pointer transition-colors duration-300 ${
  isActive ? 'border-white/25 light:border-black/20' : 'border-white/10 light:border-black/10'
}`}>
  <div className={`flex items-center gap-2 font-display text-sm font-medium mb-1.5 transition-colors duration-300 ${
    isActive ? 'text-white light:text-zinc-900' : 'text-white/55 light:text-zinc-500'
  }`}>
    <Icon size={13} className="shrink-0 opacity-70" />
    Row heading
  </div>
  {/* Animated expand */}
  <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
    <p className="font-sans text-base text-white/60 light:text-zinc-600 leading-relaxed pt-1">
      Description text.
    </p>
  </div>
</div>
```

---

### Design Challenge Callout

Inverted card (white bg) with a design question in display font.

```tsx
<div className="rounded-3xl bg-white light:bg-zinc-900 p-7 mt-5">
  <h3 className="text-xs font-bold uppercase tracking-widest text-black/55 light:text-white/55 mb-4">
    Design Challenge
  </h3>
  <p className="font-display font-medium text-xl sm:text-2xl text-black light:text-white tracking-tight leading-snug">
    How might we…
  </p>
</div>
```

---

### Key Question Chip

Small inverted callout used alongside a MacBook mockup.

```tsx
<div className="rounded-xl bg-white light:bg-zinc-900 text-black light:text-white p-5">
  <div className="text-xs font-bold uppercase tracking-widest text-black/55 light:text-white/55 mb-1.5">
    Key Question
  </div>
  <p className="font-display font-bold text-lg tracking-tight leading-snug">Question text.</p>
</div>
```

---

### MacBook Frame Mockup

Use to frame prototype screenshots or placeholder gradients.

```tsx
<div className="w-full rounded-[18px] bg-[#1d1d1f] p-[9px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.10]">
  <div className="flex justify-center pb-[6px]">
    <div className="w-[7px] h-[7px] rounded-full bg-[#3a3a3c]" />
  </div>
  <div className="aspect-[16/10] rounded-[11px] bg-black overflow-hidden relative">
    {/* Your content or gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/50 via-blue-600/30 to-transparent" />
  </div>
</div>
{/* Base */}
<div className="w-[90%]">
  <div className="h-[5px] bg-[#1d1d1f] rounded-b" />
  <div className="h-[10px] bg-[#141414] mx-1 rounded-b-xl shadow-xl" />
</div>
```

---

### Tool Tag / Badge

```tsx
<div className="flex items-center gap-2 rounded-full bg-white/10 light:bg-black/5 border border-white/15 light:border-black/10 px-3 py-2 text-xs font-semibold text-white/80 light:text-zinc-700">
  <Icon size={14} />
  <span>Figma</span>
</div>
```

---

### Type / Category Tag

```tsx
<span className="px-3 py-1.5 rounded-full bg-white/10 light:bg-black/5 text-white light:text-zinc-900 border border-white/20 light:border-black/10 font-sans text-xs uppercase tracking-wider font-medium">
  Internship
</span>
```

---

### Outcome List Item

```tsx
<div className="flex items-center gap-3 p-5 rounded-2xl bg-white/[0.04] light:bg-black/[0.03] border border-white/10 light:border-black/10 flex-1">
  <Check size={15} className="text-emerald-400 light:text-emerald-600 shrink-0" />
  <p className="font-sans text-sm text-white/70 light:text-zinc-600 leading-snug">
    Outcome description.
  </p>
</div>
```

---

### CTA Button (Outlined)

```tsx
<a className="flex items-center justify-between w-full rounded-xl border border-white/15 light:border-black/10 px-4 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white light:text-zinc-900 bg-white/[0.06] light:bg-black/[0.03] hover:bg-white/10 light:hover:bg-black/[0.06] hover:border-white/30 light:hover:border-black/20 transition-colors group">
  <span>Live Case Study</span>
  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
</a>
```

---

### Section Divider

```tsx
<div className="border-t border-white/10 light:border-black/10" />
```

---

## 6. Layout

### Case Study Layout — Sidebar + Content

```
┌──────────────┬────────────────────────────────────────┐
│  Sidebar     │  Content                               │
│  w-72        │  flex-1                                │
│  sticky      │  bg-[#0a0a0a]                          │
│  h-screen    │                                        │
│  p-8         │  px-8 md:px-16                         │
└──────────────┴────────────────────────────────────────┘
```

```tsx
// Shell
<div className="flex w-full bg-[#0a0a0a] light:bg-white">
  {/* Sidebar */}
  <div className="hidden md:flex flex-col w-72 shrink-0 border-r border-white/10 light:border-zinc-200 bg-[#050505] light:bg-white p-8 h-screen sticky top-0 self-start">
    ...
  </div>
  {/* Main */}
  <div className="flex-1 relative overflow-x-hidden bg-[#0a0a0a] light:bg-white">
    ...
  </div>
</div>
```

### Active Nav Indicator — Animated Left Bar

```tsx
{isActive && (
  <motion.div
    layoutId="activeSectionIndicator"
    className="absolute left-0 top-0 bottom-0 w-0.5 bg-white light:bg-zinc-900"
  />
)}
```

### Two-Column Content Grid

```tsx
// Asymmetric — text left, visual right
<div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-center">

// Insight table
<div className="flex gap-10 xl:gap-16 items-start">
  <div className="flex-1 min-w-0">   {/* table */}
  <div className="hidden xl:flex w-[42%] shrink-0 flex-col gap-4 self-start">  {/* MacBook */}

// Hero split with meta
<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,680px)_minmax(280px,1fr)] gap-8 lg:gap-16 items-end">
```

### 4-col Insight Grid

```tsx
<div className="grid grid-cols-4 gap-4">
```

### Meta Grid (hero footer)

```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-[1.15fr_0.8fr_0.8fr_1fr_1.45fr] gap-x-8 gap-y-8 lg:gap-x-14 xl:gap-x-20 mt-10 pt-8 border-t border-white/10 light:border-black/10 w-full">
```

### Alternate Section Background

Full-bleed section within content well:

```tsx
<div className="-mx-8 md:-mx-16 scroll-mt-24">
  <div className="bg-[#0d0d0d] light:bg-zinc-50 px-8 md:px-16 flex flex-col gap-10 py-10">
    ...
  </div>
</div>
```

---

## 7. Motion

Library: `motion/react` (Motion for React).

### Easing

```
[0.16, 1, 0.3, 1]  — snappy spring-like ease (primary)
spring: { stiffness: 300, damping: 30 }  — nav entrance
spring: { bounce: 0.18, duration: 0.45 } — card hover lift
```

### Entrance Animations

```tsx
// Page / modal entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}

// Scroll-triggered (whileInView)
initial={{ opacity: 0, y: 8 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}

// Staggered siblings: delay: i * 0.1

// Slower scroll entrance (MacBook mockup)
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
```

### Hover

```tsx
// Card hover lift
whileHover={{ y: -6 }}
transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}

// Subtle card lift (carousel)
whileHover={{ y: -4 }}

// Experience row lift
whileHover={{ y: -2 }}
```

### Content Swap (active feature / stage changes)

```tsx
<motion.div
  key={activeIndex}           // key change triggers re-animation
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.45 }}
>
```

### Row Expand (accordion body)

```tsx
// CSS-only, no JS measurement needed
className={`overflow-hidden transition-all duration-500 ${
  isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
}`}
```

---

## 8. Dark / Light Mode

### Implementation

Dark is the default (unprefixed). Light mode is opt-in via the `light` class on `<html>`.

```css
/* index.css */
@custom-variant light (&:where(.light, .light *));
```

### Writing Dual-Mode Classes

```tsx
// Background
className="bg-[#0a0a0a] light:bg-white"

// Text
className="text-white light:text-zinc-900"

// Border
className="border-white/10 light:border-black/10"

// Surface
className="bg-white/[0.04] light:bg-black/[0.03]"
```

### Transition

```css
body {
  transition: background-color 0.4s ease, color 0.4s ease;
}
```

---

## 9. Accessibility

### Focus Rings

All interactive elements get a consistent focus ring:

```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded"
```

In light mode, consider adding `light:focus-visible:ring-black/30`.

### Keyboard-Interactive Non-Button Elements

```tsx
<motion.div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handler(); }}
>
```

### ARIA

```tsx
// Sections
<div role="region" aria-label="More case studies">

// Icon-only buttons
<button aria-label="Scroll left">

// Decorative images
<img src={...} alt="" />

// Meaningful images
<img src={...} alt="The Cox HCD Resource Hub team" />
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 10. Icons

Library: `lucide-react`.

| Size | Usage |
|---|---|
| `size={13}` | Interactive row heading icon (inline with `text-sm`) |
| `size={14}` | CTA button arrow |
| `size={15}` | Check mark in outcome items |
| `size={16}` | Sidebar back arrow, tool icons |
| `size={18}` | Carousel navigation buttons |
| `size={20}` | Mobile back button |
| `size={22}` | Insight card header icon |
| `size={24}` | Feature callout icon (AI section) |

Row icons always get `className="shrink-0 opacity-70"` to stop them blowing out layout and to reduce visual weight.

---

## 11. Data Patterns

### Meta Strip (project header)

```ts
meta: [
  { label: 'Role',     value: 'UX Research + Design' },
  { label: 'Timeline', value: '15 Weeks' },
  { label: 'Team',     value: '4 Designers' },
  { label: 'Client',   value: 'Cox Enterprises' },
  { label: 'Scope',    value: 'Product Strategy · IA · Interaction Design' },
]
```

### Stat Card

```ts
metrics: [
  { value: '55K+', label: 'Enterprise Scale', description: 'Employees with access.' },
]
```

### Validation Metric

```ts
metrics: [
  { value: '4.2', unit: '/5', label: 'SUS Score', description: '...', gradient: 'from-violet-500/45 via-blue-500/20 to-transparent' },
]
```

### Insight / Design Change Row

```ts
insights: [
  {
    phrase:       'Short insight label',
    insight:      'Full insight paragraph.',
    changePhrase: 'Short design response label',
    change:       'Full design response paragraph.',
  },
]
```

---

## 12. Quick Reference — Class Cheatsheet

```
FONTS
  font-display          Space Grotesk — headings, stats, row titles
  font-sans             Inter — body, labels, captions

BACKGROUNDS (dark/light)
  bg-[#050505]          Root body (darkest)
  bg-[#0a0a0a]          Modal, content surface
  bg-[#0d0d0d]          Alternate section bg
  light:bg-white        Light mode equivalents
  light:bg-zinc-50

TEXT
  text-white            Primary
  text-white/70         Body
  text-white/60         Secondary body
  text-white/55         Labels, muted text
  text-white/50         Captions, disabled

BORDERS
  border-white/10       Default
  border-white/15       Buttons
  border-white/20       Nav
  border-white/25       Active row

RADIUS
  rounded-full          Pills, tags
  rounded-3xl           Cards (24px)
  rounded-2xl           List items (16px)
  rounded-xl            Chips, buttons (12px)

SPACING
  space-y-36            Between major sections (144px)
  p-5                   Standard card padding
  p-7                   Large callout padding
  px-8 md:px-16         Content horizontal padding

MOTION
  duration-300          Color transitions
  duration-500          Accordion expand
  ease: [0.16,1,0.3,1]  Primary spring-ease

FOCUS
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:rounded
```
