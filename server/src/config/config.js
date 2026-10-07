import { flattenError, z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().min(1000).max(65535).default(3001),
  CLIENT_ORIGIN: z.url().default("http://localhost:3000"),
  SERVER_URL: z.url().optional(),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32)
    .default("local-development-access-token-secret"),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32)
    .default("local-development-refresh-token-secret"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
      SERVER_URL: process.env.SERVER_URL,
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
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

export const config = parseEnvironment();

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
export const isTest = config.NODE_ENV === "test";
