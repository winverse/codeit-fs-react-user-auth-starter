import { randomBytes } from "node:crypto";
import express from "express";
import { config } from "#config";
import { ERROR_MESSAGES, HTTP_STATUS } from "#constants";
import { UnauthorizedException } from "#errors";
import { authMiddleware } from "#middlewares";
import { usersRepository } from "#repository";
import {
  clearAuthCookies,
  comparePassword,
  setAuthCookies,
  verifyToken,
} from "#utils";

export const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const user = usersRepository.findUserByEmail(email);
  if (!user || !comparePassword(String(password ?? ""), user.passwordHash)) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
  setAuthCookies(res, user);
  res.sendStatus(HTTP_STATUS.OK);
});

authRouter.delete("/logout", authMiddleware, (req, res) => {
  clearAuthCookies(res);
  res.sendStatus(HTTP_STATUS.OK);
});

authRouter.post("/token/refresh", (req, res) => {
  const payload = verifyToken(req.cookies["refresh-token"], "refresh");
  const user = payload && usersRepository.findUserById(payload.sub);
  if (!user) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
  }
  setAuthCookies(res, user);
  res.sendStatus(HTTP_STATUS.OK);
});

authRouter.get("/google", (req, res) => {
  if (!config.GOOGLE_CLIENT_ID || !config.GOOGLE_CLIENT_SECRET) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(ERROR_MESSAGES.GOOGLE_ENV_REQUIRED);
    return;
  }
  const state = randomBytes(16).toString("hex");
  res.cookie("google-oauth-state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/api/auth/google",
    maxAge: 10 * 60 * 1000,
  });
  const params = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID,
    redirect_uri: config.GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    state,
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

authRouter.get("/google/callback", async (req, res) => {
  const { code, state } = req.query;
  const savedState = req.cookies["google-oauth-state"];
  res.clearCookie("google-oauth-state", { path: "/api/auth/google" });
  if (!code || !state || state !== savedState) {
    res.redirect("/login");
    return;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: config.GOOGLE_CLIENT_ID,
      client_secret: config.GOOGLE_CLIENT_SECRET,
      redirect_uri: config.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenResponse.ok) {
    res.redirect("/login");
    return;
  }
  const { access_token: googleAccessToken } = await tokenResponse.json();

  const profileResponse = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${googleAccessToken}` } },
  );
  if (!profileResponse.ok) {
    res.redirect("/login");
    return;
  }
  const profile = await profileResponse.json();

  let user = usersRepository.findUserByEmail(profile.email);
  if (!user) {
    user = usersRepository.createUser({
      email: profile.email,
      name: profile.name,
      avatar: profile.picture ?? null,
      googleId: profile.id,
    });
  } else if (!user.googleId) {
    usersRepository.updateUser(user, { googleId: profile.id });
  }

  setAuthCookies(res, user);
  res.redirect("/");
});
