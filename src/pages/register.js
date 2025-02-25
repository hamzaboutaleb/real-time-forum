import { createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { register } from "../api/auth.js";
import { Link, router } from "../app.js";
import { wait } from "../utils/wait.js";

// async function postRegister(formData) {
//   const data = await fetchJson("api/register", {
//     method: "POST",
//     body: JSON.stringify(Object.fromEntries(formData)),
//   });
// }

export function RegisterPage() {
  const error = createSignal("");
  const success = createSignal("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      error.value = "";
      await register(formData);
      success.value = "Registration successful. You can now login.";
      await wait(2000);
      router.navigate("/login");
    } catch (err) {
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
        <h2>Create Your Account</h2>
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
            name="username"
            autocomplete="username"
            placeholder="Nickname"
          />
          <input
            class="input"
            type="email"
            autocomplete="username"
            name="email"
            placeholder="E-mail"
          />
          <input
            class="input"
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="current-password"
          />
          <div class="row">
            <input
              class="input full-width"
              type="text"
              name="firstname"
              placeholder="First Name"
            />
            <input
              class="input full-width"
              type="text"
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <input
            class="input"
            type="number"
            value={0}
            name="age"
            placeholder="Age"
          />
          <select class="input" name="gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <div class="row">
            <input
              class="primary-btn full-width"
              type="submit"
              value="Register"
            />
            <Link to="/login" class="secondary-btn full-width">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
