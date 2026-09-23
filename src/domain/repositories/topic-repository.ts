import { Topic } from '@/domain/entities/topic';

export interface TopicRepository {
  save(topic: Topic): Promise<void>;
  findById(id: string): Promise<Topic | null>;
  findAll(): Promise<Topic[]>;
}