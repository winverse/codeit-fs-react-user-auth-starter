import { flattenError, z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1000).max(65535).default(3001),
  CLIENT_ORIGIN: z.url().default("http://localhost:3000"),
  SERVER_URL: z.url().optional(),
  JWT_SECRET: z.string().min(1).default("local-development-secret"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      PORT: process.env.PORT,
      CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
      SERVER_URL: process.env.SERVER_URL,
      JWT_SECRET: process.env.JWT_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("환경 변수 검증 실패:", flattenError(error));
    }
    throw error;
  }
};

const env = parseEnvironment();

export const config = {
  ...env,
  SERVER_URL: env.SERVER_URL ?? `http://localhost:${env.PORT}`,
  GOOGLE_REDIRECT_URI: `${env.CLIENT_ORIGIN}/api/auth/google/callback`,
};
