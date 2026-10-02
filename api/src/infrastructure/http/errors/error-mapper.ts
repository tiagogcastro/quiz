import { QuizApplicationError } from '@/application/errors/quiz-errors';
import { TopicApplicationError } from '@/application/errors/topic-errors';
import { QuestionError } from '@/domain/errors/question-errors';
import { QuizError } from '@/domain/errors/quiz-errors';
import { HttpError, httpError } from '@/infrastructure/http/errors/http-error';

type MappedError = TopicApplicationError | QuizApplicationError | QuestionError | QuizError;

const errors: Record<MappedError, { statusCode: number; message: string }> = {
  INVALID_TOPIC_NAME: { statusCode: 400, message: 'Invalid topic name' },
  TOPIC_NOT_FOUND: { statusCode: 404, message: 'Topic not found' },
  QUIZ_NOT_FOUND: { statusCode: 404, message: 'Quiz not found' },
  INVALID_QUESTION_STATEMENT: { statusCode: 400, message: 'Invalid question statement' },
  NOT_ENOUGH_ALTERNATIVES: { statusCode: 400, message: 'At least two alternatives are required' },
  INVALID_CORRECT_ALTERNATIVES: { statusCode: 400, message: 'Question must have exactly one correct alternative' },
  QUESTION_ALREADY_EXISTS: { statusCode: 409, message: 'Question already exists' },
};

export function mapError(code: MappedError): { statusCode: number; body: HttpError } {
  return {
    statusCode: errors[code].statusCode,
    body: httpError(code, errors[code].message),
  };
}
