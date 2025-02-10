
import fastifyCookie from '@fastify/cookie';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import 'reflect-metadata';
import { app } from './app/app';

dotenv.config();

export async function startServer() {
  const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();
  fastify.register(fastifyCookie);
  fastify.register(app);

  try {
    const { PORT = '19200' } = process.env;
    await fastify.listen({ port: parseInt(PORT) });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }

}

startServer()
  .then(() => {
    console.log(`Server started successfully at ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
