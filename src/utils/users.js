
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
  return usersList;
}