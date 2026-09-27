import { topicRoutes } from '@/infrastructure/http/routes/topic-routes';
import { InMemoryTopicRepository } from '@/infrastructure/repositories/in-memory/in-memory-topic-repository';
import fastify from 'fastify';

export function createApp() {
  const app = fastify({
    logger: true,
  });

  const topicRepository = new InMemoryTopicRepository();

  app.register(topicRoutes, {
    topicRepository,
  });

  return app;
}