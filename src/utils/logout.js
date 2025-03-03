import { logout } from "../api/auth.js";
import { ws } from "../api/ws.js";
import { router } from "../app.js";
import { isAuth, users } from "../state.js";

export async function handleLogout() {
  try {
    await logout();
  } finally {
    isAuth.value = false;
    ws.close();
    users.value = [];
    router.navigate("/login");
  }
}
