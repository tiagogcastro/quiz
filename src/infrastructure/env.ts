import { z } from 'zod';

export const env = z.object({
  PORT: z.coerce.number().int().min(1).max(65535),
  HOST: z.string().min(1),
}).parse(process.env);
