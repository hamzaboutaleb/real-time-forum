import { For } from "../../core/For.js";
import { createSignal } from "../../core/signal.js";
import { h } from "../../core/view.js";

let toastItems = createSignal([]);

export function addNotification(title, notification) {
  toastItems.value = [
    ...toastItems.value,
    { key: self.crypto.randomUUID(), title, notification },
  ];
}

export function Toast() {
  return (
    <For
      each={toastItems}
      container={<div class="toast-container" id="toastContainer"></div>}
      component={(item) => <ToastItem item={item} items={toastItems} />}
    />
  );
}

function ToastItem({ item, items }) {
  const onClick = () => {
    items.value = items.value.filter((element) => element !== item);
  };
  setTimeout(() => {
    onClick();
  }, 4000);
  return (
    <div class="toast">
      <div>
        <span>{item.title}</span>
        <p>{item.notification}</p>
      </div>
      <button class="close-btn" onclick={onClick}>
        x
      </button>
    </div>
  );
}
