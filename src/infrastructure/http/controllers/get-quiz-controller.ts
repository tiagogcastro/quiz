import { GetQuizUseCase } from '@/application/usecases/get-quiz';
import { mapError } from '@/infrastructure/http/errors/error-mapper';
import { zodError } from '@/infrastructure/http/errors/zod-error';
import { GetQuizBody, getQuizBodySchema } from '@/infrastructure/http/schemas/get-quiz-schema';
import { FastifyReply, FastifyRequest } from 'fastify';

type GetQuizRequest = FastifyRequest<{ Body: GetQuizBody }>;

export class GetQuizController {
  constructor(private readonly getQuizUseCase: GetQuizUseCase) {}

  async handle(request: GetQuizRequest, reply: FastifyReply) {
    const body = getQuizBodySchema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send(zodError(body.error, 'INVALID_BODY', 'Invalid request body'));
    }

    const result = await this.getQuizUseCase.execute(body.data);

    if (result.error) {
      const error = mapError(result.error);

      return reply.status(error.statusCode).send(error.body);
    }

    return reply.send({
      data: {
        id: result.data.id,
        topicId: result.data.topicId,
        title: result.data.title,
        questions: result.data.questions.map((question) => ({
          id: question.id,
          statement: question.statement,
          alternatives: question.alternatives.map((alternative) => ({
            id: alternative.id,
            text: alternative.text,
          })),
        })),
      },
    });
  }
}
