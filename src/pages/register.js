import { createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { Link, router } from "../app.js";
import { fetchJson } from "../utils/fetchJson.js";
import { wait } from "../utils/wait.js";

/**
 * 
 * @param {	ID       int64  `json:"id"`
	Email    string `json:"email"`
	Age      int64  `json:"age,string"`
	FirstName string `json:"firstname"`
	LastName string `json:"lastname"`
	Username string `json:"username"`
	Password string `json:"password"`} formData 
 */
async function postRegister(formData) {
  const data = await fetchJson("http://localhost:8000/api/register", {
    method: "POST",
    body: JSON.stringify(Object.fromEntries(formData)),
  });
}



export function RegisterPage() {
  const error = createSignal("");
  const success = createSignal("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(JSON.stringify(Object.fromEntries(formData)));
    try {
      console.log("Registering...");
      error.value = "";
      await postRegister(formData);
      success.value = "Registration successful. You can now login.";
      await wait(2000);
      router.navigate("/login");
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
