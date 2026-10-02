import { HttpError, httpValidationError } from '@/infrastructure/http/errors/http-error';
import { ZodError } from 'zod';

export function zodError(error: ZodError, code: string, message: string): HttpError {
  return httpValidationError(
    code,
    message,
    error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  );
}
