import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { Router } from "express";
import multer from "multer";
import { hashPassword, requireAuth } from "../auth.js";
import { SERVER_URL } from "../config.js";
import {
  createLink,
  createUser,
  deleteLink,
  findLink,
  findLinks,
  findUserByEmail,
  findUserById,
  toPublicLink,
  toPublicUser,
  updateLink,
  updateUser,
} from "../db.js";

export const UPLOAD_DIR = path.resolve("uploads");
mkdirSync(UPLOAD_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, callback) => {
      callback(null, `${randomUUID()}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

function avatarUrl(file) {
  return file ? `${SERVER_URL}/api/uploads/${file.filename}` : undefined;
}

function pick(body, keys) {
  return Object.fromEntries(
    keys
      .filter((key) => typeof body?.[key] === "string")
      .map((key) => [key, body[key]]),
  );
}

const router = Router();

router.post("/", upload.single("avatar"), (req, res) => {
  const { email, name, password, bio } = req.body ?? {};
  if (!email || !name || !password) {
    res.status(400).json({ message: "email, name, password는 필수입니다." });
    return;
  }
  if (findUserByEmail(email)) {
    res.status(409).json({ message: "이미 가입한 이메일입니다." });
    return;
  }
  const user = createUser({
    email,
    name,
    passwordHash: hashPassword(String(password)),
    avatar: avatarUrl(req.file) ?? null,
  });
  if (bio) {
    updateUser(user, { bio });
  }
  res.status(201).json(toPublicUser(user));
});

router.get("/me", requireAuth, (req, res) => {
  res.json(toPublicUser(req.user));
});

router.patch("/me", requireAuth, upload.single("avatar"), (req, res) => {
  const values = pick(req.body, ["email", "name", "bio"]);
  if (values.email !== undefined && values.email.trim() === "") {
    res.status(400).json({ message: "이메일을 입력해 주세요." });
    return;
  }
  if (values.name !== undefined && values.name.trim() === "") {
    res.status(400).json({ message: "이름을 입력해 주세요." });
    return;
  }
  const sameEmailUser = values.email && findUserByEmail(values.email);
  if (sameEmailUser && sameEmailUser.id !== req.user.id) {
    res.status(409).json({ message: "이미 가입한 이메일입니다." });
    return;
  }
  if (req.file) {
    values.avatar = avatarUrl(req.file);
  }
  res.json(toPublicUser(updateUser(req.user, values)));
});

router.get("/me/links", requireAuth, (req, res) => {
  res.json(findLinks(req.user.id).map(toPublicLink));
});

router.get("/me/links/:id", requireAuth, (req, res) => {
  const link = findLink(req.user.id, req.params.id);
  if (!link) {
    res.status(404).json({ message: "링크를 찾을 수 없습니다." });
    return;
  }
  res.json(toPublicLink(link));
});

router.post("/me/links", requireAuth, (req, res) => {
  const { title, url } = req.body ?? {};
  if (!title || !url) {
    res.status(400).json({ message: "title, url은 필수입니다." });
    return;
  }
  res.json(toPublicLink(createLink(req.user.id, { title, url })));
});

router.patch("/me/links/:id", requireAuth, (req, res) => {
  const link = findLink(req.user.id, req.params.id);
  if (!link) {
    res.status(404).json({ message: "링크를 찾을 수 없습니다." });
    return;
  }
  res.json(toPublicLink(updateLink(link, pick(req.body, ["title", "url"]))));
});

router.delete("/me/links/:id", requireAuth, (req, res) => {
  const link = findLink(req.user.id, req.params.id);
  if (!link) {
    res.status(404).json({ message: "링크를 찾을 수 없습니다." });
    return;
  }
  deleteLink(link);
  res.sendStatus(204);
});

router.get("/:id", (req, res) => {
  const user = findUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    return;
  }
  res.json(toPublicUser(user));
});

router.get("/:id/links", (req, res) => {
  if (!findUserById(req.params.id)) {
    res.status(404).json({ message: "유저를 찾을 수 없습니다." });
    return;
  }
  res.json(findLinks(req.params.id).map(toPublicLink));
});

export default router;
