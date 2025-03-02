import { fetchJson } from "../utils/fetchJson.js";
import { initUsers, sortUsers } from "../utils/users.js";

export default async function getUsers() {
  const data = await fetchJson("api/users");
  let usersData = data?.data?.data || [];
  return sortUsers(initUsers(usersData));
}
