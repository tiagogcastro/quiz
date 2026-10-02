import { QuizApplicationError } from '@/application/errors/quiz-errors';
import { Alternative } from '@/domain/entities/alternative';
import { Question } from '@/domain/entities/question';
import { QuestionError } from '@/domain/errors/question-errors';
import { QuizError } from '@/domain/errors/quiz-errors';
import { QuizRepository } from '@/domain/repositories/quiz-repository';
import { Result } from '@/shared/result';

interface AddQuestionInput {
  quizId: string;
  statement: string;
  alternatives: { text: string; isCorrect: boolean }[];
}

type AddQuestionError = QuizApplicationError | QuestionError | QuizError;

export class AddQuestionUseCase {
  constructor(
    private readonly quizRepository: QuizRepository,
  ) { }

  async execute(input: AddQuestionInput): Promise<Result<Question, AddQuestionError>> {
    const quiz = await this.quizRepository.findById(input.quizId);

    if (!quiz) {
      return {
        error: 'QUIZ_NOT_FOUND',
      };
    }

    const questionResult = Question.create({
      id: crypto.randomUUID(),
      statement: input.statement,
      alternatives: input.alternatives.map((alternative) => Alternative.create({
        id: crypto.randomUUID(),
        text: alternative.text,
        isCorrect: alternative.isCorrect,
      })),
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
