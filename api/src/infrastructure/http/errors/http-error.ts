export interface HttpErrorIssue {
  field: string;
  message: string;
}

export interface HttpError {
  error: {
    code: string;
    message: string;
    issues?: HttpErrorIssue[];
  };
}

export function httpError(code: string, message: string): HttpError {
  return {
    error: {
      code,
      message,
    },
  };
}

export function httpValidationError(
  code: string,
  message: string,
  issues: HttpErrorIssue[],
): HttpError {
  return {
    error: {
      code,
      message,
      issues,
    },
  };
}
