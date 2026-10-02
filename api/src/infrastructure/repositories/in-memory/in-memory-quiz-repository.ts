import { Quiz } from '@/domain/entities/quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';

export class InMemoryQuizRepository implements QuizRepository {
  private readonly items = new Map<string, Quiz>();

  async save(quiz: Quiz): Promise<void> {
    this.items.set(quiz.id, quiz);
  }

  async findById(id: string): Promise<Quiz | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<Quiz[]> {
    return Array.from(this.items.values());
  }
}
