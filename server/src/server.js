import express from "express";
import cookieParser from "cookie-parser";
import { config } from "#config";
import { ERROR_MESSAGES, UPLOAD_DIR } from "#constants";
import { NotFoundException } from "#errors";
import { corsMiddleware, errorHandler, logger } from "#middlewares";
import { router as apiRouter } from "./routes/index.js";

const app = express();

app.use(logger);
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api/uploads", express.static(UPLOAD_DIR));

app.use("/api", apiRouter);

app.use("/api", (_req, _res, next) => {
  next(new NotFoundException(ERROR_MESSAGES.ROUTE_NOT_FOUND));
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`서버가 http://localhost:${config.PORT}에서 실행 중입니다.`);
});
