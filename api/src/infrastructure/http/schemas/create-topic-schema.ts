import { z } from 'zod';

export const createTopicSchema = z.object({
  name: z.string().trim().min(1, {
    error: 'Name is required',
  }),
});

export type CreateTopicBody = z.infer<typeof createTopicSchema>;
