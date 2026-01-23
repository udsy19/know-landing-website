# [know] Design System

A comprehensive guide to the design language and styling patterns used across the Know website. Use this to maintain consistency when building new pages or components.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Animations](#animations)
6. [Icons](#icons)
7. [Code Examples](#code-examples)

---

## Color Palette

### Semantic Colors (use these)

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| `background` | Page background | `bg-background` |
| `foreground` | Primary text | `text-foreground` |
| `primary` | Buttons, accents, links | `bg-primary`, `text-primary` |
| `primary-foreground` | Text on primary bg | `text-primary-foreground` |
| `muted` | Subtle backgrounds | `bg-muted`, `bg-muted/30` |
| `muted-foreground` | Secondary text | `text-muted-foreground` |
| `border` | Borders, dividers | `border-border`, `border-border/40` |

### Accent Colors

| Color | Usage | Example |
|-------|-------|---------|
| `emerald-400` | Success states, live indicators | `bg-emerald-500`, `text-emerald-400` |
| `emerald-400/10` | Success backgrounds | `bg-emerald-400/10` |
| `red-400` | Error states | `text-red-400`, `bg-red-400/10` |
| `blue-400` | LinkedIn, links | `text-blue-400` |

### Opacity Patterns

```
border-border/40    - Subtle borders
border-border/50    - Medium borders
bg-muted/20         - Very subtle background
bg-muted/30         - Subtle background
bg-muted/50         - Medium background
bg-primary/10       - Accent tint
bg-primary/20       - Stronger accent tint
```

---

## Typography

### Font Stack

- **Sans-serif**: System default (via Tailwind)
- **Monospace**: `font-mono` for [know] logo and technical text

### Hierarchy

| Element | Classes | Example |
|---------|---------|---------|
| **Hero Title** | `text-4xl md:text-6xl font-light leading-[1.1] tracking-tighter` | "Know anyone, before you meet them." |
| **Section Title** | `text-3xl md:text-5xl font-light` | "Join the waitlist" |
| **Section Label** | `text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground` | "NETWORK SEARCH" |
| **Card Title** | `text-lg font-light` or `font-medium` | "Sarah Chen" |
| **Body Text** | `text-muted-foreground` | Descriptions, paragraphs |
| **Small Text** | `text-sm text-muted-foreground` | Captions, metadata |
| **Tiny Text** | `text-xs text-muted-foreground` | Tags, badges |

### Logo

```jsx
<span className="text-lg font-mono font-medium">[know]</span>
```

---

## Spacing & Layout

### Container

```jsx
<div className="container mx-auto px-6 max-w-4xl">
  {/* Content */}
</div>
```

**Max widths by context:**
- `max-w-2xl` - Forms, narrow content
- `max-w-3xl` - Use cases, text-heavy sections
- `max-w-4xl` - General content, demos
- `max-w-5xl` - Wide content, data grids
- `max-w-6xl` - Full-width sections

### Section Spacing

```jsx
// Standard section
<section className="container mx-auto px-6 py-24 max-w-4xl border-t border-border/40">
```

- `py-24` - Standard section padding
- `py-16` - Smaller sections
- `mb-12` - Space after section headers
- `gap-6` - Card/grid spacing
- `gap-4` - Tight element spacing
- `gap-2` - Inline element spacing

### Responsive Breakpoints

```
sm: 640px   - Side-by-side buttons, 2-col forms
md: 768px   - 2-col layouts, larger text
lg: 1024px  - 3-col layouts, side panels
```

---

## Components

### Primary Button (CTA)

```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
>
  Join Waitlist
</motion.button>
```

**Variants:**
- Large CTA: `px-10 py-4 text-lg`
- Standard: `px-8 py-3`
- Small: `px-6 py-2.5 text-sm`

### Secondary Button (Outline)

```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition-colors"
>
  Book a Call
</motion.button>
```

### Text Input

```jsx
<input
  type="text"
  className="w-full px-5 py-4 text-base bg-background border border-border rounded-full outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
  placeholder="Your name"
/>
```

**Variants:**
- Standard: `rounded-full` (pill shape)
- Textarea: `rounded-2xl resize-none`

### Select Buttons (Multi-choice)

```jsx
<button
  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
    selected
      ? "border-primary bg-primary/10 text-primary"
      : "border-border hover:border-border/80 text-muted-foreground hover:text-foreground"
  }`}
>
  Option
</button>
```

### Card

```jsx
<div className="bg-muted/20 border border-border/40 rounded-lg p-5">
  {/* Content */}
</div>
```

**Variants:**
- Subtle: `bg-muted/20 border-border/40`
- Solid: `bg-background border-border/50`
- Interactive: Add `hover:border-border hover:bg-muted/30 transition-all`

### Badge / Tag

```jsx
<span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
  AI/ML
</span>
```

**Accent badge:**
```jsx
<span className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded">
  verified
</span>
```

### Progress Indicator (Stepper)

```jsx
<div className="flex items-center justify-center gap-2">
  {steps.map((_, i) => (
    <div
      key={i}
      className={`h-1.5 rounded-full transition-all duration-300 ${
        i <= currentStep ? "w-8 bg-primary" : "w-3 bg-border/50"
      }`}
    />
  ))}
</div>
```

### Success State

```jsx
<div className="text-center">
  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  </div>
  <h2 className="text-2xl md:text-3xl font-light mb-3">Success!</h2>
  <p className="text-muted-foreground">Description text here.</p>
</div>
```

### Error State

```jsx
<div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
  Error message here
</div>
```

### Live Indicator

```jsx
<div className="flex items-center gap-2">
  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
  <span className="text-sm text-muted-foreground">
    <span className="text-foreground font-medium">2,847</span> people waiting
  </span>
</div>
```

---

## Animations

### Framer Motion Patterns

**Fade in on scroll:**
```jsx
<motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
  transition={{ duration: 0.5 }}
>
```

**Staggered children:**
```jsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 + i * 0.1 }}
  >
```

**Button hover/tap:**
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

**Step transitions (AnimatePresence):**
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={step}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
  >
```

**Spring animation (success icon):**
```jsx
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", damping: 15, delay: 0.1 }}
>
```

**Loading spinner:**
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
/>
```

### CSS Transitions

Standard transition classes:
- `transition-colors` - Color changes
- `transition-opacity` - Opacity changes
- `transition-all` - All properties
- `duration-300` - 300ms (default is 150ms)

---

## Icons

### Icon Style

- Use **stroke icons** (not filled) for most UI
- `strokeWidth={1.5}` for subtle icons
- `strokeWidth={2}` for bolder icons
- Size: `w-4 h-4` (small), `w-5 h-5` (medium), `w-8 h-8` (large)

### Common Icons (inline SVG)

**Arrow left (back):**
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
</svg>
```

**Arrow right (next):**
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
```

**Check:**
```jsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
</svg>
```

**Email:**
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
</svg>
```

**Calendar:**
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>
```

**Search:**
```jsx
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
```

**LinkedIn (filled):**
```jsx
<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>
```

---

## Code Examples

### Complete Page Template

```jsx
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-5 max-w-4xl flex items-center justify-between">
          <Link to="/" className="text-lg font-mono font-medium hover:opacity-70 transition-opacity">
            [know]
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl md:text-4xl font-light mb-4">Page Title</h1>
          <p className="text-muted-foreground mb-8">Description text here.</p>

          {/* Content goes here */}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Know Technologies, Inc.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### Multi-Step Form Pattern

See `/src/pages/Contact.tsx` for a complete implementation of:
- Step-by-step wizard flow
- Progress indicators
- Animated transitions between steps
- Form validation
- Success/error states

### Landing Page Section Pattern

See `/src/pages/Landing.tsx` for:
- Hero section with animated text
- Feature sections with scroll animations
- Interactive demos
- Waitlist signup flow
- Trust badges

---

## Quick Reference

### Border Radius Scale
- `rounded-lg` - Cards, containers
- `rounded-xl` - Select buttons, larger cards
- `rounded-2xl` - Textareas, large inputs
- `rounded-full` - Buttons, pills, avatars

### Shadow Usage
- Shadows are minimal/avoided
- Use `border` instead of `shadow` for depth
- Exception: `shadow-2xl` on demo windows

### Z-Index
- Default content: `z-10`
- Overlays/modals: `z-50`
- Background effects: `z-0`

### Do's
- Use opacity variants (`/40`, `/50`) for subtle effects
- Animate with Framer Motion, not CSS animations
- Use semantic color tokens, not raw colors
- Keep transitions subtle (150-300ms)

### Don'ts
- Don't use heavy shadows
- Don't use bright saturated colors
- Don't skip hover/focus states
- Don't forget dark mode compatibility (colors auto-adapt)

---

## Files Reference

- **Colors & Base Styles**: `/src/index.css`
- **Landing Page**: `/src/pages/Landing.tsx`
- **Contact Form**: `/src/pages/Contact.tsx`
- **Privacy/Terms**: `/src/pages/Privacy.tsx`, `/src/pages/Terms.tsx`

---

*Last updated: January 2026*
