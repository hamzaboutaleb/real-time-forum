/** @jsx h */
import { createDom } from "./app/createDom.js";
import { For } from "./app/For.js";
import { Fragment } from "./app/Fragment.js";
import { createEffect, createSignal } from "./app/signal.js";
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

// JSX component

function Counter({ count }) {
  const counter = createSignal(count);
  return (
    <div>
      <div>{counter}</div>
      <button onclick={() => counter.value++}>Increment</button>
    </div>
  );
}

function App() {
  const data = createSignal(0);
  const isLoading = createSignal(false);

  async function getData() {
    isLoading.value = true;
    await mockFetch(2000);
    data.value = Math.floor(Math.random() * 100);
    isLoading.value = false;
  }
  return (
    <div>
      {() => {
        if (isLoading.value) {
          return <div>Loading...</div>;
        } else {
          return <div>{data}</div>;
        }
      }}
      <button onclick={getData}>Refresh</button>
    </div>
  );
}

// Render the app
render(App(), document.body);
