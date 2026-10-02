import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { makeAddQuestionController } from '@/infrastructure/factories/make-add-question-controller';
import { makeCreateQuizController } from '@/infrastructure/factories/make-create-quiz-controller';
import { makeGetQuizController } from '@/infrastructure/factories/make-get-quiz-controller';
import { AddQuestionBody } from '@/infrastructure/http/schemas/add-question-schema';
import { CreateQuizBody } from '@/infrastructure/http/schemas/create-quiz-schema';
import { GetQuizBody } from '@/infrastructure/http/schemas/get-quiz-schema';
import { FastifyInstance } from 'fastify';

interface QuizRoutesOptions {
  topicRepository: TopicRepository;
  quizRepository: QuizRepository;
}

export async function quizRoutes(
  app: FastifyInstance,
  options: QuizRoutesOptions,
): Promise<void> {
  const createQuizController = makeCreateQuizController(options.topicRepository, options.quizRepository);
  const addQuestionController = makeAddQuestionController(options.quizRepository);
  const getQuizController = makeGetQuizController(options.quizRepository);

  app.post<{ Body: CreateQuizBody }>('/create-quiz', (request, reply) => {
    return createQuizController.handle(request, reply);
  });

  app.post<{ Body: AddQuestionBody }>('/questions/add-question', (request, reply) => {
    return addQuestionController.handle(request, reply);
  });

  app.query<{ Body: GetQuizBody }>('/get-quiz', (request, reply) => {
    return getQuizController.handle(request, reply);
  });
}
