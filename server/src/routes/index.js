import express from "express";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./users.routes.js";

export const router = express.Router();

// GET /api - 서버 실행 확인
router.get("/", (_req, res) => {
  return res.send("OK");
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
