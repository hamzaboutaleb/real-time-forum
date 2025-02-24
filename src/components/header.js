import { Fragment } from "../../core/Fragment.js";
import { h } from "../../core/view.js";
import { isAuth, Link } from "../app.js";

export function Header() {
  return (
    <div class="container">
      <header id="header">
        <Link to="/">
          <div class="logo">
            <span class="storked">FOR</span>
            <span class="filled">UM</span>
          </div>
        </Link>

        {() => {
          if (isAuth.value == false) {
            return (
              <div class="links">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            );
          }
          return (
            <div class="links">
              <a href="#">
                <span class="avatar avatar--md">H</span>
                <span>logout</span>
              </a>
            </div>
          );
        }}
      </header>
    </div>
  );
}
