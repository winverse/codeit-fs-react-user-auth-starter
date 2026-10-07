import { z } from "zod";
import { ERROR_MESSAGES } from "#constants";

function isNotBlank(value) {
  return value.trim() !== "";
}

function toNullIfBlank(value) {
  return isNotBlank(value) ? value : null;
}

export const signUpSchema = z.object(
  {
    email: z
      .string({ error: ERROR_MESSAGES.USER_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.USER_FIELDS_REQUIRED),
    name: z
      .string({ error: ERROR_MESSAGES.USER_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.USER_FIELDS_REQUIRED),
    password: z
      .string({ error: ERROR_MESSAGES.USER_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.USER_FIELDS_REQUIRED),
    bio: z.string().transform(toNullIfBlank).optional(),
  },
  { error: ERROR_MESSAGES.USER_FIELDS_REQUIRED },
);

export const updateUserSchema = z.object(
  {
    email: z
      .string({ error: ERROR_MESSAGES.EMAIL_REQUIRED })
      .refine(isNotBlank, ERROR_MESSAGES.EMAIL_REQUIRED)
      .optional(),
    name: z
      .string({ error: ERROR_MESSAGES.NAME_REQUIRED })
      .refine(isNotBlank, ERROR_MESSAGES.NAME_REQUIRED)
      .optional(),
    bio: z.string().transform(toNullIfBlank).optional(),
  },
  { error: ERROR_MESSAGES.REQUEST_BODY_REQUIRED },
);

export const linkIdParamSchema = z.object({
  linkId: z.coerce
    .number({ error: ERROR_MESSAGES.INVALID_LINK_ID })
    .int(ERROR_MESSAGES.INVALID_LINK_ID)
    .positive(ERROR_MESSAGES.INVALID_LINK_ID),
});

export const createLinkSchema = z.object(
  {
    title: z
      .string({ error: ERROR_MESSAGES.LINK_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.LINK_FIELDS_REQUIRED),
    url: z
      .string({ error: ERROR_MESSAGES.LINK_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.LINK_FIELDS_REQUIRED),
  },
  { error: ERROR_MESSAGES.LINK_FIELDS_REQUIRED },
);

export const updateLinkSchema = z.object(
  {
    title: z.string().optional(),
    url: z.string().optional(),
  },
  { error: ERROR_MESSAGES.REQUEST_BODY_REQUIRED },
);
