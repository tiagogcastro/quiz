import { z } from 'zod';

export const addQuestionBodySchema = z.object({
  quizId: z.uuid(),
  statement: z.string().trim().min(1, {
    error: 'Statement is required',
  }),
  alternatives: z.array(z.object({
    text: z.string().trim().min(1, {
      error: 'Text is required',
    }),
    isCorrect: z.boolean(),
  })).min(2, {
    error: 'At least two alternatives are required',
  }),
});

export type AddQuestionBody = z.infer<typeof addQuestionBodySchema>;
