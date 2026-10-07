import { z } from "zod";
import { ERROR_MESSAGES } from "#constants";

export const loginSchema = z.object(
  {
    email: z
      .string({ error: ERROR_MESSAGES.LOGIN_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.LOGIN_FIELDS_REQUIRED),
    password: z
      .string({ error: ERROR_MESSAGES.LOGIN_FIELDS_REQUIRED })
      .min(1, ERROR_MESSAGES.LOGIN_FIELDS_REQUIRED),
  },
  { error: ERROR_MESSAGES.LOGIN_FIELDS_REQUIRED },
);
