import { ERROR_MESSAGES } from "#constants";
import { UnauthorizedException } from "#errors";
import { usersRepository } from "#repository";
import { verifyToken } from "#utils";

export const authMiddleware = (req, _res, next) => {
  const payload = verifyToken(req.cookies["access-token"], "access");
  const user = payload && usersRepository.findUserById(payload.sub);
  if (!user) {
    throw new UnauthorizedException(ERROR_MESSAGES.AUTH_REQUIRED);
  }
  req.user = user;
  next();
};
