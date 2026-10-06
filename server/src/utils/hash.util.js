import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function comparePassword(password, passwordHash) {
  if (!passwordHash) {
    return false;
  }
  const [salt, hash] = passwordHash.split(":");
  const input = scryptSync(password, salt, 64);
  return timingSafeEqual(input, Buffer.from(hash, "hex"));
}
