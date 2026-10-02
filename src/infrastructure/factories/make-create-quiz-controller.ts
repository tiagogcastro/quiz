import { CreateQuizUseCase } from '@/application/usecases/create-quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { CreateQuizController } from '@/infrastructure/http/controllers/create-quiz-controller';

export function makeCreateQuizController(
  topicRepository: TopicRepository,
  quizRepository: QuizRepository,
): CreateQuizController {
  const useCase = new CreateQuizUseCase(topicRepository, quizRepository);
  const controller = new CreateQuizController(useCase);

  return controller;
}
