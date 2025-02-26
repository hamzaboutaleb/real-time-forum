import { createSignal, h } from "../../core/index.js";
import { auth } from "../api/auth.js";
import { Link, router } from "../app.js";
import { isAuth, username } from "../state.js";
import { wait } from "../utils/wait.js";

// async function auth(formData) {
//   const response = await fetchJson("api/login", {
//     method: "POST",
//     body: JSON.stringify(Object.fromEntries(formData)),
//   });
//   const data = response.data;
//   return data;
// }

export function LoginPage() {
  const error = createSignal("");
  const success = createSignal("");
  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      error.value = "";
      const data = await auth(formData);
      console.log(data.data);
      localStorage.setItem("authToken", data.data.session_id);
      localStorage.setItem("username", data.data.username);
      success.value = "Login successful. Redirecting...";
      isAuth.value = true;
      username.value = data.data.username;
      router.navigate("/");
    } catch (err) {
      console.log(err);
      error.value = err.data.message;
    }
  }

  return (
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo">
          <span class="storked">FOR</span>
          <span class="filled">UM</span>
        </div>
        <h2>Log In to Your Account</h2>

        {() => {
          if (error.value != "") {
            return <div class="error">{error}</div>;
          } else if (success.value != "") {
            return <div class="success">{success}</div>;
          }
          return null;
        }}

        <form onSubmit={handleOnSubmit} action="" method="post">
          <input
            class="input"
            type="text"
            autocomplete="username"
            name="username"
            placeholder="E-mail or Nickname"
          />
          <input
            class="input"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="Password"
          />
          <div class="row">
            <input class="primary-btn full-width" type="submit" value="Login" />
            <Link to="/register" class="secondary-btn full-width">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
