import { config } from "#config";
import { ERROR_MESSAGES, HTTP_STATUS } from "#constants";

const allowedOrigins = [config.CLIENT_ORIGIN];

export const corsMiddleware = (req, res, next) => {
  const origin = req.get("Origin");
  res.vary("Origin");

  if (!origin) {
    return next();
  }

  if (!allowedOrigins.includes(origin)) {
    return res
      .status(HTTP_STATUS.FORBIDDEN)
      .json({ message: ERROR_MESSAGES.ORIGIN_NOT_ALLOWED });
  }

  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(HTTP_STATUS.NO_CONTENT);
  }

  return next();
};
