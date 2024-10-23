```
npm install
npm run dev
```

```
open http://localhost:3000
```

# 路由优先级

**处理程序** 或 **中间件** 将按注册顺序执行。

如果有要执行的中间件，请在处理程序上方编写代码。

```TypeScript
app.use(logger());
app.get('/foo', (c) => c.text('foo'));
```

如果您想要有一个 “fallback” 处理程序，请在另一个处理程序下面编写代码。

```TypeScript
app.get('/bar', (c) => c.text('bar'));
app.get('*', (c) => c.text('fallback'));
```
