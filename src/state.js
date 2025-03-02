import { createSignal } from "../core/index.js";

export const isAuth = createSignal(false);
export const username = createSignal("");
export const users = createSignal([]);
export const typing = createSignal(new Set());
export const userId = createSignal(-1);
export let gMessages = {};
export const scrollEl = {};

export function setGlobalMessages(messages, chatId) {
  gMessages = {
    ...gMessages,
    messages,
    chatId,
  };
}

export function getGlobalMessages() {
  return gMessages;
}
