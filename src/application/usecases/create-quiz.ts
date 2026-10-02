import { TopicApplicationError } from '@/application/errors/topic-errors';
import { Quiz } from '@/domain/entities/quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { Result } from '@/shared/result';

interface CreateQuizInput {
  topicId: string;
  title: string;
}

export class CreateQuizUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly quizRepository: QuizRepository
  ) { }

  async execute(input: CreateQuizInput): Promise<Result<Quiz, Extract<TopicApplicationError, 'TOPIC_NOT_FOUND'>>> {
    const topic = await this.topicRepository.findById(input.topicId);

    if (!topic) {
      return {
        error: 'TOPIC_NOT_FOUND',
      }
    }

    const quiz = Quiz.create({
      id: crypto.randomUUID(),
      questions: [],
      title: input.title,
      topicId: topic.id,
    });

    await this.quizRepository.save(quiz);

    return {
      data: quiz,
    };
  }
}
