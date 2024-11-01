import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { user } from './modules/user';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono 666!');
});

app.route('/', user);

const port = 3008;

serve({
  fetch: app.fetch,
  port,
});

console.log(`服务已启动，请查看端口： ${port}`);
