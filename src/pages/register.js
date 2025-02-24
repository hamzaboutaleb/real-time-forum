import { h } from "../../core/view.js";
import { Link } from "../app.js";

export function RegisterPage() {
  return (
    <div class="auth-container">
      <div class="auth-card">
        <div class="logo">
          <span class="storked">FOR</span>
          <span class="filled">UM</span>
        </div>
        <h2>Create Your Account</h2>
        <form action="" method="post">
          <input
            class="input"
            type="text"
            name="nickname"
            autocomplete="username"
            placeholder="Nickname"
          />
          <input class="input" type="email" autocomplete="username" name="email" placeholder="E-mail" />
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
              name="first_name"
              placeholder="First Name"
            />
            <input
              class="input full-width"
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
          </div>
          <input class="input" type="number" name="age" placeholder="Age" />
          <select class="input" name="gender">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <div class="row">
            <input
              class="primary-btn full-width"
              type="button"
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
