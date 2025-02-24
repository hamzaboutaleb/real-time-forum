import { createDom } from "./createDom.js";
import { createEffect, createSignal, untrack } from "./signal.js";
import { h } from "./view.js";

export function createRouter(routes) {
  const current = createSignal(null);
  const params = createSignal({});

  function resolvePath(path) {
    return path.replace(/^#/, ""); // Handle hash routing
  }

  function matchRoute() {
    const path = resolvePath(window.location.hash || window.location.pathname);

    for (const route of routes) {
      const keys = [];
      const pattern = route.path
        .replace(/:(\w+)/g, (_, key) => {
          keys.push(key);
          return "([^\\/]+)";
        })
        .replace(/\*/g, ".*");

      const regex = new RegExp(`^${pattern}$`);
      const match = path.match(regex);
      if (match) {
        const routeParams = keys.reduce((acc, key, index) => {
          acc[key] = match[index + 1];
          return acc;
        }, {});
        current.value = route.component;
        params.value = routeParams;
        return;
      }
    }

    current.value = routes.find((r) => r.path === "*")?.component || null;
  }

  // Hash-based routing
  window.addEventListener("hashchange", matchRoute);
  // Path-based routing
  window.addEventListener("popstate", matchRoute);

  // Initial match
  matchRoute();

  return {
    current,
    params,
    navigate(path) {
      if (path.startsWith("#")) {
        window.location.hash = path;
      } else {
        window.history.pushState({}, "", path);
      }
      matchRoute();
    },
  };
}

// RouterView component
export function RouterView({ router }) {
  const container = document.createElement("div");
  let currentDOMComponent = null;
  let currentComponent = null;
  let disposeEffect = null;

  disposeEffect = createEffect(() => {
    // Cleanup previous component
    // if (currentComponent == router.current.value) return;
    if (currentDOMComponent) {
      currentDOMComponent.remove();
    }

    // Get current route component and params
    const Component = router.current.value;
    const params = router.params.value;

    if (Component) {
      // Create new component with reactive params
      currentDOMComponent = untrack(() =>
        createDom({
          type: Component,
          props: { params: router.params }, // Pass the signal directly
        })
      );
      container.appendChild(currentDOMComponent);
      currentComponent = Component;
    }
  });

  return container;
}

// Link component
