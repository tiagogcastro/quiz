import { Alternative } from '@/domain/entities/alternative';
import { QuestionError } from '@/domain/errors/question-errors';
import { Result } from '@/shared/result';

interface QuestionProps {
  id: string;
  statement: string;
  alternatives: Alternative[];
}

export class Question {
  private constructor(private readonly props: QuestionProps) {}

  static create(props: QuestionProps): Result<Question, QuestionError> {
    if (!props.statement.trim()) {
      return {
        error: 'INVALID_QUESTION_STATEMENT',
      };
    }

    if (props.alternatives.length < 2) {
      return {
        error: 'NOT_ENOUGH_ALTERNATIVES',
      };
    }

    if (props.alternatives.filter((alternative) => alternative.isCorrect).length !== 1) {
      return {
        error: 'INVALID_CORRECT_ALTERNATIVES',
      };
    }

    return {
      data: new Question({ ...props, alternatives: [...props.alternatives] }),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get statement(): string {
    return this.props.statement;
  }

  get alternatives(): Alternative[] {
    return [...this.props.alternatives];
  }
}
