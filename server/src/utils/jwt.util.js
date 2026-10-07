import jwt from "jsonwebtoken";
import { config } from "#config";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "#constants";

export function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, config.JWT_ACCESS_SECRET, {
    algorithm: "HS256",
    expiresIn: ACCESS_TOKEN_MAX_AGE / 1000,
  });
}

export function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, config.JWT_REFRESH_SECRET, {
    algorithm: "HS256",
    expiresIn: REFRESH_TOKEN_MAX_AGE / 1000,
  });
}

export function generateTokens(user) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

export function verifyToken(token, tokenType = "access") {
  if (!token || !["access", "refresh"].includes(tokenType)) {
    return null;
  }

  const secret =
    tokenType === "access"
      ? config.JWT_ACCESS_SECRET
      : config.JWT_REFRESH_SECRET;

  try {
    return jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });
  } catch {
    return null;
  }
}
