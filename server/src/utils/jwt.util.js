import jwt from "jsonwebtoken";
import { config } from "#config";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "#constants";

export function generateAccessToken(user) {
  return jwt.sign({ sub: user.id, type: "access" }, config.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_MAX_AGE / 1000,
  });
}

export function generateRefreshToken(user) {
  return jwt.sign({ sub: user.id, type: "refresh" }, config.JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_MAX_AGE / 1000,
  });
}

export function verifyToken(token, tokenType) {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET);
    if (payload.type !== tokenType) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
