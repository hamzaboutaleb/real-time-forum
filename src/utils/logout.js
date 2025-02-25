import { logout } from "../api/auth.js";
import { router } from "../app.js";
import { isAuth } from "../state.js";

export async function handleLogout() {
  try {
    await logout();
  } finally {
    isAuth.value = false;
    router.navigate("/login");
  }
}
