import { ERROR_MESSAGES, HTTP_STATUS } from "#constants";
import { HttpException } from "#errors";

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MESSAGES.INVALID_JSON });
  }

  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
};
