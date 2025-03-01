import { users } from "../state.js";

export function initUsers(users, username) {
  const usersList = [];
  users.forEach((user) => {
    if (user.username !== username) {
      usersList.push({
        ...user,
        online: false,
      });
    }
  });
  return sortUsers(usersList);
}

export function sortUsers(users) {
  return users.toSorted((a, b) => {
    if (a.last_message_time === b.last_message_time) {
      return a.username.localeCompare(b.username);
    }
    return new Date(b.last_message_time) - new Date(a.last_message_time);
  });
}

export function updateUserLastTimeMessage(usersId, newDate) {
  console.log(usersId);
  const newData = users.value.map((user) => {
    if (usersId.includes(user.id)) {
      return {
        ...user,
        last_message_time: newDate,
      };
    }
    return user;
  });
  updateUser(newData);
}

export function updateUser(newData) {
  newData = sortUsers(newData);
  users.value = newData;
}
