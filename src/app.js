import { render, h, createRouter, createSignal } from "../core/index.js";
import { RouterView } from "../core/router.js";
import { getPostById } from "./api/post.js";
import { Header } from "./components/header.js";
import { IndexPage } from "./pages/index.js";
import { LoginPage } from "./pages/login.js";
import { PostPage } from "./pages/post.js";
import { RegisterPage } from "./pages/register.js";
import { initAuth } from "./utils/initAuth.js";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/post/:id", component: PostPage },
];

export function Link(props) {
  
  return h(
    "a",
    {
      onClick: (e) => {
        e.preventDefault();
        router.navigate(props.to);
      },
      href: props.to,
      ...props,
    },
    props.children
  );
}

// 2. Create router instance
export const router = createRouter(routes);

async function getPost(id) {
  try {
    const data = await getPostById(1);
  } catch (e) {}
}

// 4. Create root app component
function App() {
  router.navigate("/");
  initAuth()
  return (
    <div>
      <Header />
      <RouterView router={router} />
    </div>
  );
}

render(App(), document.getElementById("app"));
