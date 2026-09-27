import { CreateTopicUseCase } from '@/application/usecases/create-topic';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { CreateTopicController } from '@/infrastructure/http/controllers/create-topic-controller';

export function makeCreateTopicController(
  topicRepository: TopicRepository,
) {
  const useCase = new CreateTopicUseCase(topicRepository);
  const controller = new CreateTopicController(useCase);

  return controller;
}