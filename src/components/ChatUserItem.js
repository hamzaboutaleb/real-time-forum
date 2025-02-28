import { h } from "../../core/view.js";
import { Link, router } from "../app.js";
import { users } from "../state.js";

export function ChatUserItem({ user, isOpen }) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        isOpen.value = false;
        router.navigate(`/chat/${user.id}`);
      }}
      class="user-chat"
    >
      <div class="avatar-status">
        <div class="avatar avatar--large">
          {user.username[0].toUpperCase()}
        </div>
        <span class={user.online ? "status active" : "status"}></span>
      </div>
      <div class="user-info">
        <span class="username">{user.username}</span>
        <span class="last-message">Hey, how are you?</span>
      </div>
    </a>
  );
}
