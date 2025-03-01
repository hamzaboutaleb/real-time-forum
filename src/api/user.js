import { fetchJson } from "../utils/fetchJson.js";
import { sortUsers } from "../utils/users.js";

export default async function getUsers() {
  const data = await fetchJson("api/users");
  return sortUsers(data.data.data);
}
