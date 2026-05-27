# Knodia Website — Agent Guidelines

You are building UI for an **Astro + Tailwind CSS v4** site. The site is **static-first**: prefer plain `.astro` components, native HTML, and CSS over any client-side framework or runtime library. Follow the rules below for every component or page you produce.

---

## 1. Stack & Conventions

- **Framework:** Astro pages/layouts in `src/pages/` and `src/layouts/`. All markup lives in `.astro` files and is rendered to static HTML.
- **Styling:** Tailwind CSS v4 configured via `src/styles/global.css`. There is **no `tailwind.config.js`** — design tokens live in the `@theme` block of `global.css` as CSS custom properties.
- **Interactivity:** Default to zero JavaScript. When behavior is unavoidable, write a minimal vanilla `<script>` block scoped to the `.astro` component (or a small Astro island only as a last resort). Do **not** introduce a UI framework, runtime, or component library to handle interaction.
- **Variants:** Use [`tailwind-variants`](https://www.tailwind-variants.org/) (`tv()`) for components with more than one visual state. Do not hand-roll conditional class strings. `tv()` may be imported into `.astro` frontmatter — it produces a plain class string and does not ship runtime JS to the client.
- **No new dependencies:** Do not add packages to solve a problem that can be done with native HTML, CSS, Tailwind, or a few lines of inline script. If a dependency seems necessary, justify it explicitly first.

---

## 2. Figma MCP Workflow (mandatory order)

When a Figma node/URL is provided:

1. **Read context first.** Call `get_design_context` for the node to retrieve reference code, screenshot, and Code Connect hints.
2. **Extract variables.** Call `get_variable_defs` to get the exact design tokens (colors, spacing, radii, typography). These map to CSS variables in `global.css`.
3. **Check Code Connect.** If a node maps to an existing codebase component, use that component — do not regenerate it.
4. **Reuse before you build.** Scan `src/components/` and `src/assets/` for existing matches (Button, backgrounds, favicons, etc.) before creating anything new.
5. **Verify visually.** For complex layouts, request `get_screenshot` and compare against the implementation.

The Figma response is a **reference**, not final code. Always adapt it to this project's stack (Astro + Tailwind v4 + `tailwind-variants`) and convert any framework-specific output (React, Vue, etc.) into static `.astro` markup.

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

- Build it as an `.astro` component in `src/components/`.
- Keep single-file components flat in `src/components/`.
- **Create a component folder only when the component actually needs multiple related files** (for example variants, supporting data/types, subcomponents, tests, or component-scoped assets). In those cases, group them under one PascalCase folder, e.g. `src/components/Icon/` or `src/components/Button/`.
- Do not scatter a multi-file component's siblings across `src/components/` at the root. If two or more files exist only to support one component, they belong inside that component's folder.
- In a multi-file component folder, keep the entry component, co-located variants, supporting data/types, subcomponents, and component-scoped assets together. Import the component via the folder using an `index.ts` re-export, or via the explicit file path.
- Co-locate variants via `tv()` in the same file or a sibling `*.variants.ts` within the component folder.
- Type the component's `Props` interface in the frontmatter; mirror the `tailwind-variants` `VariantProps` when applicable.
- Keep it server-rendered. Only add a `<script>` block if the design strictly requires runtime behavior.

---

## 5. Accessibility (WCAG 2.1 AA minimum)

- Use semantic HTML first (`<button>`, `<a>`, `<nav>`, `<main>`, headings in order). Native elements provide focus and keyboard handling for free — do not replace them with `<div>`/`<span>` and re-implement behavior.
- Every interactive element must be keyboard reachable with a visible focus ring. Style focus via `:focus-visible` in CSS/Tailwind utilities — no JS focus tracking.
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
4. Implemented as a static `.astro` component; no client JS unless strictly required by the design.
5. Variants are expressed via `tailwind-variants`.
6. Keyboard accessible via native HTML semantics, screen-reader labeled, contrast-checked.
7. Responsive across the breakpoints above.
8. No TypeScript or lint errors.

---

## 8. Anti-patterns (do not do)

- ❌ Inline styles or hex colors in Astro markup.
- ❌ `class` strings built with template literals or `clsx` for variant logic (use `tv()`).
- ❌ Reaching for a UI framework or component library (React, Vue, Svelte, Headless UI, Radix, etc.) to implement behavior.
- ❌ Adding client-side JavaScript when the design can be expressed with HTML and CSS alone (e.g. using `<details>`/`<summary>`, `:focus-within`, `:has()`, `peer`, `group`).
- ❌ Duplicating an existing component to add one variant.
- ❌ Adding new dependencies without first ruling out a static HTML/CSS solution.
