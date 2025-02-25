import { For, h } from "../../core/index.js";
import { Link } from "../app.js";
import { formatDate } from "../utils/formatDate.js";

export function PostItem({ post }) {
  return (
    <div class="post-item">
      <Link to={`/post/${post.id}`} class="post-title">
        {post.title}
      </Link>
      <header class="post-header">
        <div class="avatar avatar--large">{post.username.at(0)}</div>
        <div class="user-info">
          <span class="username">{post.username}</span>
          <span class="date">{formatDate(post.createdAt)}</span>
        </div>
      </header>
      <For
        each={post.tags}
        component={(tag) => <span class="tag">{tag}</span>}
        container={<div class="post-tags" />}
      />
      {/* <div class="post-tags">
        <span class="tag">Technology</span>
        <span class="tag">Event</span>
      </div> */}
      <div class="post-content">{post.content}</div>
      <Link to={`/post/${post.id}`} class="post-read-more">
        read more
      </Link>
    </div>
  );
}
