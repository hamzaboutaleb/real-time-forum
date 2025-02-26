import { fetchJson } from "../utils/fetchJson.js";

export function addComment(formData) {
  const data = fetchJson("api/add/comment", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return data;
}
