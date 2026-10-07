import bcrypt from "bcrypt";

const BCRYPT_COST = 10;

export function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_COST);
}

export async function comparePassword(password, passwordHash) {
  try {
    return await bcrypt.compare(password, passwordHash);
  } catch {
    return false;
  }
}
