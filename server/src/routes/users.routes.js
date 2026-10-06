import express from "express";
import { config } from "#config";
import { ERROR_MESSAGES, HTTP_STATUS } from "#constants";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "#errors";
import { authMiddleware, upload } from "#middlewares";
import { linksRepository, usersRepository } from "#repository";
import { hashPassword } from "#utils";

function avatarUrl(file) {
  return file ? `${config.SERVER_URL}/api/uploads/${file.filename}` : undefined;
}

function pick(body, keys) {
  return Object.fromEntries(
    keys
      .filter((key) => typeof body?.[key] === "string")
      .map((key) => [key, body[key]]),
  );
}

export const userRouter = express.Router();

userRouter.post("/", upload.single("avatar"), (req, res) => {
  const { email, name, password, bio } = req.body ?? {};
  if (!email || !name || !password) {
    throw new BadRequestException(ERROR_MESSAGES.USER_FIELDS_REQUIRED);
  }
  if (usersRepository.findUserByEmail(email)) {
    throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
  }
  const user = usersRepository.createUser({
    email,
    name,
    passwordHash: hashPassword(String(password)),
    avatar: avatarUrl(req.file) ?? null,
  });
  if (bio) {
    usersRepository.updateUser(user, { bio });
  }
  res.status(HTTP_STATUS.CREATED).json(usersRepository.toPublicUser(user));
});

userRouter.get("/me", authMiddleware, (req, res) => {
  res.json(usersRepository.toPublicUser(req.user));
});

userRouter.patch("/me", authMiddleware, upload.single("avatar"), (req, res) => {
  const values = pick(req.body, ["email", "name", "bio"]);
  if (values.email !== undefined && values.email.trim() === "") {
    throw new BadRequestException(ERROR_MESSAGES.EMAIL_REQUIRED);
  }
  if (values.name !== undefined && values.name.trim() === "") {
    throw new BadRequestException(ERROR_MESSAGES.NAME_REQUIRED);
  }
  const sameEmailUser =
    values.email && usersRepository.findUserByEmail(values.email);
  if (sameEmailUser && sameEmailUser.id !== req.user.id) {
    throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
  }
  if (req.file) {
    values.avatar = avatarUrl(req.file);
  }
  res.json(
    usersRepository.toPublicUser(usersRepository.updateUser(req.user, values)),
  );
});

userRouter.get("/me/links", authMiddleware, (req, res) => {
  res.json(
    linksRepository.findLinks(req.user.id).map(linksRepository.toPublicLink),
  );
});

userRouter.get("/me/links/:linkId", authMiddleware, (req, res) => {
  const link = linksRepository.findLink(req.user.id, req.params.linkId);
  if (!link) {
    throw new NotFoundException(ERROR_MESSAGES.LINK_NOT_FOUND);
  }
  res.json(linksRepository.toPublicLink(link));
});

userRouter.post("/me/links", authMiddleware, (req, res) => {
  const { title, url } = req.body ?? {};
  if (!title || !url) {
    throw new BadRequestException(ERROR_MESSAGES.LINK_FIELDS_REQUIRED);
  }
  res.json(
    linksRepository.toPublicLink(
      linksRepository.createLink(req.user.id, { title, url }),
    ),
  );
});

userRouter.patch("/me/links/:linkId", authMiddleware, (req, res) => {
  const link = linksRepository.findLink(req.user.id, req.params.linkId);
  if (!link) {
    throw new NotFoundException(ERROR_MESSAGES.LINK_NOT_FOUND);
  }
  res.json(
    linksRepository.toPublicLink(
      linksRepository.updateLink(link, pick(req.body, ["title", "url"])),
    ),
  );
});

userRouter.delete("/me/links/:linkId", authMiddleware, (req, res) => {
  const link = linksRepository.findLink(req.user.id, req.params.linkId);
  if (!link) {
    throw new NotFoundException(ERROR_MESSAGES.LINK_NOT_FOUND);
  }
  linksRepository.deleteLink(link);
  res.sendStatus(HTTP_STATUS.NO_CONTENT);
});

userRouter.get("/:userId", (req, res) => {
  const user = usersRepository.findUserById(req.params.userId);
  if (!user) {
    throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  res.json(usersRepository.toPublicUser(user));
});

userRouter.get("/:userId/links", (req, res) => {
  if (!usersRepository.findUserById(req.params.userId)) {
    throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
  }
  res.json(
    linksRepository
      .findLinks(req.params.userId)
      .map(linksRepository.toPublicLink),
  );
});
