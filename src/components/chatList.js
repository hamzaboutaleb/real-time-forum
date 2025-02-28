import { For } from "../../core/For.js";
import { createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import getUsers from "../api/user.js";
import { users } from "../state.js";
import { initUsers } from "../utils/users.js";
import { ChatUserItem } from "./ChatUserItem.js";

export function ChatList() {
  let isOpen = createSignal(false);
  return (
    <div class="chat-windws-list">
      <div class={() => (isOpen.value ? "contacts open" : "contacts")}>
        <header class="contact-header">
          <h2>Contacts</h2>
          <span onClick={() => (isOpen.value = !isOpen.value)}>-</span>
        </header>
        <For
          each={users}
          component={(user) => <ChatUserItem isOpen={isOpen} user={user} />}
          container={<div class="contact-list"></div>}
        ></For>
      </div>
    </div>
  );
}
