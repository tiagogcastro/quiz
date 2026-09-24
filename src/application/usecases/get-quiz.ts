import { Quiz } from '@/domain/entities/quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { Result } from '@/shared/result';

interface GetQuizInput {
  quizId: string;
}

type GetQuizError = 'QUIZ_NOT_FOUND';

export class GetQuizUseCase {
  constructor(private readonly quizRepository: QuizRepository) { }

  async execute(input: GetQuizInput): Promise<Result<Quiz, GetQuizError>> {
    const quiz = await this.quizRepository.findById(input.quizId);

    if (!quiz) {
      return {
        error: 'QUIZ_NOT_FOUND',
      }
    }

    return {
      data: quiz,
    }
  }
}