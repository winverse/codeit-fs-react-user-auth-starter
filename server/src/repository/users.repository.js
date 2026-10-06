import { db, now, save } from "#db/json-db.js";

function findUserById(userId) {
  return db.users.find((user) => user.id === Number(userId));
}

function findUserByEmail(email) {
  return db.users.find((user) => user.email === email);
}

function createUser({
  email,
  name,
  passwordHash = null,
  googleId = null,
  avatar = null,
}) {
  const user = {
    id: db.nextUserId++,
    email,
    name,
    avatar,
    bio: null,
    passwordHash,
    googleId,
    createdAt: now(),
    updatedAt: now(),
  };
  db.users.push(user);
  save();
  return user;
}

function updateUser(user, values) {
  Object.assign(user, values, { updatedAt: now() });
  save();
  return user;
}

function toPublicUser(user) {
  const { passwordHash, googleId, ...rest } = user;
  return rest;
}

export const usersRepository = {
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  toPublicUser,
};
