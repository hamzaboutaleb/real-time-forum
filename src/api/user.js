import { fetchJson } from "../utils/fetchJson.js";

export default async function getUsers() {
  const data = await fetchJson("api/users");
  return data.data.data;
}
