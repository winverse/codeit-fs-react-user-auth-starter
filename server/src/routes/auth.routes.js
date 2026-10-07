import { randomBytes } from "node:crypto";
import express from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "#constants";
import { UnauthorizedException } from "#errors";
import { authMiddleware, validate } from "#middlewares";
import { usersRepository } from "#repository";
import {
  clearAuthCookies,
  clearGoogleStateCookie,
  comparePassword,
  createGoogleAuthUrl,
  generateTokens,
  getGoogleAccessToken,
  getGoogleProfile,
  setAuthCookies,
  setGoogleStateCookie,
  verifyToken,
} from "#utils";
import { loginSchema } from "./auth.schemas.js";

export const authRouter = express.Router();

// POST /api/auth/login - 로그인
authRouter.post("/login", validate("body", loginSchema), async (req, res) => {
  const { email, password } = req.validated.body;
  const user = await usersRepository.findByEmail(email);

  if (!user) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  setAuthCookies(res, generateTokens(user));
  const { password: _password, googleId: _googleId, ...publicUser } = user;
  return res.status(HTTP_STATUS.OK).json(publicUser);
});

// DELETE /api/auth/logout - 로그아웃
authRouter.delete("/logout", authMiddleware, (_req, res) => {
  clearAuthCookies(res);
  return res.sendStatus(HTTP_STATUS.OK);
});

// POST /api/auth/token/refresh - Refresh Token으로 두 토큰 다시 발급
authRouter.post("/token/refresh", async (req, res) => {
  const payload = verifyToken(req.cookies["refresh-token"], "refresh");

  if (!payload) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
  }

  const user = await usersRepository.findById(payload.userId);

  if (!user) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
  }

  setAuthCookies(res, generateTokens(user));
  return res.sendStatus(HTTP_STATUS.OK);
});

// GET /api/auth/google - 구글 로그인 화면으로 보내기
authRouter.get("/google", (_req, res) => {
  const state = randomBytes(16).toString("hex");
  setGoogleStateCookie(res, state);
  return res.redirect(createGoogleAuthUrl(state));
});

// GET /api/auth/google/callback - 구글이 보낸 인증 코드로 로그인
authRouter.get("/google/callback", async (req, res) => {
  const { code, state } = req.query;
  const savedState = req.cookies["google-oauth-state"];
  clearGoogleStateCookie(res);

  if (!code || !state || state !== savedState) {
    return res.redirect("/login");
  }

  const googleAccessToken = await getGoogleAccessToken(code);

  if (!googleAccessToken) {
    return res.redirect("/login");
  }

  const profile = await getGoogleProfile(googleAccessToken);

  if (!profile) {
    return res.redirect("/login");
  }

  // 구글 계정의 이메일로 이미 가입한 유저가 있는지 찾기
  let user = await usersRepository.findByEmail(profile.email);

  if (!user) {
    // 처음 보는 이메일이면 구글 프로필로 새 유저 만들기(비밀번호 없이 구글로만 로그인)
    user = await usersRepository.create({
      email: profile.email,
      name: profile.name,
      avatar: profile.picture ?? null,
      googleId: profile.id,
    });
  } else if (!user.googleId) {
    // 이메일·비밀번호로 가입한 유저면 구글 계정을 연결해 구글로도 로그인할 수 있게 하기
    await usersRepository.update(user.id, { googleId: profile.id });
  }

  setAuthCookies(res, generateTokens(user));
  return res.redirect("/");
});
