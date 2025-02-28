import { fetchJson } from "../utils/fetchJson.js";

export async function fetchMessages(userId, message_id = "") {
  const data = await fetchJson(`/api/msg?user_id=${userId}`);
  return data.data.data;
}

