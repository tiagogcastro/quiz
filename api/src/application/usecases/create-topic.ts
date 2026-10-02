import { TopicApplicationError } from '@/application/errors/topic-errors';
import { Topic } from '@/domain/entities/topic';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { Result } from '@/shared/result';

interface CreateTopicInput {
  name: string;
}

interface CreateTopicResponse {
  id: string;
  name: string;
}

export class CreateTopicUseCase {
  constructor(private readonly topicRepository: TopicRepository) { }

  async execute(input: CreateTopicInput): Promise<Result<CreateTopicResponse, Extract<TopicApplicationError, 'INVALID_TOPIC_NAME'>>> {
    if (!input.name.trim()) {
      return {
        error: 'INVALID_TOPIC_NAME',
      }
    }

    const topic = Topic.create({
      id: crypto.randomUUID(),
      name: input.name,
    });

    await this.topicRepository.save(topic);

    return {
      data: {
        id: topic.id,
        name: topic.name,
      }
    };
  }
}
