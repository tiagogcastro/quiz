import { Topic } from '@/domain/entities/topic';
import { TopicRepository } from '@/domain/repositories/topic-repository';

export class InMemoryTopicRepository implements TopicRepository {
  private readonly items = new Map<string, Topic>();

  async save(topic: Topic): Promise<void> {
    this.items.set(topic.id, topic);
  }

  async findById(id: string): Promise<Topic | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<Topic[]> {
    return Array.from(this.items.values());
  }
}