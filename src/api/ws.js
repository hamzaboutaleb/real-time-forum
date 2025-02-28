import { batch, untrack } from "../../core/signal.js";
import { gMessages, typing, users } from "../state.js";
import { handleLogout } from "../utils/logout.js";
import { WS, WS_EVENTS } from "../utils/ws.js";

const WS_URL = "ws://localhost:8000/ws";

export const ws = new WS(WS_URL);

ws.on("online", (data, socket) => {
  users.value = users.value.map((user) => {
    const exist = data.id.find((u) => {
      return u === user.id;
    });
    if (exist) {
      return {
        ...user,
        online: true,
      };
    }
    return user;
  });
});

ws.on("offline", (data, socket) => {
  console.log("offline", data);
  users.value = users.value.map((user) => {
    if (data.id === user.id) {
      return {
        ...user,
        online: false,
      };
    }
    return user;
  });
  console.log(users.value);
});

ws.on("typing", (data) => {
  console.log("typing", data);
  const typingSet = new Set(typing.value);
  typingSet.add(data.typerId);
  typing.value = typingSet;
});
/*
{
    "message": "hamza",
    "receiver": 1,
    "sender": 2
}
     {
    "msg_id": 2,
    "sender_id": 1,
    "receiver_id": 2,
    "data": "eazeaz",
    "timestamp": "2025-02-28T18:17:40Z"
}
*/
ws.on("message", (data) => {
  console.log("message", data);
  const { message, receiver, sender } = data;
  if (sender === gMessages.chatId) {
    gMessages.messages.value = [
      ...gMessages.messages.value,
      {
        sender_id: sender,
        data: message,
        receiver_id: receiver,
        timestamp: new Date().toISOString(),},
    ];
  }
});
