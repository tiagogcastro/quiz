import { Question } from '@/domain/entities/question';
import { Result } from '@/shared/result';

interface QuizProps {
  id: string;
  topicId: string;
  title: string;
  questions: Question[];
}

export type AddQuestionError = "QUESTION_ALREADY_EXISTS";

export class Quiz {
  private constructor(private props: QuizProps) { }

  static create(props: QuizProps): Quiz {
    return new Quiz(props);
  }

  addQuestion(question: Question): Result<void, AddQuestionError> {
    const questionAlreadyExists = this.props.questions.some(item => question.id === item.id);

    if (questionAlreadyExists) {
      return {
        error: 'QUESTION_ALREADY_EXISTS',
      }
    }

    this.props.questions.push(question);

    return {
      data: undefined,
    }
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