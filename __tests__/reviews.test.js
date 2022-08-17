const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('#DELETE should return 401 for unauth users', async () => {
    const res = await request(app).delete('/api/v1/reviews/1');
    console.log('res.body', res.body);
    expect(res.status).toBe(401);
  });
  it('#DELETE should return status 200 for user with the same user_id', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users/sessions').send({
      email: 'test@example.com',
      password: '123456',
    });

    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.status).toBe(200);
  });
});
