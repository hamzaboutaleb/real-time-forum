import { createDom } from "./createDom.js";

export function h(type, props, ...children) {
  return { type, props, children };
}

export function render(element, continer) {
  continer.appendChild(createDom(element));
}
