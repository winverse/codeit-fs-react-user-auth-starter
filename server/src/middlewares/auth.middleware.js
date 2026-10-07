import { ERROR_MESSAGES } from "#constants";
import { UnauthorizedException } from "#errors";
import { verifyToken } from "#utils";

export async function authMiddleware(req, _res, next) {
  const payload = verifyToken(req.cookies["access-token"], "access");

  if (!payload || !Number.isInteger(payload.userId)) {
    throw new UnauthorizedException(ERROR_MESSAGES.ACCESS_TOKEN_REQUIRED);
  }

  req.user = { id: payload.userId };
  return next();
}
