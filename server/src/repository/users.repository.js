import { db, now, save } from "#db/json-db.js";

function toPublicUser(user) {
  const { password: _password, googleId: _googleId, ...publicUser } = user;
  return publicUser;
}

function findStoredUser(userId) {
  return db.users.find((user) => user.id === Number(userId));
}

async function findById(userId) {
  const user = findStoredUser(userId);
  return user ? toPublicUser(user) : null;
}

async function findByEmail(email) {
  // 로그인 비교와 구글 계정 연결에 쓰므로 비밀번호 해시와 구글 계정 ID까지 돌려줌
  return db.users.find((user) => user.email === email) ?? null;
}

async function create({
  email,
  name,
  password = null,
  googleId = null,
  avatar = null,
  bio = null,
}) {
  const user = {
    id: db.nextUserId++,
    email,
    name,
    avatar,
    bio,
    password,
    googleId,
    createdAt: now(),
    updatedAt: now(),
  };
  db.users.push(user);
  save();
  return toPublicUser(user);
}

async function update(userId, data) {
  const user = findStoredUser(userId);
  Object.assign(user, data, { updatedAt: now() });
  save();
  return toPublicUser(user);
}

export const usersRepository = {
  findById,
  findByEmail,
  create,
  update,
};
