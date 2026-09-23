import { Quiz } from '@/domain/entities/quiz';

export interface QuizRepository {
  save(quiz: Quiz): Promise<void>;
  findById(id: string): Promise<Quiz | null>;
}