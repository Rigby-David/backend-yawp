const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUsers = {
  firstName: 'John',
  lastName: 'Cena',
  email: 'test@cena.com',
  password: '12345',
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('#DELETE should return 401 for unauth users', async () => {
    const res = await request(app).delete('/api/v1/reviews/1');
    expect(res.status).toBe(401);
  });
  it('#DELETE should delete review for user w/ matching user_id', async () => {
    const newReview = {
      stars: '3',
      detail: 'The food was affordable',
    };
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUsers);

    const response = await agent
      .post('/api/v1/restaurants/2/reviews')
      .send(newReview);
    expect(response.status).toBe(200);

    const res = await agent.delete('/api/v1/reviews/3');
    expect(res.status).toBe(200);

    // const resp = await agent.get('/api/v1/reviews/3');
    // expect(resp.status).toBe(404);
  });
});
