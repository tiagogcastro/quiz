import { Topic } from '@/domain/entities/topic';
import { TopicRepository } from '@/domain/repositories/topic-repository';

export class ListTopicsUseCase {
  constructor(private readonly topicRepository: TopicRepository) { }

  async execute(): Promise<Topic[]> {
    return this.topicRepository.findAll();
  }
}