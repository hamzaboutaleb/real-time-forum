import { router } from "../app.js";
import { handleLogout } from "./logout.js";

const URL = "http://localhost:8000/";
export async function fetchJson(url, options = {}) {
  const token = localStorage.getItem("authToken") || "";
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(URL + url, options);
  const data = await response.json();
  if (response.status == 401) {
    handleLogout();
    throw { data, response };
  }
  if (!response.ok) {
    throw { response, data };
  }
  return { data, response };
}
