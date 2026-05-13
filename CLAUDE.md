# sv-bootstrap-modal

Bootstrap 5 modal component for Svelte 5, published to npm as `sv-bootstrap-modal`.

## Commands

```bash
npm run build        # compile to dist/ via Rollup
npm run dev          # watch mode
npm test             # run tests (Vitest + jsdom)
npm run test:watch   # watch mode tests
npm run demo         # start demo dev server (Vite, port 5173)
npm run demo:build   # build demo to demo/dist/
```

## Architecture

- **`src/Modal.svelte`** — single component, Svelte 5 runes API (`$props`, `$state`, `$derived`, `$effect`)
- **`src/main.js`** — package entry point, re-exports Modal as default and named
- **`src/index.d.ts`** — hand-written TypeScript types for the public API
- **`rollup.config.js`** — builds to `dist/index.mjs` (ESM) and `dist/index.cjs` (CJS); Svelte is external
- **`demo/`** — standalone Vite app for the GitHub Pages demo; not part of the published package
- **`tests/`** — Vitest tests using `@testing-library/svelte` + jsdom

## Publishing

Releases are triggered by pushing a `v*` tag. The GitHub Actions workflow (`.github/workflows/publish.yml`) uses pnpm for install/build, then `npm publish --provenance` for the actual publish step — npm handles the OIDC token exchange natively while pnpm does not. No `NPM_TOKEN` secret is needed; the npmjs.com package must have a trusted publisher configured pointing at this repo and workflow file.

```bash
git tag v2.x.x && git push origin v2.x.x
```

## Key constraints

- Svelte and Bootstrap are peer dependencies — never bundle them
- `rollup.config.js` marks all `svelte/*` imports as external
- The component uses Svelte 5 runes (`runes: true` in compiler options); do not revert to legacy API
- Node >= 24 required (enforced in `package.json` engines field)
