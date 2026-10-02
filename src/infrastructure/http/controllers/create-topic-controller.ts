import { CreateTopicUseCase } from '@/application/usecases/create-topic';
import { mapError } from '@/infrastructure/http/errors/error-mapper';
import { zodError } from '@/infrastructure/http/errors/zod-error';
import { CreateTopicBody, createTopicSchema } from '@/infrastructure/http/schemas/create-topic-schema';
import { FastifyReply, FastifyRequest } from 'fastify';

type CreateTopicRequest = FastifyRequest<{ Body: CreateTopicBody }>;

export class CreateTopicController {
  constructor(private readonly createTopicUseCase: CreateTopicUseCase) {}

  async handle(request: CreateTopicRequest, reply: FastifyReply) {
    const body = createTopicSchema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send(zodError(body.error, 'INVALID_BODY', 'Invalid request body'));
    }

    const result = await this.createTopicUseCase.execute(body.data);

    if (result.error) {
      const error = mapError(result.error);

      return reply.status(error.statusCode).send(error.body);
    }

    return reply.status(201).send({
      data: {
        id: result.data.id,
        name: result.data.name,
      },
    });
  }
}
