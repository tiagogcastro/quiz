import { ListTopicsUseCase } from '@/application/usecases/list-topics';
import { FastifyReply, FastifyRequest } from 'fastify';

export class ListTopicsController {
  constructor(private readonly listTopicsUseCase: ListTopicsUseCase) {}

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const topics = await this.listTopicsUseCase.execute();

    return reply.send({
      data: topics.map((topic) => ({
        id: topic.id,
        name: topic.name,
      })),
    });
  }
}
