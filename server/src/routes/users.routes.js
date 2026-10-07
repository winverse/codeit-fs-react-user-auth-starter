import express from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "#constants";
import { ConflictException, NotFoundException } from "#errors";
import { authMiddleware, upload, validate } from "#middlewares";
import { linksRepository, usersRepository } from "#repository";
import { hashPassword, toAvatarUrl } from "#utils";
import {
  createLinkSchema,
  linkIdParamSchema,
  signUpSchema,
  updateLinkSchema,
  updateUserSchema,
} from "./users.schemas.js";

export const userRouter = express.Router();

// POST /api/users - 회원가입
userRouter.post(
  "/",
  upload.single("avatar"),
  validate("body", signUpSchema),
  async (req, res) => {
    const { email, name, password, bio } = req.validated.body;
    const sameEmailUser = await usersRepository.findByEmail(email);

    if (sameEmailUser) {
      throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
    }

    const hashedPassword = await hashPassword(password);
    const user = await usersRepository.create({
      email,
      name,
      password: hashedPassword,
      avatar: toAvatarUrl(req.file),
      bio,
    });
    return res.status(HTTP_STATUS.CREATED).json(user);
  },
);

// GET /api/users/me - 내 정보 조회
userRouter.get("/me", authMiddleware, async (req, res) => {
  const me = await usersRepository.findById(req.user.id);

  if (!me) {
    throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return res.json(me);
});

// PATCH /api/users/me - 내 정보 수정
userRouter.patch(
  "/me",
  authMiddleware,
  upload.single("avatar"),
  validate("body", updateUserSchema),
  async (req, res) => {
    const values = req.validated.body;
    const me = await usersRepository.findById(req.user.id);

    if (!me) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    if (values.email) {
      const sameEmailUser = await usersRepository.findByEmail(values.email);

      if (sameEmailUser && sameEmailUser.id !== me.id) {
        throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_IN_USE);
      }
    }

    if (req.file) {
      values.avatar = toAvatarUrl(req.file);
    }

    const updatedUser = await usersRepository.update(me.id, values);
    return res.json(updatedUser);
  },
);

// GET /api/users/me/links - 내 링크 목록 조회
userRouter.get("/me/links", authMiddleware, async (req, res) => {
  const links = await linksRepository.findAllByUserId(req.user.id);
  return res.json(links);
});

// GET /api/users/me/links/:linkId - 내 링크 하나 조회
userRouter.get("/me/links/:linkId", authMiddleware, async (req, res) => {
  const link = await linksRepository.findByIdAndUserId(
    req.params.linkId,
    req.user.id,
  );

  if (!link) {
    throw new NotFoundException(ERROR_MESSAGES.LINK_NOT_FOUND);
  }

  return res.json(link);
});

// POST /api/users/me/links - 링크 추가
userRouter.post(
  "/me/links",
  authMiddleware,
  validate("body", createLinkSchema),
  async (req, res) => {
    const link = await linksRepository.create(req.user.id, req.validated.body);
    return res.json(link);
  },
);

// PATCH /api/users/me/links/:linkId - 링크 수정
userRouter.patch(
  "/me/links/:linkId",
  authMiddleware,
  validate("params", linkIdParamSchema),
  validate("body", updateLinkSchema),
  async (req, res) => {
    const { linkId } = req.validated.params;
    const link = await linksRepository.findByIdAndUserId(linkId, req.user.id);

    if (!link) {
      throw new NotFoundException(ERROR_MESSAGES.LINK_NOT_FOUND);
    }

    const updatedLink = await linksRepository.update(
      linkId,
      req.validated.body,
    );
    return res.json(updatedLink);
  },
);

// DELETE /api/users/me/links/:linkId - 링크 삭제
userRouter.delete(
  "/me/links/:linkId",
  authMiddleware,
  validate("params", linkIdParamSchema),
  async (req, res) => {
    const { linkId } = req.validated.params;
    const link = await linksRepository.findByIdAndUserId(linkId, req.user.id);

    if (!link) {
      throw new NotFoundException(ERROR_MESSAGES.LINK_NOT_FOUND);
    }

    await linksRepository.remove(linkId);
    return res.sendStatus(HTTP_STATUS.NO_CONTENT);
  },
);

// GET /api/users/:userId - 다른 유저의 공개 정보 조회
userRouter.get("/:userId", async (req, res) => {
  const user = await usersRepository.findById(req.params.userId);

  if (!user) {
    throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  return res.json(user);
});

// GET /api/users/:userId/links - 다른 유저의 링크 목록 조회
userRouter.get("/:userId/links", async (req, res) => {
  const user = await usersRepository.findById(req.params.userId);

  if (!user) {
    throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const links = await linksRepository.findAllByUserId(user.id);
  return res.json(links);
});
