import { z } from 'zod';

export const getQuizBodySchema = z.object({
  quizId: z.uuid(),
});

export type GetQuizBody = z.infer<typeof getQuizBodySchema>;
