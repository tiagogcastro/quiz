import { TopicRepository } from '@/domain/repositories/topic-repository';
import { makeCreateTopicController } from '@/infrastructure/factories/make-create-topic-controller';
import { FastifyInstance } from 'fastify';

interface TopicRoutesOptions {
  topicRepository: TopicRepository;
}

export async function topicRoutes(
  app: FastifyInstance,
  options: TopicRoutesOptions,
): Promise<void> {
  const createTopicController = makeCreateTopicController(options.topicRepository);

  app.post('/topics', async (request, reply) => {
    return createTopicController.handle(request, reply);
  });
}