import { For } from "../../core/For.js";
import { Fragment } from "../../core/Fragment.js";
import { batch, createEffect, createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { getPosts } from "../api/post.js";
import { handleLogout } from "../utils/logout.js";
import { wait } from "../utils/wait.js";
import { Loader } from "./loader.js";
import { PostItem } from "./postItem.js";

export function PostList() {
  const loading = createSignal(false);
  const error = createSignal("");
  const done = createSignal(false);
  const posts = createSignal([]);

  let page = 1;

  async function getAllPosts() {
    try {
      batch(() => {
        loading.value = true;
        error.value = "";
      });
      const data = await getPosts(page++);
      const newPosts = data.data.data.Data.Posts || [];
      if (newPosts.length == 0) {
        done.value = true;
      }
      await wait(300);
      posts.value = [...posts.value, ...newPosts];
      loading.value = false;
    } catch (error) {
      error.value = "Can't Load Data";
    } finally {
      loading.value = false;
    }
  }

  const handleOnScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      if (error.value == "" && loading.value == false && done.value == false) {
        getAllPosts();
      }
    }
  };

  const onUnmount = () => {
    window.removeEventListener("scroll", handleOnScroll);
  };
  const onMount = async (node) => {
    window.addEventListener("scroll", handleOnScroll);
  };
  getAllPosts();

  return (
    <Fragment>
      <For
        each={posts}
        component={(post) => <PostItem post={post} />}
        container={<div id="posts" onMount={onMount} onUnmount={onUnmount} />}
      />
      <div>
        {() => {
          if (loading.value == true) {
            return <Loader />;
          } else if (error.value != "") {
            return <h1>{error}</h1>;
          } else if (done.value == true) {
            return <div class="info text-center"> no more posts </div>;
          } else {
            return null;
          }
        }}
      </div>
    </Fragment>
  );
}
