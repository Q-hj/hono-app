import type { Context, Next } from 'hono';

// 定义自定义的 Hono Context 接口

// 登录校验
export const basicAuth = (c: Context, next: Next) => {
  const token = c.req.header('token');

  // 未携带token
  if (token !== '15131dsad8564sda84dasf1') {
    return c.json(
      {
        error: 'Unauthorized - You must be an admin to access this resource.',
        message: '未携带token',
      },
      403
    );
  }

  // 放行
  next();
};
