import { randomBytes } from "node:crypto";
import { Router } from "express";
import {
  clearAuthCookies,
  requireAuth,
  setAuthCookies,
  userFromRefreshToken,
  verifyPassword,
} from "../auth.js";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from "../config.js";
import { createUser, findUserByEmail, updateUser } from "../db.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const user = findUserByEmail(email);
  if (!user || !verifyPassword(String(password ?? ""), user.passwordHash)) {
    res
      .status(401)
      .json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    return;
  }
  setAuthCookies(res, user);
  res.sendStatus(200);
});

router.delete("/logout", requireAuth, (req, res) => {
  clearAuthCookies(res);
  res.sendStatus(200);
});

router.post("/token/refresh", (req, res) => {
  const user = userFromRefreshToken(req);
  if (!user) {
    res.status(401).json({ message: "Refresh Token이 올바르지 않습니다." });
    return;
  }
  setAuthCookies(res, user);
  res.sendStatus(200);
});

router.get("/google", (req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    res
      .status(500)
      .send(
        "server/.env에 GOOGLE_CLIENT_ID와 GOOGLE_CLIENT_SECRET을 설정해 주세요.",
      );
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
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    state,
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

router.get("/google/callback", async (req, res) => {
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
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
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

  let user = findUserByEmail(profile.email);
  if (!user) {
    user = createUser({
      email: profile.email,
      name: profile.name,
      avatar: profile.picture ?? null,
      googleId: profile.id,
    });
  } else if (!user.googleId) {
    updateUser(user, { googleId: profile.id });
  }

  setAuthCookies(res, user);
  res.redirect("/");
});

export default router;
