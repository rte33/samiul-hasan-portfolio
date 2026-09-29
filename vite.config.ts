// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : "";
const isUserPage = repoName.toLowerCase().endsWith(".github.io");
const basePath = process.env.VITE_BASE_PATH || (process.env.GITHUB_PAGES === "true" && !isUserPage ? `/${repoName}/` : "/");

export default defineConfig({
  nitro: false,
  vite: {
    base: basePath,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    router: {
      basepath: basePath,
    },
    prerender: {
      enabled: true,
      crawlLinks: true,
      filter: (page) => !page.path.endsWith(".pdf"),
    },
    pages: [
      { path: "/" },
      { path: "/updates" },
      { path: "/projects/solar-thermal-dehydrator" },
      { path: "/projects/self-balancing-robot" },
      { path: "/projects/dual-stage-buck-converter" },
    ],
  },
});
