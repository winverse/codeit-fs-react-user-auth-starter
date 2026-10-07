import { config } from "#config";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "#constants";

const accessCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api",
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
};

const googleStateCookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth/google",
};

export function setAuthCookies(res, { accessToken, refreshToken }) {
  res.cookie("access-token", accessToken, {
    ...accessCookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  res.cookie("refresh-token", refreshToken, {
    ...refreshCookieOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export function clearAuthCookies(res) {
  res.clearCookie("access-token", accessCookieOptions);
  res.clearCookie("refresh-token", refreshCookieOptions);
}

export function setGoogleStateCookie(res, state) {
  res.cookie("google-oauth-state", state, {
    ...googleStateCookieOptions,
    maxAge: 10 * 60 * 1000, // 10분
  });
}

export function clearGoogleStateCookie(res) {
  res.clearCookie("google-oauth-state", googleStateCookieOptions);
}
