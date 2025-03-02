import { For } from "../../core/For.js";
import { onUnmount } from "../../core/mount.js";
import { createSignal, untrack } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { fetchMessages } from "../api/messages.js";
import { ws } from "../api/ws.js";
import { TypingIndicator } from "../components/typingIndicator.js";
import {
  gMessages,
  scrollEl,
  setGlobalMessages,
  typing,
  userId,
  username,
} from "../state.js";
import { formatDate } from "../utils/formatDate.js";
import { throttle } from "../utils/throttle.js";

export function ChatPage({ params }) {
  let messages = createSignal([]);
  let message = createSignal("");
  let lastMessageId = null;
  let throttledLoadMessages = throttle(loadMessages, 4000);

  setGlobalMessages(messages, +params.id);
  let timeoutId = null;
  async function loadMessages(messageId) {
    let data = (await fetchMessages(params.id, messageId)) || [];
    data = data.reverse();
    console.log(data);
    lastMessageId = data.at(0)?.msg_id;
    const oldTop = scrollEl.el.scrollHeight;
    if (!lastMessageId) return;
    const oldData = [...messages.value];
    console.log("old data", oldData);
    messages.value = [];
    messages.value = [...data, ...oldData];
    console.log("messages", messages.value);
    if (!messageId) scrollEl.el.scrollTo({ top: scrollEl.el.scrollHeight });
    else scrollEl.el.scrollTo({ top: scrollEl.el.scrollHeight - oldTop });
  }

  let throttled = throttle(emitTyping, 1000);
  function onSubmit(e) {
    e.preventDefault();
    const data = message.value;
    message.value = "";
    ws.emit("message", { receiver: +params.id, message: data });
  }

  loadMessages();
  function onInput(e) {
    message.value = e.target.value;
    throttled();
  }

  function emitTyping() {
    ws.emit("typing", { receiver: +params.id });
  }

  function onScroll(e) {
    console.log(e.currentTarget.scrollTop);
    if (e.currentTarget.scrollTop == 0) {
      throttledLoadMessages(lastMessageId);
    }
  }

  function onMount(div) {
    scrollEl.el = div;
    div.addEventListener("scroll", onScroll);
  }
  return (
    <div class="container">
      <div class="chat-window ">
        <div class="chat-header">
          <h2>{gMessages.username}</h2>
          <span>
            <i class="fa fa-times"></i>{" "}
          </span>
        </div>
        <div class="chat-zone">
          <For
            each={messages}
            container={<div onMount={onMount} class="chat-body"></div>}
            component={(msg) => (
              <MessageItem message={msg} chatId={+params.id} />
            )}
          />
          <form onSubmit={onSubmit} class="chat-footer">
            <div class="chat-typing">
              {() => {
                if (typing.value.has(+params.id)) {
                  if (timeoutId) clearTimeout(timeoutId);
                  timeoutId = setTimeout(() => {
                    const typingSet = new Set(typing.value);
                    typingSet.delete(+params.id);
                    typing.value = typingSet;
                  }, 1000000);
                  return <TypingIndicator />;
                }
                return null;
              }}
            </div>
            <div class="flex ">
              <input
                class="input full-width"
                type="text"
                name="message"
                value={message}
                onInput={onInput}
                placeholder="Type a message..."
              />
              <button type="submit" class="primary-btn">
                <i class="fa-solid fa-location-arrow"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
/**
 {
    "msg_id": 2,
    "sender_id": 1,
    "receiver_id": 2,
    "data": "eazeaz",
    "timestamp": "2025-02-28T18:17:40Z"
}
 */

function MessageItem({ message, chatId }) {
  const classValue =
    message.receiver_id === chatId ? "chat-outgoing" : "chat-incoming";
  return (
    <div class={classValue}>
      {message.data} <div class="time">{formatDate(message.timestamp)}</div>
    </div>
  );
}
