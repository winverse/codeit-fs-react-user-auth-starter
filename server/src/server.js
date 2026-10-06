import cookieParser from "cookie-parser";
import express from "express";
import { config } from "#config";
import { corsMiddleware, errorHandler, logger } from "#middlewares";
import { router as apiRouter } from "./routes/index.js";

const app = express();

app.use(logger);
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`서버가 http://localhost:${config.PORT}에서 실행 중입니다.`);
});
