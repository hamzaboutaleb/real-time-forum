import { createDom } from "./createDom.js";
import { createEffect } from "./signal.js";

export function For({ each, key, component }) {
  const container = document.createElement("div");
  let prevItems = [];
  let nodes = new Map(); // Map<key, { node: HTMLElement, disposers: Set<Function> }>
  let children = component;
  createEffect(() => {
    const newItems = each.value || [];
    const newKeys = new Set();
    const keyMap = new Map();
    // 1. Create key map for new items
    newItems.forEach((item, index) => {
      const keyValue = item.id ?? index;
      keyMap.set(keyValue, item);
      newKeys.add(keyValue);
    });

    // 2. Remove deleted items
    nodes.forEach((value, key) => {
      if (!newKeys.has(key)) {
        // Cleanup effects and DOM
        value.node.remove();
        nodes.delete(key);
      }
    });

    // 3. Update existing items
    newItems.forEach((newItem, index) => {
      const key = newItem.key ?? newItem.id ?? index;
      const existing = nodes.get(key);

      if (existing) {
        // Update existing node
        const newVNode = children(newItem, index);
        patch(existing, newVNode);
      }
    });

    // 4. Add new items
    newItems.forEach((newItem, index) => {
      const key = newItem.key ?? newItem.id ?? index;
      if (!nodes.has(key)) {
        const vnode = children(newItem, index);
        const node = createDom(vnode);

        nodes.set(key, node);
        container.appendChild(node);
      }
    });

    // 5. Reorder nodes if needed
    const newOrder = newItems.map(
      (item, index) => item.key ?? item.id ?? index
    );

    newOrder.forEach((key, position) => {
      const node = nodes.get(key);
      const current = container.childNodes[position];
      if (current !== node) {
        container.insertBefore(node, current);
      }
    });

    prevItems = newItems;
  });
  return container;
}

// Basic patching function
function patch(oldNode, newVNode) {
  // Simple text node patching
  if (oldNode.nodeType === Node.TEXT_NODE && typeof newVNode === "string") {
    if (oldNode.textContent !== newVNode) {
      oldNode.textContent = newVNode;
    }
    return;
  }

  // Element patching
  if (oldNode.nodeName.toLowerCase() === newVNode.type) {
    // Patch attributes
    const oldProps = oldNode._props || {};
    const newProps = newVNode.props || {};

    // Remove old attributes
    Object.keys(oldProps).forEach((key) => {
      if (!(key in newProps)) {
        oldNode.removeAttribute(key);
      }
    });

    // Set new attributes
    Object.entries(newProps).forEach(([key, value]) => {
      if (oldProps[key] !== value) {
        oldNode.setAttribute(key, value);
      }
    });

    // Patch children
    const oldChildren = Array.from(oldNode.childNodes);
    const newChildren = newVNode.children || [];
    const max = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < max; i++) {
      const oldChild = oldChildren[i];
      const newChild = newChildren[i];

      if (!oldChild) {
        oldNode.appendChild(createDom(newChild));
      } else if (!newChild) {
        oldNode.removeChild(oldChild);
      } else {
        patch(oldChild, newChild);
      }
    }
  }
}
