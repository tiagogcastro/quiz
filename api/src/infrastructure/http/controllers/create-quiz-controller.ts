import { CreateQuizUseCase } from '@/application/usecases/create-quiz';
import { mapError } from '@/infrastructure/http/errors/error-mapper';
import { zodError } from '@/infrastructure/http/errors/zod-error';
import {
  CreateQuizBody,
  createQuizBodySchema,
} from '@/infrastructure/http/schemas/create-quiz-schema';
import { FastifyReply, FastifyRequest } from 'fastify';

type CreateQuizRequest = FastifyRequest<{ Body: CreateQuizBody }>;

export class CreateQuizController {
  constructor(private readonly createQuizUseCase: CreateQuizUseCase) {}

  async handle(request: CreateQuizRequest, reply: FastifyReply) {
    const body = createQuizBodySchema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send(zodError(body.error, 'INVALID_BODY', 'Invalid request body'));
    }

    const result = await this.createQuizUseCase.execute(body.data);

    if (result.error) {
      const error = mapError(result.error);

      return reply.status(error.statusCode).send(error.body);
    }

    return reply.status(201).send({
      data: {
        id: result.data.id,
        topicId: result.data.topicId,
        title: result.data.title,
      },
    });
  }
}
