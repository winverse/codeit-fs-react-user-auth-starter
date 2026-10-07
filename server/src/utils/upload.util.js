import { config } from "#config";

const SERVER_URL = config.SERVER_URL ?? `http://localhost:${config.PORT}`;

export function toAvatarUrl(file) {
  return file ? `${SERVER_URL}/api/uploads/${file.filename}` : null;
}
