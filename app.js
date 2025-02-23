/** @jsx h */
import { createDom } from "./app/createDom.js";
import { For } from "./app/For.js";
import { Fragment } from "./app/Fragment.js";
import { createEffect, createSignal } from "./app/signal.js";
import { h, render } from "./app/view.js";

function TodoItem({ todo, todos }) {
  return (
    <div>
      <h3>{todo.val}</h3>
      {() => {
        if (todo.val % 2 === 0) {
          return <p>Even</p>;
        }
        return null;
      }}
      <button
        onClick={() => (todos.value = todos.value.filter((t) => t !== todo))}
      >
        Delete
      </button>
    </div>
  );
}

function App() {
  const todos = createSignal([
    { id: 1, val: 0 },
    // { id: 2, val: 1 },
    // { id: 3, val: 2 },
  ]);
  const todo = createSignal("");

  window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      todos.value = [...todos.value, { id: Date.now(), val: +todo.value }];
      todo.value = "";
    }
  });
  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={todo}
        oninput={(e) => {
          todo.value = e.target.value;
        }}
      />
      <button
        onClick={() => {
          todos.value = [...todos.value, { id: Date.now(), text: +todo.value }];
          todo.value = "";
        }}
      >
        Add Todo
      </button>
      <button
        onClick={() => {
          const shufled = [...todos.value];
          for (let i = shufled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shufled[i], shufled[j]] = [shufled[j], shufled[i]];
          }
          const incremented = shufled.map((todo, index) => ({
            ...todo,
            val: todo.val + 1,
          }));
          todos.value = incremented;
          console.log(todos.value);
        }}
      >
        shuffle
      </button>
      <For
        each={todos}
        component={(todo) => <TodoItem todo={todo} todos={todos} />}
      />
    </div>
  );
}

// Render the app
render(App(), document.body);
