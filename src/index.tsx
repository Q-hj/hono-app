import { serve, type HttpBindings } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';

type Bindings = HttpBindings & {
  /* ... */
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
  return c.text('Hello Hono 666!');
});

// 访问原始 Node.js API
app.get('/', (c) => {
  return c.json({
    remoteAddress: c.env.incoming.socket.remoteAddress,
  });
});

// 返回 JSON
app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  });
});

// post请求
app.post('/posts', (c) => c.text('Created!', 201));
// 携带参数
app.delete('/posts/:id', (c) => c.text(`${c.req.param('id')} is deleted!`));

// 使用 TSX 返回 HTML
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  );
};
app.get('/page', (c) => {
  return c.html(<View />);
});

// 使用 中间件
app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
);
// 访问页面即可查看效果
app.get('/admin', (c) => {
  return c.text('You are authorized!');
});

app.get(
  '/static/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) => path.replace(/^\/static/, '/statics'),
  })
);

// 指定基本路径
const api = new Hono().basePath('/api');
api.get('/book', (c) => c.text('List Books'));

// 使用路由分组
const user = new Hono().basePath('/user');
user.get('/', (c) => c.text('List Users')); // GET /user
user.post('/', (c) => c.text('Create User')); // POST /user
// 使用路由
app.route('/', user);

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`服务已启动，请查看端口： ${port}`);
