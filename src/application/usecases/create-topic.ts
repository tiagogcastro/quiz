import { Topic } from '@/domain/entities/topic';
import { TopicRepository } from '@/domain/repositories/topic-repository';

interface CreateTopicInput {
  name: string;
}

export class CreateTopicUseCase {
  constructor(private readonly topicRepository: TopicRepository) { }

  async execute(input: CreateTopicInput): Promise<Topic> {
    const topic = Topic.create({
      id: crypto.randomUUID(),
      name: input.name,
    });

    await this.topicRepository.save(topic);

    return topic;
  }
}