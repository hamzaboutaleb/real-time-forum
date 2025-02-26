import { fetchJson } from "../utils/fetchJson.js";

export async function getPostById(id) {
  const data = await fetchJson(`api/post/${id}`, {
    method: "GET",
  });
  return data.data.data.Data;
}

export async function getPosts(page = 1) {
  const data = await fetchJson(`api/posts?page=${page}`, {
    method: "GET",
  });
  return data;
}

export async function createPost(post) {
  const data = await fetchJson("api/post", {
    method: "POST",
    body: JSON.stringify(post),
  });
  return data;
}
