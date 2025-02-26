import { For } from "../../core/For.js";
import { Fragment } from "../../core/Fragment.js";
import { batch, createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { addComment } from "../api/comment.js";
import { getPostById } from "../api/post.js";
import { dislikeComment, likeComment } from "../api/reaction.js";
import { Link } from "../app.js";
import { Loader } from "../components/loader.js";
import { formatDate } from "../utils/formatDate.js";
import { wait } from "../utils/wait.js";
/*
{
    "Post": {
        "id": 13,
        "title": "dd",
        "userId": 1,
        "content": "dd",
        "createdAt": "2025-02-25T15:52:55.228370685Z",
        "tags": null,
        "username": "",
        "likes": 0,
        "dislikes": 0
    },
    "Comments": [
        {
            "id": 18,
            "postId": 13,
            "userId": 1,
            "username": "hamza",
            "likes": 0,
            "disLikes": 0,
            "comment": "eza",
            "createdAt": "2025-02-25T18:35:31Z"
        },
    ]
}
*/

export function PostPage({ params }) {
  const post = createSignal({});
  const comments = createSignal([]);
  const loading = createSignal(true);

  const loadPostData = async () => {
    try {
      loading.value = true;
      const data = await getPostById(params.id);
      post.value = data.Post;
      comments.value = data.Comments || [];
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  loadPostData();
  return (
    <div class="container">
      <div class="post-container">
        {() => {
          if (loading.value == true) {
            return <Loader />;
          }
          return (
            <Fragment>
              <Post post={post} />
              <CommnetForm comments={comments} postId={post.value.id} />
              <For
                each={comments}
                component={(comment) => (
                  <CommentItem comments={comments} comment={comment} />
                )}
                container={<div class="comments" />}
              />
            </Fragment>
          );
        }}
      </div>
    </div>
  );
}

function Post({ post }) {
  return (
    <div class="post">
      <div class="post-header">
        <h1 class="post-title">{post.value.title}</h1>
        <div class="post-info">
          <span class="avatar avatar--large">
            {post.value.username[0].toUpperCase()}
          </span>
          <div class="post-details">
            <span class="post-author">{post.value.username}</span>
            <span class="post-date">{formatDate(post.value.createdAt)}</span>
          </div>
        </div>
      </div>
      <div class="post-content">{post.value.content}</div>
    </div>
  );
}

function CommnetForm({ postId, comments }) {
  const error = createSignal("");
  const success = createSignal("");
  const comment = createSignal("");
  const onSubmit = async (e) => {
    e.preventDefault();
    batch(() => {
      error.value = "";
      success.value = "";
    })
    let requestData = {};
    requestData.comment = comment.value;
    requestData.postId = postId;
    try {
      const data = await addComment(requestData);
      success.value = data.data.message;
      await wait(1000);
      batch(() => {
        comments.value = [data.data.data, ...comments.value];
        success.value = "";
        comment.value = "";
      })
    } catch (err) {
      error.value = err.data.message;
    }
  };
  return (
    <div class="comment-form">
      <h2 class="comment-form-header">Leave a Comment</h2>
      {() => {
        if (error.value !== "") {
          return <div class="error">{error}</div>;
        } else if (success.value !== "") {
          return <div class="success">{success}</div>;
        }
      }}
      <form onSubmit={onSubmit} method="POST">
        <textarea
          name="comment"
          rows="4"
          class="input"
          value={comment}
          onInput = {(e) => comment.value = e.target.value}
          placeholder="Leave a comment"
        ></textarea>
        <button class="primary-btn" type="submit">
          <i class="fa-solid fa-location-arrow"></i> Comment
        </button>
      </form>
    </div>
  );
}

function CommentItem({ comments, comment }) {
  const onLikeComment = async () => {
    try {
      const data = await likeComment(comment.id);
      comments.value = comments.value.map((c) => {
        if (c.id === comment.id) {
          return { ...c, ...data };
        }
        return c;
      });
    } catch (error) {}
  };

  const onDislikeComment = async () => {
    try {
      const data = await dislikeComment(comment.id);
      comments.value = comments.value.map((c) => {
        if (c.id === comment.id) {
          return { ...c, ...data };
        }
        return c;
      });
    } catch (error) {}
  };
  return (
    <div class="comment-item">
      <div class="avatar avatar--large">
        {comment.username[0].toUpperCase()}
      </div>
      <div class="commnet-content">
        <div class="comment-info">
          <span class="comment-author">{comment.username}</span>
          <span class="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
        <div class="comment-text">{comment.comment}</div>
        <div class="comment-actions">
          <a class="react like" onClick={onLikeComment}>
            <i class="fa-solid fa-thumbs-up"></i> {comment.likes} likes
          </a>
          <a class="react dislike" onClick={onDislikeComment}>
            <i class="fa-solid fa-thumbs-down"></i> {comment.dislikes} dislikes
          </a>
        </div>
      </div>
    </div>
  );
}
