# Styles

This directory contains global styles for the Magna Coders frontend application.

## Colour Palette
- **Magna Red:** `#E70008` (CSS var: `--color-magna-red`)
- **Magna Orange:** `#FF9940` (CSS var: `--color-magna-orange`)
- **Magna Cream:** `#F9E4AD` (CSS var: `--color-magna-cream`)
- **Magna Black:** `#000000` (CSS var: `--color-magna-black`)

Additional semantic variables (OKLCH-based) are defined for `--primary`, `--secondary`, `--foreground`, `--background`, charts, sidebar, and other UI tokens.

## Main Styles & Utilities
- **Glassmorphism utilities:** `.glass`, `.glass-dark`, `.glass-morphism`, `.glass-morphism-dark` — translucent backgrounds with `backdrop-filter: blur()` and light borders.
- **Brand utilities:** `.magna-bg`, `.magna-text-primary`, `.magna-text-accent`, `.magna-text-secondary`, `.magna-border`, `.magna-bg-primary`, `.magna-bg-secondary` for quick brand-colored backgrounds, text and borders.
- **Input styles:** `.magna-input` with focused/hover states and placeholder tone tuned to the brand palette.
- **Gradient text utilities:** `.gradient-text`, `.gradient-text-purple`, `.magna-gradient-text` for decorative headings and accents.
- **Shadows & glow:** `--shadow-glass`, `--shadow-glow`, `--shadow-magna-glow`, etc., for elevated cards and accents.
- **Backdrop blur sizes:** variables like `--backdrop-blur-sm`, `--backdrop-blur-md`, up to `--backdrop-blur-3xl`.
- **Radius tokens:** `--radius-4xl`, `--radius-5xl` and inline radius helpers for small → xl sizes.
- **Animation tokens:** `--animate-pulse-slow`, `--animate-bounce-slow`, `--animate-spin-slow` preconfigured for slow motion effects.

## Layout & Typography
- Global base font-family uses system sans-serif stack for consistent cross-platform rendering.
- Body color and background derive from CSS variables (`--foreground-rgb`, `--background-start-rgb`) and support a dark theme via the `.dark` class and `prefers-color-scheme` media queries.
- Utility-first approach (Tailwind) is used alongside custom CSS utilities defined in `globals.css`.

## Tooling
- Tailwind CSS is integrated (see `postcss.config.js`) and custom tokens are defined in `globals.css`.

## Files of interest
- Global styles: frontend/src/app/globals.css
- PostCSS config: frontend/postcss.config.js

If you want, I can extract these tokens into a dedicated design tokens file or add a short reference JSON for consumption by components.
