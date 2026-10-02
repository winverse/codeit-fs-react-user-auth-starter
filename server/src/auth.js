import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_MAX_AGE,
  JWT_SECRET,
  REFRESH_TOKEN_MAX_AGE,
} from "./config.js";
import { findUserById } from "./db.js";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, passwordHash) {
  if (!passwordHash) {
    return false;
  }
  const [salt, hash] = passwordHash.split(":");
  const input = scryptSync(password, salt, 64);
  return timingSafeEqual(input, Buffer.from(hash, "hex"));
}

const ACCESS_COOKIE = {
  httpOnly: true,
  sameSite: "lax",
  path: "/api",
};

const REFRESH_COOKIE = {
  httpOnly: true,
  sameSite: "lax",
  path: "/api/auth",
};

export function setAuthCookies(res, user) {
  const accessToken = jwt.sign({ sub: user.id, type: "access" }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_MAX_AGE / 1000,
  });
  const refreshToken = jwt.sign({ sub: user.id, type: "refresh" }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_MAX_AGE / 1000,
  });
  res.cookie("access-token", accessToken, {
    ...ACCESS_COOKIE,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  res.cookie("refresh-token", refreshToken, {
    ...REFRESH_COOKIE,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export function clearAuthCookies(res) {
  res.clearCookie("access-token", ACCESS_COOKIE);
  res.clearCookie("refresh-token", REFRESH_COOKIE);
}

function verify(token, type) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.type !== type) {
      return null;
    }
    return findUserById(payload.sub) ?? null;
  } catch {
    return null;
  }
}

export function userFromRefreshToken(req) {
  return verify(req.cookies["refresh-token"], "refresh");
}

export function requireAuth(req, res, next) {
  const user = verify(req.cookies["access-token"], "access");
  if (!user) {
    res.status(401).json({ message: "인증이 필요합니다." });
    return;
  }
  req.user = user;
  next();
}
