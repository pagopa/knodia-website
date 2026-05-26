# Knodia Website — Agent Guidelines

You are building UI for an **Astro + Tailwind CSS v4** site. Interactive widgets are React islands hydrated from `.astro` pages. Follow the rules below for every component or page you produce.

---

## 1. Stack & Conventions

- **Framework:** Astro pages/layouts in `src/pages/` and `src/layouts/`. Static markup lives in `.astro` files.
- **Styling:** Tailwind CSS v4 configured via `src/styles/global.css`. There is **no `tailwind.config.js`** — design tokens live in the `@theme` block of `global.css` as CSS custom properties.
- **Interactivity:** React components (`.tsx`) hydrated as Astro islands with `client:*` directives.
- **Variants:** Use [`tailwind-variants`](https://www.tailwind-variants.org/) (`tv()`) for every component with more than one visual state. Do not hand-roll conditional class strings.
- **Accessible primitives:** Use [`react-aria-components`](https://react-spectrum.adobe.com/react-aria/) for any interactive element (buttons, links acting as buttons, inputs, dialogs, menus, tabs, etc.). Do **not** re-implement focus management, keyboard handling, or ARIA wiring by hand.
- **Astro ↔ React boundary:** Props crossing the boundary must be serializable. Pass strings/ids/data — never functions. Handle events inside the React island.

---

## 2. Figma MCP Workflow (mandatory order)

When a Figma node/URL is provided:

1. **Read context first.** Call `get_design_context` for the node to retrieve reference code, screenshot, and Code Connect hints.
2. **Extract variables.** Call `get_variable_defs` to get the exact design tokens (colors, spacing, radii, typography). These map to CSS variables in `global.css`.
3. **Check Code Connect.** If a node maps to an existing codebase component, use that component — do not regenerate it.
4. **Reuse before you build.** Scan `src/components/` and `src/assets/` for existing matches (Button, backgrounds, favicons, etc.) before creating anything new.
5. **Verify visually.** For complex layouts, request `get_screenshot` and compare against the implementation.

The Figma response is a **reference**, not final code. Always adapt to this project's stack (Astro + Tailwind v4 + react-aria + tailwind-variants).

> Note: Figma `get_design_context` may return SVG assets even for nodes labeled as raster sizes (e.g. favicons). When you need a true PNG, use `get_screenshot`.

---

## 3. Design Tokens (no hardcoded values)

- Colors, spacing, radii, font sizes/weights, line-heights, shadows, and breakpoints **must** come from Tailwind utilities backed by tokens in `global.css` `@theme`.
- If a Figma variable is not yet defined in `global.css`, **add it to `@theme`** with the exact Figma value and a semantic name (e.g. `--color-primary-violet`, `--spacing-lg`), then use the generated utility (`bg-primary-violet`, `p-lg`).
- Forbidden in component files: literal hex colors, raw px/rem values outside the token scale, magic arbitrary values (`w-[473px]`). Arbitrary values are allowed **only** when they reference a CSS variable, e.g. `w-[var(--card-width)]`.
- One source of truth: never duplicate a token value across files.

---

## 4. Component Reuse Checklist

Before creating a new component, confirm:

- [ ] No existing component in `src/components/` covers this use case (check `Button.astro` and siblings).
- [ ] No existing asset in `src/assets/` (`backgrounds/`, `favicons/`) matches what Figma is asking for.
- [ ] If reuse needs a new variant, **extend** the existing component's `tailwind-variants` config rather than forking it.

If you do create a new component:

- Place reusable UI in `src/components/`.
- Co-locate variants via `tv()` in the same file (or a sibling `*.variants.ts`).
- Export a typed `Props` interface that mirrors the `tailwind-variants` `VariantProps`.

---

## 5. Accessibility (WCAG 2.1 AA minimum)

- Use semantic HTML first (`<button>`, `<nav>`, `<main>`, headings in order).
- Every interactive element must be keyboard reachable with a visible focus ring (rely on react-aria's `data-focus-visible` styling hooks).
- Color contrast: text ≥ 4.5:1, large text / UI components ≥ 3:1. Verify against actual token values.
- Provide `aria-label` or visible text for icon-only controls. Decorative SVGs get `aria-hidden="true"`.
- Form controls require associated `<label>`s. Error messages use `aria-describedby` / `aria-invalid`.
- Respect `prefers-reduced-motion` for any animation.
- Images: meaningful `alt`; decorative images get `alt=""`.

---

## 6. Responsive Behavior

- Mobile-first. Default styles target the smallest breakpoint; layer up with Tailwind's `sm:`, `md:`, `lg:`, `xl:`, `2xl:` prefixes.
- Breakpoints come from `@theme` tokens — do not introduce custom media queries in component CSS.
- When Figma provides a single desktop frame, infer mobile behavior conservatively: single-column stack, fluid widths, retained spacing scale.
- Sanity-check layouts at 320px, 768px, 1024px, and 1440px.

---

## 7. Definition of Done

A component/page is done only when **all** of the following hold:

1. Matches the Figma frame at the target breakpoint (spacing, typography, color, radius, iconography).
2. Uses only design tokens — no hardcoded colors, sizes, or spacing.
3. Reuses existing components/assets where applicable.
4. Interactive parts use `react-aria-components`.
5. Variants are expressed via `tailwind-variants`.
6. Keyboard accessible, screen-reader labeled, contrast-checked.
7. Responsive across the breakpoints above.
8. No TypeScript or lint errors.

---

## 8. Anti-patterns (do not do)

- ❌ Inline styles or hex colors in JSX/Astro markup.
- ❌ `className` strings built with template literals or `clsx` for variant logic (use `tv()`).
- ❌ Custom `useState` / `useEffect` for focus, hover, or open/close state that react-aria already handles.
- ❌ Duplicating an existing component to add one variant.
- ❌ Passing functions as props from `.astro` into a React island.
- ❌ Adding new dependencies without confirming they aren't already covered by react-aria / tailwind-variants.
