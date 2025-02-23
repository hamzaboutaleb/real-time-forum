import { createEffect, Signal } from "./signal.js";

export function createDom(element, parent = null) {
  if (element === null || element === undefined || element === false) {
    return document.createTextNode(""); // Render an empty text node
  }
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(element);
  }

  if (element instanceof DocumentFragment) {
    return element;
  }

  if (element instanceof Element) {
    return element;
  }

  if (typeof element === "function") {
    const fragment = document.createElement("div");
    createEffect(() => {
      console.log("element", element);
      const newElement = element();
      fragment.innerHTML = "";
      fragment.appendChild(createDom(newElement));
    });
    return fragment;
  }
  // Add support for arrays (lists)
  if (Array.isArray(element)) {
    const fragment = document.createDocumentFragment();
    const keyMap = new Map();
    let prevItems = [];

    createEffect(() => {
      const newItems = element;
      const newKeyMap = new Map();

      // Stage 1: Create/Update items
      newItems.forEach((item, index) => {
        const key = item.key ?? index;
        const existing = keyMap.get(key);

        if (existing) {
          // Update existing
          newKeyMap.set(key, existing);
        } else {
          // Create new
          const node = createDom(item);
          node._key = key;
          newKeyMap.set(key, node);
        }
      });

      // Stage 2: Remove old items
      keyMap.forEach((node, key) => {
        if (!newKeyMap.has(key)) {
          node.remove();
        }
      });

      // Stage 3: Reorder
      const newNodes = newItems.map((item, index) => {
        const key = item.key ?? index;
        return newKeyMap.get(key);
      });

      // Efficient DOM update
      newNodes.forEach((node, index) => {
        const current = fragment.childNodes[index];
        if (current !== node) {
          fragment.insertBefore(node, current);
        }
      });

      // Update tracking
      prevItems = newItems;
      keyMap.clear();
      newKeyMap.forEach((value, key) => keyMap.set(key, value));
    });

    return fragment;
  }

  if (element instanceof Signal) {
    const node = document.createTextNode(element.value);
    createEffect(() => {
      node.nodeValue = element.value;
    });
    return node;
  }
  if (typeof element.type === "function") {
    const componentVNode = element.type({
      ...element.props,
      children: element.children,
    });
    const result = createDom(componentVNode);
    return result;
  }
  const node = document.createElement(element.type);
  if (element.props) {
    for (let [key, value] of Object.entries(element.props)) {
      if (key.startsWith("on")) {
        addEventListener(node, key.slice(2).toLowerCase(), value);
      } else if (value instanceof Signal) {
        setSignalAttribute(node, key, value);
      } else {
        setAttribute(node, key, value);
      }
    }
  }
  if (Array.isArray(element.children)) {
    element.children.forEach((child) => {
      const result = createDom(child, node);
      node.appendChild(result);
    });
  }

  return node;
}

function setSignalAttribute(node, key, value) {
  createEffect(() => {
    setAttribute(node, key, value.value);
  });
}

function isBooleanAttribute(key) {
  return ["disabled", "checked", "readonly", "multiple", "selected"].includes(
    key
  );
}

function setAttribute(node, key, value) {
  if (key === "style") {
    Object.assign(node.style, value);
  } else if (typeof value === "boolean" && isBooleanAttribute(key)) {
    if (value) {
      node.setAttribute(key, "");
    } else {
      node.removeAttribute(key);
    }
  } else if (key === "className") {
    if (Array.isArray(value)) {
      node.className = value.join(" ");
    } else if (typeof value == "function") {
      createEffect(() => {
        node.className = value();
      });
    } else {
      node.className = value;
    }
  }
}

function addEventListener(element, eventName, callback) {
  element.addEventListener(eventName, callback);
}
