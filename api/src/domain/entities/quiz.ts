import { Question } from '@/domain/entities/question';
import { QuizError } from '@/domain/errors/quiz-errors';
import { Result } from '@/shared/result';

interface QuizProps {
  id: string;
  topicId: string;
  title: string;
  questions: Question[];
}

export class Quiz {
  private constructor(private readonly props: QuizProps) {}

  static create(props: QuizProps): Quiz {
    return new Quiz({ ...props, questions: [...props.questions] });
  }

  addQuestion(question: Question): Result<void, QuizError> {
    if (this.props.questions.some((item) => question.id === item.id)) {
      return {
        error: 'QUESTION_ALREADY_EXISTS',
      };
    }

    this.props.questions.push(question);

    return {
      data: undefined,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get topicId(): string {
    return this.props.topicId;
  }

  get title(): string {
    return this.props.title;
  }

  get questions(): Question[] {
    return [...this.props.questions];
  }
}
