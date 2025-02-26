import { For } from "../../core/For.js";
import { Fragment } from "../../core/Fragment.js";
import { createEffect, createSignal } from "../../core/signal.js";
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
      loading.value = true;
      error.value = "";
      const data = await getPosts(page++);
      const newPosts = data.data.data.Data.Posts || [];
      if (newPosts.length == 0) {
        done.value = true;
      }
      posts.value = [...posts.value, ...newPosts];
    } catch (error) {
      error.value = "Can't Load Data";
      // if (error.response.status == 401) {
      //   handleLogout();
      //   return;
      // }
    } finally {
      loading.value = false;
    }
  }

  const handleOnScroll = async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      
      if (error.value == "" && loading.value == false && done.value == false)
        getAllPosts();
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
            return <h1>Done</h1>;
          } else {
            return null;
          }
        }}
      </div>
    </Fragment>
  );
}
