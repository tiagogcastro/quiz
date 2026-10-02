import { AddQuestionUseCase } from '@/application/usecases/add-question';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { AddQuestionController } from '@/infrastructure/http/controllers/add-question-controller';

export function makeAddQuestionController(
  quizRepository: QuizRepository,
): AddQuestionController {
  const useCase = new AddQuestionUseCase(quizRepository);
  const controller = new AddQuestionController(useCase);

  return controller;
}
