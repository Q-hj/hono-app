import type { Context, Next } from 'hono';

/** 全局token */
export const token = '15131dsad8564sda84dasf1';

// 登录校验
export const basicAuth = (c: Context, next: Next) => {
  const token = c.req.header('token');

  if (!token) {
    // 未携带token
    return c.json(
      {
        error: 'Unauthorized - You must be an admin to access this resource.',
        message: '未携带token',
      },
      403
    );
  } else if (token !== '15131dsad8564sda84dasf1') {
    // 未携带token
    return c.json(
      {
        error: 'Unauthorized - You must be an admin to access this resource.',
        message: 'token 搞错了哟~',
      },
      403
    );
  } else {
    // 放行
    next();
  }
};
