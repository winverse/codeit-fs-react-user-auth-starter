import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve("data");
const DB_FILE = path.join(DATA_DIR, "db.json");

function load() {
  if (!existsSync(DB_FILE)) {
    return { nextUserId: 1, nextLinkId: 1, users: [], links: [] };
  }
  return JSON.parse(readFileSync(DB_FILE, "utf-8"));
}

export const db = load();

export function save() {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function now() {
  return Math.floor(Date.now() / 1000);
}

export function toPublicUser(user) {
  const { passwordHash, googleId, ...rest } = user;
  return rest;
}

export function findUserById(id) {
  return db.users.find((user) => user.id === Number(id));
}

export function findUserByEmail(email) {
  return db.users.find((user) => user.email === email);
}

export function createUser({
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

export function updateUser(user, values) {
  Object.assign(user, values, { updatedAt: now() });
  save();
  return user;
}

export function findLinks(userId) {
  return db.links.filter((link) => link.userId === Number(userId));
}

export function findLink(userId, linkId) {
  return db.links.find(
    (link) => link.userId === Number(userId) && link.id === Number(linkId),
  );
}

export function createLink(userId, { title, url }) {
  const link = {
    id: db.nextLinkId++,
    userId: Number(userId),
    title,
    url,
    thumbUrl: null,
    createdAt: now(),
    updatedAt: now(),
  };
  db.links.push(link);
  save();
  return link;
}

export function updateLink(link, values) {
  Object.assign(link, values, { updatedAt: now() });
  save();
  return link;
}

export function deleteLink(link) {
  db.links = db.links.filter((item) => item !== link);
  save();
}

export function toPublicLink(link) {
  const { userId, ...rest } = link;
  return rest;
}
