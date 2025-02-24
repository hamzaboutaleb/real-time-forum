import { createSignal, h } from "../../core/index.js";
import { isAuth, Link } from "../app.js";

async function auth(formData) {
  const response = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

export function LoginPage() {
  const error = createSignal("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      error.value = "";
      isAuth.value = !isAuth.value;
      const data = await auth(formData);
    } catch (err) {
      error.value = err.message;
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
