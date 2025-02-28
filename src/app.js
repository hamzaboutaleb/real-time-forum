import {
  render,
  h,
  createRouter,
  createSignal,
  createDom,
} from "../core/index.js";
import { RouterView } from "../core/router.js";
import { getPostById } from "./api/post.js";
import { ChatList } from "./components/chatList.js";
import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { ChatPage } from "./pages/chat.js";
import { CreatePostPage } from "./pages/createPost.js";
import { IndexPage } from "./pages/index.js";
import { LoginPage } from "./pages/login.js";
import { PostPage } from "./pages/post.js";
import { RegisterPage } from "./pages/register.js";
import { isAuth } from "./state.js";
import { initAuth } from "./utils/initAuth.js";

const routes = [
  { path: "/", component: IndexPage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/post/:id", component: PostPage },
  { path: "/create", component: CreatePostPage },
  { path: "/chat/:id", component: ChatPage },
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
initAuth(router);
// 4. Create root app component
const ChatListComponent = createDom(
  <ChatList />,
  document.createDocumentFragment()
);
function App() {
  router.navigate("/");
  return (
    <div>
      <Header />
      <RouterView router={router} />
      {() => {
        if (isAuth.value) {
          return ChatListComponent;
        }
        return null;
      }}
      <Footer />
    </div>
  );
}

render(App(), document.getElementById("app"));
