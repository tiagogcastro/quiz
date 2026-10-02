import { createApp } from '@/app';
import { env } from '@/infrastructure/env';

const app = createApp();

async function start() {
  const address = await app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  console.log(`API running at ${address}`);
}

start();
