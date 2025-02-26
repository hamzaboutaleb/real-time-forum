import { Fragment } from "../../core/Fragment.js";
import { h } from "../../core/view.js";
import { logout } from "../api/auth.js";
import { Link, router } from "../app.js";
import { isAuth, username } from "../state.js";
import { handleLogout } from "../utils/logout.js";

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
               <Link to="/create" class="btn btn--primary">
                Create Post
              </Link>
              <a
                onClick={async () => {
                  handleLogout();
                }}
                href="#"
              >
                <span class="avatar avatar--md">
                  {username.value[0]?.toUpperCase()}
                </span>
                <span>logout</span>
              </a>
             
            </div>
          );
        }}
      </header>
    </div>
  );
}
