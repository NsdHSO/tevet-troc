import Fastify, { FastifyInstance } from 'fastify';
import { app } from './app';

describe('GET /home', () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = Fastify();
    server.register(app);
  });

  it('should respond with a message', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/home',
    });
    console.log(response.json());
    expect(response.json()).toEqual({ message: 'This is a home page, what are you doing here?' });
  });
});
