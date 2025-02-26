import { isAuth, username } from "../state.js";

export function initAuth(router) {
  const token = localStorage.getItem("authToken");
  if (token) {
    isAuth.value = true;
    username.value = localStorage.getItem("username");
    return true;
  } else {
    username.value = "";
    isAuth.value = false;
    router.navigate("/login");
    return false;
  }
}
