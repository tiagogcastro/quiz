import { CreateTopicUseCase } from '@/application/usecases/create-topic';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(1, {
    error: 'Name is required',
  }),
});

// type CreateTopicBody = FastifyRequest<{
//   Body: z.infer<typeof schema>,
// }>;

export class CreateTopicController {
  constructor(private readonly createTopicUseCase: CreateTopicUseCase) { }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = schema.safeParse(request.body);

    if (!body.success) {
      return reply.status(400).send({
        error: 'INVALID_BODY',
        issues: body.error.issues,
      });
    }

    const createTopicResult = await this.createTopicUseCase.execute({
      name: body.data.name,
    });

    if (createTopicResult.error) {
      return reply.status(400).send(createTopicResult);
    }

    return reply.status(201).send(createTopicResult);
  }
}