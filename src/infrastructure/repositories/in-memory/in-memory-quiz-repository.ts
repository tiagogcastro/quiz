import { Quiz } from '@/domain/entities/quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';

export class InMemoryQuizRepository implements QuizRepository {
  private readonly items = new Array<Quiz>();

  async save(quiz: Quiz): Promise<void> {
    const index = this.items.findIndex(item => item.id === quiz.id);

    if (index === -1) {
      this.items[index] = quiz;
      return;
    }

    this.items.push(quiz);
  }

  async findById(id: string): Promise<Quiz | null> {
    return this.items.find((quiz) => quiz.id === id) ?? null;
  }
} 