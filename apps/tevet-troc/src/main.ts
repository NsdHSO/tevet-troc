import Fastify from 'fastify';
import { app } from './app/app';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyCookie from '@fastify/cookie';

const port = process.env.TEVET_APP ? Number(process.env.TEVET_APP) : 3000;

// Instantiate Fastify with some config
export async function startServer() {
  const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();
  fastify.register(fastifyCookie);
  fastify.register(app);

  try {
    await fastify.listen({ port: port });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

startServer()
  .then(() => {
    console.log(`Server started successfully at ${process.env.TEVET_APP}`);
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
