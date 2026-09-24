import { Quiz } from '@/domain/entities/quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { TopicRepository } from '@/domain/repositories/topic-repository';
import { Result } from '@/shared/result';

interface CreateQuizInput {
  topicId: string;
  title: string;
}

type CreateQuizError = 'TOPIC_NOT_FOUND';

export class CreateQuizUseCase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly quizRepository: QuizRepository
  ) { }

  async execute(input: CreateQuizInput): Promise<Result<Quiz, CreateQuizError>> {
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