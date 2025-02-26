/** @jsx h */
import { createDom } from "./core/createDom.js";
import { createEffect, createSignal, untrack } from "./core/signal.js";
import { h, render } from "./core/view.js";
import { IndexPage } from "./pages/index.js";

function createRouter(routes) {
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

  window.addEventListener("hashchange", matchRoute);
  window.addEventListener("popstate", matchRoute);

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

function RouterView({ router }) {
  const container = document.createElement("div");
  let currentDOMComponent = null;
  let currentComponent = null;
  let disposeEffect = null;

  disposeEffect = createEffect(() => {
    // if (currentComponent == router.current.value) return;
    if (currentDOMComponent) {
      currentDOMComponent.remove();
    }

    const Component = router.current.value;
    const params = router.params.value;

    if (Component) {
      currentDOMComponent = untrack(() =>
        createDom({
          type: Component,
          props: { params: router.params },
        }, container)
      );
      container.appendChild(currentDOMComponent);
      currentComponent = Component;
    }
  });

  return container;
}

// Link component
function Link(props) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        router.navigate(props.to);
      }}
      {...props}
    >
      {props.children}
    </a>
  );
}

const routes = [
  { path: "/", component: IndexPage },
  { path: "/about", component: About },
  { path: "/users/:id", component: UserProfile },
];

const router = createRouter(routes);



function About() {
  return {
    type: "div",
    children: [
      { type: "h1", children: "About Us" },
      { type: Link, props: { to: "/" }, children: "Go Home" },
    ],
  };
}

function UserProfile({ params }) {
  return {
    type: "div",
    children: [
      { type: "h1", children: `User ${params.id}` },
      { type: "p", children: "Profile page content" },
    ],
  };
}

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <RouterView router={router} />
      <div>footer</div>
    </div>
  );
}

// Render the app
render(App(), document.body);
