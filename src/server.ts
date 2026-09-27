import { createApp } from '@/app';

const app = createApp();

async function start() {
  await app.listen({
    port: 8080,
    host: '0.0.0.0',
  });
}

start();