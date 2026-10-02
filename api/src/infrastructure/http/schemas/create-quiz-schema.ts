import { z } from 'zod';

export const createQuizBodySchema = z.object({
  topicId: z.uuid(),
  title: z.string().trim().min(1, {
    error: 'Title is required',
  }),
});

export type CreateQuizBody = z.infer<typeof createQuizBodySchema>;
