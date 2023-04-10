async function _registerNewUser(users: User[], user: User): Promise<User> {
  return await new Promise((resolve, reject) => {
    const exist = users.filter((user_db) => user_db.email === user.email);

    if (exist.length > 0) {
      reject(new Error("Email already used."));
      return;
    }

    users.push({
      ...user,
      avatar: "https://generated-image-url.jpg",
      id: `user-${new Date().getMilliseconds()}`,
    });
    resolve(user);
  });
}

export { _registerNewUser };
