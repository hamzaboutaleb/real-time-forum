import { logout } from "../api/auth.js";
import { ws } from "../api/ws.js";
import { router } from "../app.js";
import { isAuth } from "../state.js";

export async function handleLogout() {
  try {
    await logout();
  } finally {
    isAuth.value = false;
    ws.close();
    router.navigate("/login");
  }
}
