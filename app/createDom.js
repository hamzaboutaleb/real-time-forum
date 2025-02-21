import { createEffect, Signal } from "./signal.js";

export function createDom(element) {
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(element);
  }
  const node = document.createElement(element.type);
  if (element.props) {
    for (let [key, value] of Object.entries(element.props)) {
      if (key.startsWith("on")) {
        addEventListener(node, key.slice(2).toLowerCase(), value);
      } else {
        if (key === "key") {
          continue;
        }
        setAttribute(node, key, value);
      }
    }
  }

  for (let child of element.children) {
    if (typeof child === "function") {
      const fragment = document.createDocumentFragment();
      let oldChild = null;
      createEffect(() => {
        if (oldChild) {
          oldChild.forEach((child) => child.remove());
        }
        const result = createDomList(child());
        console.log(fragment.childNodes.length);
        fragment.append(...result);
        oldChild = [...fragment.childNodes];
        node.appendChild(fragment);
      });
    } else if (child instanceof Signal) {
      const textNode = document.createTextNode("");
      node.appendChild(textNode);
      createEffect(() => {
        textNode.nodeValue = child.value;
      });
      node.appendChild(textNode);
      continue;
    } else {
      node.appendChild(createDom(child));
    }
  }

  return node;
}

function createDomList(elements) {
  if (Array.isArray(elements)) {
    const domElements = [];
    for (let element of elements) {
      domElements.push(createDom(element));
    }
    return domElements;
  } else {
    return [createDom(elements)];
  }
}
function setAttribute(node, key, value) {
  if (value instanceof Signal) {
    createEffect(() => {
      node.setAttribute(key, value.value);
    });
    return;
  }
  node.setAttribute(key, value);
}

function addEventListener(element, eventName, callback) {
  element.addEventListener(eventName, callback);
}
