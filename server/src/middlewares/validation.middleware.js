import { BadRequestException } from "#errors";

export function validate(target, schema) {
  if (!["body", "params", "query"].includes(target)) {
    throw new Error(`지원하지 않는 검증 대상입니다: ${target}`);
  }

  return (req, _res, next) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const [firstIssue] = result.error.issues;
      throw new BadRequestException(firstIssue.message);
    }

    req.validated = {
      ...req.validated,
      [target]: result.data,
    };
    return next();
  };
}
