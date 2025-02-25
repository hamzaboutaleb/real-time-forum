import { fetchJson } from "../utils/fetchJson.js";

export async function auth(formData) {
  const response = await fetchJson("api/login", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const data = response.data;
  return data;
}

export async function register(formData) {
  await fetchJson("api/register", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
  });
}

export async function logout() {
  const token = localStorage.getItem("authToken");
  localStorage.removeItem("authToken");
  await fetchJson("api/logout", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}
