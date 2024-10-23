import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono 666!");
});

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

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`服务已启动，请查看端口： ${port}`);
