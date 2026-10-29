# Knodia website

Website of Knodia, a federated framework for trusted cross-border interaction and data exchange across Europe. Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Project structure

```text
/
├── public/          # Static assets served as-is (brand logos, documents, favicons)
└── src/
    ├── assets/      # Images and icons processed at build time
    ├── components/  # Astro components; page-specific sections live in components/sections/<page>/
    ├── layouts/     # Page layouts
    ├── pages/       # One route per file or folder
    └── styles/      # Global CSS and Tailwind design tokens
```

See [AGENT.md](AGENT.md) for the conventions followed when building components and pages.

## Commands

Requires Node.js 22.12 or later and pnpm. All commands are run from the root of the project:

| Command        | Action                                         |
| :------------- | :--------------------------------------------- |
| `pnpm install` | Install dependencies                           |
| `pnpm dev`     | Start the local dev server at `localhost:4321` |
| `pnpm build`   | Build the production site to `./dist/`         |
| `pnpm preview` | Preview the build locally                      |

## Licensing

This project is licensed under the terms of the **European Union Public Licence version 1.2 (EUPL-1.2)**.
The full text of the license can be found in the [LICENSE](LICENSE) file.
Please see the [AUTHORS](AUTHORS) file for the copyright notice.
The whitepaper and executive summary in `public/docs/` are licensed under CC BY 4.0, like their source in [knodia-docs-input](https://github.com/pagopa/knodia-docs-input). Logos and other trademarks are not covered by these licenses.
