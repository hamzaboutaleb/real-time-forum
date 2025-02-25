import { isAuth } from "../state.js";

export function initAuth(router) {
  const token = localStorage.getItem("authToken");
  if (token) {
    isAuth.value = true;
    return true;
  } else {
    isAuth.value = false;
    router.navigate("/login");
    return false;
  }
}
