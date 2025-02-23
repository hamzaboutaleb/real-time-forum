import { createDom } from "./createDom.js";

export function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

export function render(element, continer) {
  continer.appendChild(createDom(element));
}
