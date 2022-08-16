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
  it('should show a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(4);
  });
  it('should show a restaurant detail with nested reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Fast Pizza',
      type: 'Pizza',
      reviews: [{ detail: 'Very good' }],
    });
  });
  it('creates new review for auth users', async () => {
    const newReview = {
      stars: 2,
      content:
        'The manager was very rude when I asked for my food to be served in a tupperware bowl so my dog could eat my leftovers. I will NOT be eating here again.',
    };

    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(newReview);

    const res = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send(newReview);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      user_id: expect.any(String),
      restaurant_id: expect.any(String),
      ...newReview,
    });
  });
});
