import { Alternative, AlternativeProps } from '@/domain/entities/alternative';
import { CreateQuestionError, Question } from '@/domain/entities/question';
import { AddQuestionError } from '@/domain/entities/quiz';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { Result } from '@/shared/result';

interface AddQuestionInput {
  quizId: string;
  statement: string;
  alternatives: Array<Omit<AlternativeProps, 'id'>>;
}

type AddQuestionUseCaseError = 'QUIZ_NOT_FOUND' | CreateQuestionError | AddQuestionError;

export class AddQuestionUseCase {
  constructor(
    private readonly quizRepository: QuizRepository,
  ) { }

  async execute(input: AddQuestionInput): Promise<Result<Question, AddQuestionUseCaseError>> {
    const quiz = await this.quizRepository.findById(input.quizId);

    if (!quiz) {
      return {
        error: 'QUIZ_NOT_FOUND',
      };
    }

    const alternatives = input.alternatives.map((alternative) => {
      return Alternative.create({
        id: crypto.randomUUID(),
        text: alternative.text,
        isCorrect: alternative.isCorrect,
      });
    });

    const questionResult = Question.create({
      id: crypto.randomUUID(),
      statement: input.statement,
      alternatives,
    });

    if (questionResult.error) {
      return {
        error: questionResult.error,
      };
    }

    const addQuestionResult = quiz.addQuestion(questionResult.data);

    if (addQuestionResult.error) {
      return {
        error: addQuestionResult.error,
      };
    }

    await this.quizRepository.save(quiz);

    return {
      data: questionResult.data,
    };
  }
}