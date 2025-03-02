import { fetchJson } from "../utils/fetchJson.js";

export async function fetchMessages(userId, message_id = "") {
  const data = await fetchJson(
    `/api/msg?user_id=${userId}${
      message_id == "" ? "" : `&msg_id=${message_id}`
    }`
  );
  return data.data.data;
}
