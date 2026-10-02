import { TopicRepository } from '@/domain/repositories/topic-repository';
import { makeCreateTopicController } from '@/infrastructure/factories/make-create-topic-controller';
import { makeListTopicsController } from '@/infrastructure/factories/make-list-topics-controller';
import { CreateTopicBody } from '@/infrastructure/http/schemas/create-topic-schema';
import { FastifyInstance } from 'fastify';

interface TopicRoutesOptions {
  topicRepository: TopicRepository;
}

export async function topicRoutes(
  app: FastifyInstance,
  options: TopicRoutesOptions,
): Promise<void> {
  const createTopicController = makeCreateTopicController(options.topicRepository);
  const listTopicsController = makeListTopicsController(options.topicRepository);

  app.post<{ Body: CreateTopicBody }>('/create-topic', (request, reply) => {
    return createTopicController.handle(request, reply);
  });

  app.get('/list-topics', (request, reply) => {
    return listTopicsController.handle(request, reply);
  });
}
