import { For } from "../../core/For.js";
import { onUnmount } from "../../core/mount.js";
import { createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";
import { fetchMessages } from "../api/messages.js";
import { ws } from "../api/ws.js";
import { TypingIndicator } from "../components/typingIndicator.js";
import { setGlobalMessages, typing } from "../state.js";
import { throttle } from "../utils/throttle.js";

export function ChatPage({ params }) {
  let messages = createSignal([]);
  let message = createSignal("");

  setGlobalMessages(messages, +params.id);
  let timeoutId = null;
  async function loadMessages() {
    const data = (await fetchMessages(params.id)) || [];
    console.log(data);
    messages.value = data;
  }

  let throttled = throttle(emitTyping, 1000);
  function onSubmit(e) {
    e.preventDefault();
    console.log("send message");
    const message = message.value;
    ws.emit("message", { receiver: +params.id, message });
  }

  function onUnmount() {
    setGlobalMessages(null, null);
  }

  loadMessages();
  function onInput(e) {
    message.value = e.target.value;
    throttled();
  }
  function emitTyping() {
    ws.emit("typing", { receiver: +params.id });
  }
  return (
    <div class="container" onUnmount={onUnmount}>
      <div class="chat-window ">
        <div class="chat-header">
          <h2>hboutale</h2>
          <span>
            <i class="fa fa-times"></i>{" "}
          </span>
        </div>
        <div class="chat-zone">
          <For
            each={messages}
            container={<div class="chat-body"></div>}
            component={(msg) => (
              <MessageItem message={msg} chatId={+params.id} />
            )}
          />
          {/* <div class="chat-body">
            <div class="chat-incoming">hello friend how are you</div>
            <div class="chat-outgoing">i am fine and you</div>
            <div class="chat-incoming">hello friend how are you</div>
            <div class="chat-outgoing">i am fine and you</div>
            <div class="chat-incoming">hello friend how are you</div>
            <div class="chat-outgoing">i am fine and you</div>
            <div class="chat-incoming">hello friend how are you</div>
            <div class="chat-outgoing">i am fine and you</div>
          </div> */}

          <form onSubmit={onSubmit} class="chat-footer">
            <div class="chat-typing">
              {() => {
                if (typing.value.has(+params.id)) {
                  if (timeoutId) clearTimeout(timeoutId);
                  timeoutId = setTimeout(() => {
                    const typingSet = new Set(typing.value);
                    typingSet.delete(+params.id);
                    typing.value = typingSet;
                  }, 1500);
                  return <TypingIndicator />;
                }
                return null;
              }}
            </div>
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
  return <div class={classValue}>{message.data}</div>;
}
