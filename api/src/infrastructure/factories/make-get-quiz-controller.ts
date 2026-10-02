import { GetQuizUseCase } from '@/application/usecases/get-quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { GetQuizController } from '@/infrastructure/http/controllers/get-quiz-controller';

export function makeGetQuizController(
  quizRepository: QuizRepository,
): GetQuizController {
  const useCase = new GetQuizUseCase(quizRepository);
  const controller = new GetQuizController(useCase);

  return controller;
}
