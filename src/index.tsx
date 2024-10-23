import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono 666!");
});

app.get('/', (c) => {
  return new Response('Good morning!')
})

// 返回 JSON
app.get("/api/hello", (c) => {
  return c.json({
    ok: true,
    message: "Hello Hono!",
  });
});

// post请求
app.post("/posts", (c) => c.text("Created!", 201));
// 携带参数
app.delete("/posts/:id", (c) => c.text(`${c.req.param("id")} is deleted!`));


// 返回 HTML
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  )
}
app.get('/page', (c) => {
  return c.html(<View />)
})

// 使用 中间件
app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  })
)
// 访问页面即可查看效果
app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`服务已启动，请查看端口： ${port}`);
