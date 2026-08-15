import { useEffect, useState } from "react";

/**
 * A deliberately tiny hash router — the site has two views, so react-router
 * (plus the GitHub Pages 404.html rewrite that real paths need under a project
 * sub-path) would cost more than it's worth.
 *
 * The convention that keeps this compatible with the existing in-page anchors:
 *
 *   #/projects   -> a route      (leading slash)
 *   #about       -> an anchor    (no slash, browser handles it as before)
 *
 * So `#projects` (the featured section on the home page) and `#/projects` (the
 * full archive) never collide. Anything that isn't a known route falls back to
 * home, so a stale or hand-typed hash can't render a blank page.
 */
export type AppRoute = "home" | "projects";

export const routes = {
  home: "#/",
  projects: "#/projects",
} as const;

export function readRoute(hash: string = window.location.hash): AppRoute {
  return hash.startsWith("#/projects") ? "projects" : "home";
}

export function useHashRoute(): AppRoute {
  const [route, setRoute] = useState<AppRoute>(() => readRoute());

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return route;
}

/**
 * Re-applies scroll position after a route change. The browser resolves a hash
 * against the document as it was *before* React swapped the view, so following
 * `#about` from the archive finds nothing — the home sections don't exist yet
 * at that moment. This runs once they do.
 */
export function useRouteScroll(route: AppRoute) {
  useEffect(() => {
    const hash = window.location.hash;

    if (route === "home" && hash && !hash.startsWith("#/")) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    window.scrollTo({ top: 0 });
  }, [route]);
}
