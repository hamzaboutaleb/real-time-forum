import { render, h, createRouter, createSignal } from "../core/index.js";
import { RouterView } from "../core/router.js";
import { Header } from "./components/header.js";
import { IndexPage } from "./pages/index.js";
import { LoginPage } from "./pages/login.js";
import { RegisterPage } from "./pages/register.js";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];

export const isAuth = createSignal(false)

export function Link(props) {
  return h(
    "a",
    {
      onClick: (e) => {
        e.preventDefault();
        router.navigate(props.to);
      },
      ...props,
    },
    props.children
  );
}

// 2. Create router instance
const router = createRouter(routes);

// 4. Create root app component
function App() {
  router.navigate("/");
  return (
    <div>
      <Header />
      <RouterView router={router} />
      <div>footer</div>
    </div>
  );
}

render(App(), document.getElementById("app"));
