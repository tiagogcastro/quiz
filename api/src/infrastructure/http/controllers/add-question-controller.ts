import { AddQuestionUseCase } from '@/application/usecases/add-question';
import { mapError } from '@/infrastructure/http/errors/error-mapper';
import { zodError } from '@/infrastructure/http/errors/zod-error';
import {
  AddQuestionBody,
  addQuestionBodySchema,
} from '@/infrastructure/http/schemas/add-question-schema';
import { FastifyReply, FastifyRequest } from 'fastify';

type AddQuestionRequest = FastifyRequest<{ Body: AddQuestionBody }>;

export class AddQuestionController {
  constructor(private readonly addQuestionUseCase: AddQuestionUseCase) {}

  async handle(request: AddQuestionRequest, reply: FastifyReply) {
    const body = addQuestionBodySchema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send(zodError(body.error, 'INVALID_BODY', 'Invalid request body'));
    }

    const result = await this.addQuestionUseCase.execute(body.data);

    if (result.error) {
      const error = mapError(result.error);

      return reply.status(error.statusCode).send(error.body);
    }

    return reply.status(201).send({
      data: {
        id: result.data.id,
        statement: result.data.statement,
        alternatives: result.data.alternatives.map((alternative) => ({
          id: alternative.id,
          text: alternative.text,
          isCorrect: alternative.isCorrect,
        })),
      },
    });
  }
}
