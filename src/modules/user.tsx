import { basicAuth, token } from '@/middleware/basicAuth';
import { Hono } from 'hono';

export const user = new Hono().basePath('/user');

const accont = {
  username: 'admin',
  password: 'admin',
};

// 用户访问
user.get('/:name', basicAuth, (c) => {
  return c.text(`欢迎登录 ${c.req.param('name')} !`);
});

// 用户登录
user.post('/login', async (c) => {
  // 解析请求体中的数据
  const body = await c.req.parseBody();

  if (body.username !== accont.username || body.password !== accont.password) {
    return c.json(
      {
        message: '账户名或密码错误',
      },
      400
    );
  } else {
    return c.json(
      {
        message: '登录成功',
        token,
      },
      200
    );
  }
});
