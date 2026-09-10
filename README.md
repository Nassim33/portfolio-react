# Portfolio – React

A modern, single-page portfolio built with **React 19** and **TypeScript**. It loads your GitHub profile and repositories automatically from the [GitHub REST API](https://docs.github.com/en/rest) and renders them with smooth view transitions and a full light/dark theme.

Deployed on GitHub Pages: [https://nassim33.github.io/portfolio-react/](https://nassim33.github.io/portfolio-react/)

---

## Technologies

| Layer | Choice |
| --- | --- |
| Framework | [React](https://react.dev/) 19.3 |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict) |
| Build tool | [Vite](https://vitejs.dev/) 5 |
| UI library | [Ant Design](https://ant.design/) 6 (tokens-based theming) |
| Icons | [Iconify](https://iconify.design/) (`@iconify/react`) + Ant Design icons |
| Data fetching | [TanStack Query](https://tanstack.com/query) 5 |
| State management | [Zustand](https://github.com/pmndrs/zustand) 5 |
| Validation | [Zod](https://zod.dev/) |
| Routing | [React Router](https://reactrouter.com/) 6 (`HashRouter`) |
| Scrolling | [react-scroll](https://www.npmjs.com/package/react-scroll) |
| Animations | React 19 [`<ViewTransition>`](https://react.dev/reference/react/ViewTransition) |
| Caching | Workbox (service worker) |
| Testing | Jest + ts-jest |
| Linting / types | ESLint (typescript-eslint, react-hooks) + `tsc` |

Package manager: [pnpm](https://pnpm.io/).

---

## Getting started

Requirements: **Node.js ≥ 20**.

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server (default http://localhost:3000)
pnpm start

# 3. Production build (type-checks first) -> dist/
pnpm build

# 4. Preview the production build locally
pnpm preview
```

> The dev server port is set in `vite.config.mjs` (`server.port = 3000`).

### Other useful commands

```bash
pnpm test        # run the Jest test suite
pnpm coverage    # run tests with coverage
pnpm lint        # ESLint on src/, zero warnings allowed
pnpm typecheck   # tsc --noEmit
```

---

## Customization

Almost everything is configured from a single file: **`src/data.tsx`**. Colors and typography live in **`src/theme.ts`**.

### Profile & content

| Setting | Location | Description |
| --- | --- | --- |
| GitHub username | `data.tsx` → `githubUsername` | Your username. Profile and repositories are fetched from it. |
| LinkedIn | `data.tsx` → `linkedinUrl` | Shown as a social link under the hero. |
| Hero tagline | `data.tsx` → `heroTagline` | Text under your name; line breaks by `\|` separators. |
| About paragraph | `data.tsx` → `moreInfo` | Extra paragraph in the About Me section. |
| Blog link icon | `data.tsx` → `Blog` | Icon rendered next to the social links. |
| Resume | `data.tsx` → `resume` | Set a URL to display the Résumé button in Skills. |
| Contact endpoint | `data.tsx` → `formspreeUrl` | [Formspree](https://formspree.io/) form endpoint used by the contact form. |

### Skills

`data.tsx` → `skillData`. Each entry is `{ id, skill, name }`, where `skill` is an Iconify icon (e.g. `mdi:language-typescript`). Find icons at [icon-sets.iconify.design](https://icon-sets.iconify.design).

### Featured projects

`data.tsx` → `filteredProjects` lists the repository names featured on the home page (sorted alphabetically). If empty, the first three repositories are used.

`data.tsx` → `projectCardImages` overrides the default GitHub image (located in `public/GH.png`) for matching repositories:

```ts
export const projectCardImages = [
  { name: "my-repo", image: logo },
];
```

### Images & branding

| Asset | Location |
| --- | --- |
| Hero background (light / dark) | `src/ui/assets/hero-light.jpg`, `src/ui/assets/hero-dark.jpg` |
| Logo SVG | `src/ui/assets/logo.svg` |
| Navbar logo | `src/ui/components/defaultNavLogo.svg` |
| PWA / static assets | `public/` (favicon.ico, logo192.png, manifest.json, GH.png…) |

### Theme

`src/theme.ts` defines the Ant Design light and dark token sets:

- Brand color: `colorPrimary` — teal `#0D9488` (light) / `#2DD4BF` (dark)
- Backgrounds: `colorBgContainer`, `colorBgLayout`
- Text: `colorText`, `colorTextSecondary`
- Borders: `colorBorder`, `colorBorderSecondary`
- Font: Space Grotesk (loaded in `index.html`, declared in `sharedTokens.fontFamily`)

The theme follows the OS color scheme by default, with a manual toggle that persists in `localStorage`.

---

## How it works

- `src/hooks/useGitHubData.ts` uses TanStack Query to fetch `GET /users/:username` and `GET /users/:username/repos` (`per_page=100`, see `src/lib/github.ts`). Responses are validated with Zod (`src/schemas.ts`).
- `src/App.tsx` hosts the router, theme provider and a `<ViewTransition>` wrapper — theme changes and route navigations cross-fade through the browser View Transitions API.
- Routes: `/` (Home) and `/All-Projects` (full repository list with search, filtering and pagination).

## Deploy to GitHub Pages

```bash
pnpm build
npx gh-pages -d dist
```

`base: "./"` is already set in `vite.config.mjs` and `homepage` in `package.json` so the build works from a repository sub-path.

---

## License

[MIT](License.md)