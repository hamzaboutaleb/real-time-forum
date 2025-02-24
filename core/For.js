import { createDom } from "./createDom.js";
import { createEffect } from "./signal.js";

export function For({ each, component, parent }) {
  const container = createDom(parent);
  const itemMap = new Map();
  let prevItems = [];
  const children = component;
  createEffect(() => {
    const newItems = each.value || [];
    const newKeyMap = new Map();

    // Track item changes using a memory-efficient approach
    // 1. Update existing items and track dependencies
    newItems.forEach((newItem, index) => {
      const key = getKey(newItem, index);
      newKeyMap.set(key, { newItem, index });

      if (itemMap.has(key)) {
        const entry = itemMap.get(key);
        // Only update if item reference changed
        if (entry.item !== newItem) {
          updateItem(entry, newItem);
        }
      }
    });

    // 2. Remove deleted items
    itemMap.forEach((entry, key) => {
      if (!newKeyMap.has(key)) {
        entry.disposer();
        entry.node.remove();
        itemMap.delete(key);
      }
    });

    // 3. Add new items with fine-grained effects
    newItems.forEach((newItem, index) => {
      const key = getKey(newItem, index);
      if (!itemMap.has(key)) {
        const entry = createItemEntry(newItem, index);
        itemMap.set(key, entry);
        container.appendChild(entry.node);
      }
    });

    // 4. Maintain DOM order
    newItems.forEach((newItem, index) => {
      const key = getKey(newItem, index);
      const current = container.childNodes[index];
      const target = itemMap.get(key).node;

      if (current !== target) {
        container.insertBefore(target, current);
      }
    });

    prevItems = newItems;
  });

  function getKey(item, index) {
    return item.key ?? item.id ?? index;
  }

  function createItemEntry(item, index) {
    let node = null;
    // Create new version with tracked dependencies
    const vdom = children(item);
    node = createDom(vdom);
    // Add to temporary fragment
    const temp = document.createDocumentFragment();
    temp.appendChild(node);
    container.insertBefore(temp, container.childNodes[index]);

    return {
      node,
      disposer: () => {},
      item,
    };
  }

  function updateItem(entry, newItem) {
    if (entry.item !== newItem) {
      entry.disposer();
      const key = getKey(newItem, entry.index);
      const newEntry = createItemEntry(newItem, key);
      itemMap.set(key, newEntry);
      entry.node.replaceWith(newEntry.node);
    }
  }

  return container;
}
