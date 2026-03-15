# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ArchStop — a multivendor ecommerce marketplace for architectural designs (house plans, 3D models, CAD files, Revit templates). Built with Next.js 16 App Router, React 19, and vanilla CSS styled as an **iOS/iPadOS native app** for demo purposes. All data is mock/static (no backend API). Deployed as a static export to GitHub Pages.

## Commands

- **Dev server:** `npm run dev` (localhost:3000)
- **Build:** `npm run build` (static export to `out/`)
- **Deploy:** `npm run deploy` (gh-pages)

No test framework is configured.

## Architecture

**Routing:** Next.js App Router with dynamic routes (`/design/[id]`, `/vendor/[id]`). All interactive pages use `'use client'` directive; root layout is a server component.

**State Management:** Three React Context providers (no external state library):
- `ThemeContext` (`useTheme()`) — dark/light toggle, persisted to localStorage, defaults to **light** (iOS demo)
- `CartContext` (`useCart()`) — shopping cart items, totals
- `AuthContext` (`useAuth()`) — demo auth with buyer/vendor roles; `/auth` shows profile page when authenticated

All providers are composed in `app/layout.js`.

**Data Layer:** `lib/data.js` exports mock data arrays (designs, vendors, categories, reviews) and helper functions (`getDesignById`, `searchDesigns`, etc.). No API routes exist.

**iOS Native App Design:**
- Bottom tab bar (`components/TabBar.js`) on mobile (hidden on desktop where `Navbar.js` is shown)
- iOS-style inline navigation bars per page with back chevrons (sticky, blur backdrop)
- iOS grouped inset list pattern (`.ios-group`, `.ios-row`) for settings/list views
- iOS segmented controls (`.ios-segmented`, `.ios-segment`) instead of tabs
- Category pills with horizontal scroll on browse page
- Horizontal scroll carousels for featured designs on mobile
- Safe area handling via `env(safe-area-inset-*)` for notch/home indicator
- Touch-first: `:active` press states (scale down), no hover-dependent interactions on mobile
- `Footer.js` hidden on mobile (apps don't have footers)
- Apple Web App meta tags for PWA-like Add to Home Screen

**Styling:** Vanilla CSS with iOS design tokens in `app/globals.css`. Dual-theme support via `[data-theme="dark|light"]` on `<html>`. Uses CSS Modules for dashboard, inline styled-jsx for most page components, plus global utility classes (`.btn`, `.badge`, `.ios-group`, `.grid-2/3/4`). No Tailwind.

**Fonts:** SF Pro system font stack (`-apple-system, 'SF Pro Display', 'SF Pro Text'`).

**Icons:** `lucide-react` exclusively.

## Conventions

- Import alias: `@/*` maps to project root (configured in `jsconfig.json`)
- Component files: PascalCase (`Navbar.js`), CSS Modules: camelCase properties
- CSS classes: kebab-case in globals (`.ios-row`), camelCase in modules
- Dynamic route params accessed via `use(params)` hook (React 19 pattern)
- Client-side search/filtering uses `useSearchParams()` and `useMemo`
- Each page provides its own iOS nav bar on mobile (sticky positioned with safe area padding)
- `viewport` is exported separately from `metadata` in layout.js (Next.js 16 requirement)
