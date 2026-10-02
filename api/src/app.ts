import { httpError } from '@/infrastructure/http/errors/http-error';
import { quizRoutes } from '@/infrastructure/http/routes/quiz-routes';
import { topicRoutes } from '@/infrastructure/http/routes/topic-routes';
import { InMemoryQuizRepository } from '@/infrastructure/repositories/in-memory/in-memory-quiz-repository';
import { InMemoryTopicRepository } from '@/infrastructure/repositories/in-memory/in-memory-topic-repository';
import fastify from 'fastify';

export function createApp() {
  const app = fastify();

  const topicRepository = new InMemoryTopicRepository();
  const quizRepository = new InMemoryQuizRepository();

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof Error && 'statusCode' in error) {
      if (error.statusCode === 400) {
        return reply.status(400).send(httpError('INVALID_BODY', 'Invalid request body'));
      }

      if (error.statusCode === 415) {
        return reply.status(415).send(httpError('UNSUPPORTED_MEDIA_TYPE', 'Unsupported media type'));
      }
    }

    console.error(error);

    return reply.status(500).send(httpError('INTERNAL_SERVER_ERROR', 'Internal server error'));
  });

  app.register(topicRoutes, {
    prefix: '/topics',
    topicRepository,
  });

  app.register(quizRoutes, {
    prefix: '/quizzes',
    topicRepository,
    quizRepository,
  });

  return app;
}
