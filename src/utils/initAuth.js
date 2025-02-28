import { batch } from "../../core/signal.js";
import getUsers from "../api/user.js";
import { ws } from "../api/ws.js";
import { isAuth, userId, username, users } from "../state.js";
import { initUsers } from "./users.js";

export async function initAuth(router) {
  const token = localStorage.getItem("authToken");
  if (token) {
    const user = localStorage.getItem("username");
    const userid = localStorage.getItem("userId");

    username.value = user;
    userId.value = userid;
    const usersData = await getUsers();
    batch(() => {
      isAuth.value = true;
      if (users.value.length === 0) users.value = initUsers(usersData, user);
    });
    ws.connect(token);
    return true;
  } else {
    username.value = "";
    isAuth.value = false;
    router.navigate("/login");
    return false;
  }
}
