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
  });
});
