import { Hono } from 'hono';

export const user = new Hono().basePath('/user');

const token = '15131dsad8564sda84dasf1';

const accont = {
  username: 'admin',
  password: 'admin',
};

user.get('/', (c) => {
  return c.text('user');
});

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
