const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'John',
  lastName: 'Cena',
  email: 'test@cena.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);
  const [user] = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
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
    const [agent] = await registerAndLogin();

    const { body: review } = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({
        stars: 1,
        detail: 'no good',
      });
    const res = await agent.delete(`/api/v1/reviews/${review.id}`);
    // console.log('res.body', res.body);
    expect(res.status).toBe(204);
  });
});
