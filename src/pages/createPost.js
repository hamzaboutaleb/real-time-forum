import { batch, createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { createPost } from "../api/post.js";
import { router } from "../app.js";
import { wait } from "../utils/wait.js";

export function CreatePostPage() {
  const error = createSignal("");
  const success = createSignal("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let tags = tagsToArray(formData.get("tags"));
    const requestData = {
      title: formData.get("title"),
      content: formData.get("content"),
      tags: tags,
    };
    try {
      const data = await createPost(requestData);
      batch(() => {
        success.value = "Post created successfully";
        error.value = "";
      });
      await wait(1000);
      router.navigate("/");
    } catch (err) {
      error.value = err.data.message;
    }
  };
  return (
    <div class="container">
      <div class="post-form">
        <h2 class="comment-form-header">New Post</h2>
        {() => {
          if (error.value !== "") {
            return <div class="error">{error}</div>;
          } else if (success.value !== "") {
            return <div class="success">{success}</div>;
          }
        }}
        <form class="post-form" onSubmit={onSubmit} method="POST">
          <input type="text" name="title" placeholder="Title" class="input" />
          <textarea
            name="content"
            rows="4"
            class="input"
            placeholder="what's on your mind?"
          ></textarea>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma seprator)"
            class="input"
          />
          <button class="primary-btn" type="submit">
            <i class="fa-solid fa-location-arrow"></i> NEW POST
          </button>
        </form>
      </div>
    </div>
  );
}

function tagsToArray(categoryString) {
  const categoriesArray = categoryString
    .split(",")
    .map((category) => category.trim())
    .filter((cate) => cate.length > 0);
  return categoriesArray;
}
