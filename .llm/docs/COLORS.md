# Color System Reference

## Quick Lookup

| Token | Use For |
|-------|---------|
| `primary` | Main actions, buttons, links, focus states |
| `secondary` | Supporting UI, toggles, subtle buttons |
| `accent` | Success states, positive feedback, healing |
| `destructive` | Errors, delete actions, warnings |
| `muted` | Disabled states, placeholders, subtle text |
| `card` | Containers, panels, modals |
| `popover` | Dropdowns, tooltips, floating UI |
| `border` | All borders, dividers |
| `input` | Form field borders |
| `ring` | Focus rings, outlines |

## Pain Severity (0-10 scale)

| Level | Token | Range | Usage |
|-------|-------|-------|-------|
| None | `pain-none` | 0 | No pain indicator |
| Mild | `pain-mild` | 1-3 | Low pain pins |
| Moderate | `pain-moderate` | 4-6 | Medium pain pins |
| Severe | `pain-severe` | 7-8 | High pain pins |
| Extreme | `pain-extreme` | 9-10 | Critical pain pins |

## Pin States

| State | Token | When |
|-------|-------|------|
| Default | `pin-active` | Placed pin, idle |
| Hover | `pin-hover` | Cursor over pin |
| Selected | `pin-selected` | User clicked/editing |

## Patterns

```tsx
// Backgrounds
bg-background        // Page background
bg-card              // Container background
bg-muted             // Subtle sections
bg-primary           // Emphasized elements
bg-secondary         // De-emphasized elements

// Text
text-foreground      // Primary text
text-muted-foreground // Secondary/helper text
text-primary         // Links, emphasis
text-destructive     // Error messages
text-card-foreground // Text inside cards

// Borders
border-border        // Default borders
border-input         // Form inputs
border-destructive   // Error state inputs

// Interactive
hover:bg-primary/90  // Button hover
focus:ring-ring      // Focus state
disabled:bg-muted    // Disabled state

// Pain pins
bg-pain-none         // Green pin
bg-pain-mild         // Light green pin
bg-pain-moderate     // Yellow pin
bg-pain-severe       // Orange pin
bg-pain-extreme      // Red pin
```

## Component Mapping

```
Button/Primary    → bg-primary text-primary-foreground
Button/Secondary  → bg-secondary text-secondary-foreground
Button/Danger     → bg-destructive text-destructive-foreground
Button/Ghost      → hover:bg-muted text-foreground

Input/Default     → bg-background border-input
Input/Error       → border-destructive text-destructive

Card              → bg-card text-card-foreground border-border
Modal             → bg-popover text-popover-foreground

Badge/Success     → bg-accent text-accent-foreground
Badge/Error       → bg-destructive text-destructive-foreground
Badge/Neutral     → bg-muted text-muted-foreground

Pain Pin          → bg-pain-{level} + ring-2 ring-white
Selected Pin      → bg-pin-selected ring-2 ring-ring
```

## Rules

1. **Never hardcode colors** — Always use tokens
2. **Pain colors only for pain** — Don't use pain-* for other UI
3. **Foreground pairing** — Always pair `bg-X` with `text-X-foreground`
4. **Dark mode automatic** — Tokens handle light/dark
5. **Opacity for hover** — Use `bg-primary/90` not separate color
6. **Ring for focus** — Always `focus:ring-ring focus:ring-2`

## Do / Don't

```tsx
// ✓ DO
<button className="bg-primary text-primary-foreground">
<div className="bg-card border border-border">
<span className="text-muted-foreground">
<div className="bg-pain-severe rounded-full">

// ✗ DON'T
<button className="bg-blue-500 text-white">
<div className="bg-white border border-gray-200">
<span className="text-gray-500">
<div className="bg-orange-500 rounded-full">
```

## Semantic Mapping

```
Trust/Medical    → primary
Healing/Success  → accent
Warning/Pain     → pain-* scale
Error/Delete     → destructive
Neutral/Subtle   → muted, secondary
Content/Read     → foreground, card-foreground
```