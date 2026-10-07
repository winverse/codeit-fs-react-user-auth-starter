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

export function now() {
  return Math.floor(Date.now() / 1000); // 초 단위 Unix 시각
}
