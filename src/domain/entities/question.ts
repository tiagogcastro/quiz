import { Alternative } from '@/domain/entities/alternative';
import { Result } from '@/shared/result';

interface QuestionProps {
  id: string;
  statement: string;
  alternatives: Alternative[];
}

export type CreateQuestionError = "EMPTY_STATEMENT" | "NOT_ENGOUCH_ALTERNATIVES" | "INVALID_CORRECT_ALTERNATIVES";

export class Question {
  private constructor(private props: QuestionProps) { }

  static create(props: QuestionProps): Result<Question, CreateQuestionError> {
    if (!props.statement.trim()) {
      return {
        error: "EMPTY_STATEMENT",
      }
    }

    if (props.alternatives.length < 2) {
      return {
        error: "NOT_ENGOUCH_ALTERNATIVES",
      }
    }

    const correctAlternatives = props.alternatives.filter(alternative => alternative.isCorrect);

    if (correctAlternatives.length !== 1) {
      return {
        error: "INVALID_CORRECT_ALTERNATIVES",
      }
    }

    return {
      data: new Question(props),
    }
  }

  get id(): string {
    return this.props.id;
  }

  get statement(): string {
    return this.props.statement;
  }

  get alternatives(): Alternative[] {
    return this.props.alternatives;
  }
}