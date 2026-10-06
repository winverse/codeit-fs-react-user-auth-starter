import express from "express";
import { UPLOAD_DIR } from "#middlewares";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./users.routes.js";

export const router = express.Router();

router.get("/", (_req, res) => {
  res.send("OK");
});

router.use("/uploads", express.static(UPLOAD_DIR));
router.use("/auth", authRouter);
router.use("/users", userRouter);
