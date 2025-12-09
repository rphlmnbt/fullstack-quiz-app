import { Hono } from 'hono';

const app = new Hono();

// Basic JSON content type + CORS middleware for frontend access
app.use('*', async (c, next) => {
  c.res.headers.set('Content-Type', 'application/json; charset=utf-8');
  // Simple CORS - adjust origins in production
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204);
  }
  await next();
});

export default app;
