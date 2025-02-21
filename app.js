import { createSignal, Signal } from "./app/signal.js";
import { h, render } from "./app/view.js";

function mockFetch(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, status: 200 }), delay);
  });
}

function renderList(items, createItem) {
  return items.value.map((item, index) =>
    h("div", { key: items }, createItem(item, index))
  );
}

const list = createSignal([
  { id: 1, text: "Item 1" },
  { id: 2, text: "Item 2" },
  { id: 3, text: "Item 3" },
]);

// JSX-like template
// const App = () =>
//   h(
//     "div",
//     null,
//     h("h1", null, "Todo List"),
//     h(
//       "ul",
//       null,
//       () => list.value.map((item) => h("li", { key: item.id }, item.text))
//     ),
//     h("button", { onclick: () => addItem() }, "Add Item"),
//     h("button", { onclick: () => removeItem() }, "remove Item")
//   );

// // Function to add a new item
// function addItem() {
//   console.log("Adding item");
//   const newItem = { id: Date.now(), text: `Item ${list.value.length + 1}` };
//   list.value = [...list.value, newItem];
// }

// function removeItem() {
//   console.log("Removing item");
//   list.value = list.value.slice(0, list.value.length - 1);
// }

function Counter(counter) {
  return h(
    "div",
    null,
    h("div", null, () =>
      renderList(counter, (item, index) => h("div", null, item))
    ),
    h(
      "button",
      {
        onclick: () => {
          counter.value = [...counter.value, counter.value.length + 1];
        },
      },
      "add"
    ),
    h(
      "button",
      {
        onclick: () => {
          counter.value = counter.value.slice(0, counter.value.length - 1);
        },
      },
      "remove"
    )
  );
}

function App() {
  const show = createSignal(true);
  const counter = createSignal([1, 2, 3]);

  return h(
    "div",
    null,
    () => {
      if (show.value) {
        return Counter(counter);
      }
      return h("div", null, "Hidden");
    },
    h("button", { onclick: () => (show.value = !show.value) }, "Toggle")
  );
}

// Render the app
render(App(), document.body);
