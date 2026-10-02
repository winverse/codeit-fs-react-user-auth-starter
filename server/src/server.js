import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { CLIENT_ORIGIN, PORT } from "./config.js";
import authRouter from "./routes/auth.js";
import usersRouter, { UPLOAD_DIR } from "./routes/users.js";

const app = express();

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("OK");
});
app.use("/api/uploads", express.static(UPLOAD_DIR));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류가 발생했습니다." });
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
