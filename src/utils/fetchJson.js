const URL = "http://localhost:8000/";
export async function fetchJson(url, options = {}) {
  const token = localStorage.getItem("authToken") || "";
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(URL + url, options);
  const data = await response.json();
  if (!response.ok) {
    throw { response, data };
  }
  return { data, response };
}
