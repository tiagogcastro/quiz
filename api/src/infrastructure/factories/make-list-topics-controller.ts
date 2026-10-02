import { ListTopicsUseCase } from '@/application/usecases/list-topics';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { ListTopicsController } from '@/infrastructure/http/controllers/list-topics-controller';

export function makeListTopicsController(
  topicRepository: TopicRepository,
): ListTopicsController {
  const useCase = new ListTopicsUseCase(topicRepository);
  const controller = new ListTopicsController(useCase);

  return controller;
}
