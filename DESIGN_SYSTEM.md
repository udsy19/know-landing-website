# [know] Design System

A comprehensive design specification for maintaining visual consistency across all Know products and marketing materials.

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Typography](#typography)
3. [Color System](#color-system)
4. [Spacing](#spacing)
5. [Border & Radius](#border--radius)
6. [Layout](#layout)
7. [Components](#components)
8. [Animation](#animation)
9. [Iconography](#iconography)
10. [Voice & Tone](#voice--tone)

---

## Brand Identity

### Logo

The [know] logo uses a monospace font wrapped in square brackets, representing structure and technical precision.

| Element | Specification |
|---------|---------------|
| Text | `[know]` (lowercase, with brackets) |
| Font | Monospace (system default) |
| Weight | Medium (500) |
| Size | 18px (1.125rem) on web |

### Brand Personality

- **Minimal**: Clean, uncluttered interfaces
- **Technical**: Monospace accents, structured layouts
- **Trustworthy**: Muted colors, professional tone
- **Modern**: Subtle animations, contemporary patterns

---

## Typography

### Font Stack

| Type | Font Family | Fallback |
|------|-------------|----------|
| **Sans-serif** | System UI | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| **Monospace** | System Mono | `ui-monospace, "SF Mono", Menlo, Monaco, monospace` |

*Note: We use system fonts for performance and native feel. No custom fonts are loaded.*

### Type Scale

| Name | Size (px) | Size (rem) | Line Height | Weight | Usage |
|------|-----------|------------|-------------|--------|-------|
| **Display XL** | 60px | 3.75rem | 1.1 | 300 (Light) | Hero headlines |
| **Display L** | 48px | 3rem | 1.1 | 300 (Light) | Section headlines |
| **Display M** | 36px | 2.25rem | 1.2 | 300 (Light) | Card headlines |
| **Heading L** | 30px | 1.875rem | 1.3 | 400 (Regular) | Subsection titles |
| **Heading M** | 24px | 1.5rem | 1.4 | 500 (Medium) | Card titles |
| **Heading S** | 20px | 1.25rem | 1.4 | 500 (Medium) | Small headings |
| **Body L** | 18px | 1.125rem | 1.6 | 400 (Regular) | Lead paragraphs |
| **Body M** | 16px | 1rem | 1.6 | 400 (Regular) | Default body text |
| **Body S** | 14px | 0.875rem | 1.5 | 400 (Regular) | Secondary text |
| **Caption** | 12px | 0.75rem | 1.4 | 400 (Regular) | Labels, metadata |
| **Overline** | 12px | 0.75rem | 1.4 | 400 (Regular) | Section labels |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Display text, large headlines |
| Regular | 400 | Body text, descriptions |
| Medium | 500 | Buttons, labels, emphasis |
| Semibold | 600 | Strong emphasis (rare) |

### Letter Spacing

| Context | Value | Usage |
|---------|-------|-------|
| Tight | -0.025em | Display headlines |
| Tighter | -0.05em | Hero text |
| Normal | 0 | Body text |
| Wide | 0.05em | Buttons |
| Wider | 0.2em | Overline/section labels (uppercase) |

### Text Styles Reference

**Hero Title**
- Size: 48-60px
- Weight: Light (300)
- Line height: 1.1
- Letter spacing: -0.05em
- Color: Foreground

**Section Label (Overline)**
- Size: 12px
- Weight: Regular (400)
- Line height: 1.4
- Letter spacing: 0.2em
- Transform: Uppercase
- Font: Monospace
- Color: Muted foreground

**Body Text**
- Size: 16px
- Weight: Regular (400)
- Line height: 1.6
- Color: Muted foreground

**Button Text**
- Size: 14-16px
- Weight: Medium (500)
- Letter spacing: 0.025em

---

## Color System

### Design Philosophy

We use a **neutral, monochromatic palette** with minimal accent colors. The design relies on contrast and typography rather than color for hierarchy.

### Light Mode

| Token | OKLCH | Hex (approx) | RGB | Usage |
|-------|-------|--------------|-----|-------|
| **Background** | `oklch(1 0 0)` | `#FFFFFF` | 255, 255, 255 | Page background |
| **Foreground** | `oklch(0.145 0 0)` | `#1A1A1A` | 26, 26, 26 | Primary text |
| **Primary** | `oklch(0.205 0 0)` | `#2B2B2B` | 43, 43, 43 | Buttons, links |
| **Primary Foreground** | `oklch(0.985 0 0)` | `#FAFAFA` | 250, 250, 250 | Text on primary |
| **Muted** | `oklch(0.97 0 0)` | `#F5F5F5` | 245, 245, 245 | Subtle backgrounds |
| **Muted Foreground** | `oklch(0.556 0 0)` | `#737373` | 115, 115, 115 | Secondary text |
| **Border** | `oklch(0.922 0 0)` | `#E5E5E5` | 229, 229, 229 | Dividers, borders |

### Dark Mode

| Token | OKLCH | Hex (approx) | RGB | Usage |
|-------|-------|--------------|-----|-------|
| **Background** | `oklch(0.145 0 0)` | `#1A1A1A` | 26, 26, 26 | Page background |
| **Foreground** | `oklch(0.985 0 0)` | `#FAFAFA` | 250, 250, 250 | Primary text |
| **Primary** | `oklch(0.922 0 0)` | `#E5E5E5` | 229, 229, 229 | Buttons, links |
| **Primary Foreground** | `oklch(0.205 0 0)` | `#2B2B2B` | 43, 43, 43 | Text on primary |
| **Muted** | `oklch(0.269 0 0)` | `#3D3D3D` | 61, 61, 61 | Subtle backgrounds |
| **Muted Foreground** | `oklch(0.708 0 0)` | `#A3A3A3` | 163, 163, 163 | Secondary text |
| **Border** | `oklch(1 0 0 / 10%)` | `#FFFFFF1A` | 255, 255, 255, 0.1 | Dividers, borders |

### Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Emerald 400** | `#34D399` | Success states, savings badges |
| **Emerald 500** | `#10B981` | Live indicators, positive actions |
| **Red 400** | `#F87171` | Error states |
| **Red 500** | `#EF4444` | Destructive actions |
| **Blue 400** | `#60A5FA` | Links (optional) |

### Opacity Scale

| Value | Usage |
|-------|-------|
| `/10` or `10%` | Very subtle backgrounds, dark mode borders |
| `/20` | Subtle backgrounds |
| `/30` | Light backgrounds |
| `/40` | Medium borders |
| `/50` | Default borders, dividers |
| `/60` | Stronger borders |

---

## Spacing

### Base Unit

The spacing system uses a **4px base unit**. All spacing values are multiples of 4.

### Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `0.5` | 0.125rem | 2px | Micro spacing |
| `1` | 0.25rem | 4px | Tight gaps |
| `2` | 0.5rem | 8px | Small gaps |
| `3` | 0.75rem | 12px | Component padding |
| `4` | 1rem | 16px | Default gap |
| `5` | 1.25rem | 20px | Medium padding |
| `6` | 1.5rem | 24px | Card padding |
| `8` | 2rem | 32px | Section gaps |
| `10` | 2.5rem | 40px | Large gaps |
| `12` | 3rem | 48px | Section margins |
| `16` | 4rem | 64px | Page sections |
| `24` | 6rem | 96px | Section padding |

### Common Patterns

| Context | Spacing |
|---------|---------|
| Button padding (horizontal) | 24-40px |
| Button padding (vertical) | 10-16px |
| Card padding | 24px |
| Input padding | 16-20px |
| Section padding (vertical) | 96px |
| Container horizontal padding | 24px |
| Gap between cards | 16px |
| Gap between form fields | 20px |

---

## Border & Radius

### Border Width

| Value | Usage |
|-------|-------|
| 1px | Default borders, dividers |
| 2px | Emphasized borders, focused states, featured cards |

### Border Radius

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `sm` | 0.375rem | 6px | Small elements, tags |
| `md` | 0.5rem | 8px | Inputs (non-pill) |
| `lg` | 0.625rem | 10px | Cards, containers |
| `xl` | 0.875rem | 14px | Large cards |
| `2xl` | 1rem | 16px | Featured cards, modals |
| `full` | 9999px | — | Buttons, pills, avatars |

### Common Patterns

| Element | Radius |
|---------|--------|
| Buttons | `full` (pill shape) |
| Input fields | `full` (pill) or `2xl` (textarea) |
| Cards | `2xl` (16px) |
| Tags/Badges | `sm` or `full` |
| Avatars | `full` |

---

## Layout

### Container Widths

| Name | Max Width | Usage |
|------|-----------|-------|
| Narrow | 512px (`max-w-lg`) | Forms, focused content |
| Default | 672px (`max-w-2xl`) | Text-heavy sections |
| Medium | 768px (`max-w-3xl`) | Use cases, features |
| Wide | 896px (`max-w-4xl`) | General content |
| Extra Wide | 1024px (`max-w-5xl`) | Pricing grids |
| Full | 1280px (`max-w-6xl`) | Hero sections |

### Grid System

- Use **CSS Grid** or **Flexbox**
- Common column layouts: 2-col, 3-col, 4-col
- Gap: 16px (small), 24px (medium), 32px (large)

### Responsive Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| `sm` | 640px | Side-by-side buttons |
| `md` | 768px | 2-column layouts |
| `lg` | 1024px | 3-4 column layouts |
| `xl` | 1280px | Wide layouts |

---

## Components

### Buttons

**Primary Button**
- Background: Primary color (dark)
- Text: Primary foreground (light)
- Padding: 12-16px vertical, 32-40px horizontal
- Border radius: Full (pill)
- Font weight: Medium (500)
- Hover: Opacity 90%

**Secondary Button (Outline)**
- Background: Transparent
- Border: 1px solid border color
- Text: Foreground
- Padding: Same as primary
- Hover: Muted background

**Text Link**
- Color: Foreground or muted-foreground
- Underline: On hover
- Transition: Color 150ms

### Form Inputs

**Text Input**
- Height: 48-56px
- Padding: 16-20px horizontal
- Background: Transparent
- Border: 1px solid border color
- Border radius: Full (pill)
- Focus: Border primary/50, ring 2px primary/20
- Placeholder: Muted foreground at 40% opacity

**Textarea**
- Same as text input
- Border radius: 2xl (16px)
- Resize: None
- Rows: 4-5

**Select Buttons (Multi-choice)**
- Display as grid of buttons
- Selected: Primary border, primary/10 background
- Unselected: Border color, muted foreground text

### Cards

**Standard Card**
- Background: Background or muted/20
- Border: 1px solid border/50
- Border radius: 2xl (16px)
- Padding: 24px

**Featured Card**
- Border: 2px solid primary
- Optional gradient background
- Scale: 1.05 (5% larger)
- Badge: "Most Popular" etc.

### Badges & Tags

**Standard Badge**
- Background: Muted
- Text: Muted foreground
- Padding: 4px 8px
- Font size: 12px
- Border radius: sm or full

**Accent Badge**
- Background: Emerald/10 or primary/10
- Text: Emerald or primary
- Same sizing as standard

---

## Animation

### Timing

| Duration | Usage |
|----------|-------|
| 150ms | Micro interactions (hover, focus) |
| 200ms | Small transitions |
| 300ms | Standard transitions |
| 400ms | Larger animations |
| 600ms | Page/section reveals |

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| Ease out | `cubic-bezier(0.4, 0, 0.2, 1)` | Most transitions |
| Spring | `type: "spring", stiffness: 300, damping: 20` | Bouncy interactions |
| Linear | `linear` | Continuous animations (loaders) |

### Common Patterns

**Fade in on scroll**
- Initial: opacity 0, y 20px
- Animate: opacity 1, y 0
- Duration: 500-600ms

**Button hover**
- Scale: 1.02
- Transition: 150ms

**Button tap**
- Scale: 0.98

**Price toggle animation**
- Vertical slide (up or down)
- Duration: 300ms
- Easing: Ease out

---

## Iconography

### Style

- **Type**: Stroke icons (not filled)
- **Stroke width**: 1.5 (subtle) or 2 (bold)
- **Line cap**: Round
- **Line join**: Round

### Sizes

| Name | Size | Usage |
|------|------|-------|
| XS | 12px | Inline with small text |
| S | 16px | Buttons, inline |
| M | 20px | Default |
| L | 24px | Prominent icons |
| XL | 32px | Feature icons |

### Common Icons

- Arrow left/right (navigation)
- Check (success, list items)
- X (close, error)
- Calendar (scheduling)
- Mail (email)
- Search (search function)
- LinkedIn logo (social)

---

## Voice & Tone

### Writing Style

- **Concise**: Short sentences, no fluff
- **Active voice**: "Know finds" not "Connections are found"
- **Present tense**: "Find anyone" not "You will find"
- **Direct**: Speak to "you"

### Headlines

- Keep under 8 words
- Lead with the benefit
- Use sentence case (not Title Case)

### Body Copy

- One idea per sentence
- 16-20 words per sentence max
- Break up with bullet points

### UI Text

- Buttons: Action verbs ("Get Started", "Join Waitlist")
- Labels: Nouns or noun phrases ("Email", "Your message")
- Placeholders: Examples, not instructions ("jane@company.com")

---

## File Reference

| File | Contains |
|------|----------|
| `/src/index.css` | CSS variables, custom classes |
| `/src/pages/Landing.tsx` | Main landing page |
| `/src/pages/Contact.tsx` | Contact form (multi-step) |
| `/src/pages/Privacy.tsx` | Privacy policy |
| `/src/pages/Terms.tsx` | Terms of service |

---

## Quick Reference Card

```
COLORS
Background:     #FFFFFF (light) / #1A1A1A (dark)
Text Primary:   #1A1A1A (light) / #FAFAFA (dark)
Text Secondary: #737373 (light) / #A3A3A3 (dark)
Border:         #E5E5E5 (light) / #FFFFFF1A (dark)
Accent:         #10B981 (emerald-500)

TYPOGRAPHY
Display:   48-60px, Light (300), -0.05em tracking
Heading:   24-30px, Regular/Medium
Body:      16px, Regular (400), 1.6 line-height
Caption:   12px, Regular, uppercase for labels

SPACING
Section padding: 96px vertical
Card padding:    24px
Container:       max-w-4xl with 24px horizontal padding
Gap:             16px between cards

RADIUS
Buttons:  full (pill)
Inputs:   full (pill)
Cards:    16px (2xl)
Badges:   6px (sm) or full

ANIMATION
Duration: 150-300ms
Easing:   cubic-bezier(0.4, 0, 0.2, 1)
```

---

*Last updated: January 2026*
