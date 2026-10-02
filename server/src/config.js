export const PORT = Number(process.env.PORT ?? 3001);
export const SERVER_URL = process.env.SERVER_URL ?? `http://localhost:${PORT}`;
export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN ?? "http://localhost:3000";
export const JWT_SECRET = process.env.JWT_SECRET ?? "local-development-secret";

export const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 1000;
export const REFRESH_TOKEN_MAX_AGE = 14 * 24 * 60 * 60 * 1000;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = `${CLIENT_ORIGIN}/api/auth/google/callback`;
