import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "#constants";
import { generateAccessToken, generateRefreshToken } from "./jwt.util.js";

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
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
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
