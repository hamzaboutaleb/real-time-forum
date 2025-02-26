import { fetchJson } from "../utils/fetchJson.js";

export async function likeComment(id) {
  const data = await fetchJson(`api/like/comment`, {
    method: "POST",
    body: JSON.stringify({ commentId: id, isLike: 1 }),
  });
  return data.data.data
}

export async function dislikeComment(id) {
  const data = await fetchJson(`api/like/comment`, {
    method: "POST",
    body: JSON.stringify({ commentId: id, isLike: -1 }),
  });
  return data.data.data
}
