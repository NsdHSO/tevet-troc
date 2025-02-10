import 'reflect-metadata';
import fastifyCookie from '@fastify/cookie';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import { app } from './app/app';
import { registerDb } from '@tevet-troc/utils';

dotenv.config();

export async function startServer() {
  const fastify = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();
  fastify.register(fastifyCookie);
  fastify.register(app);
  registerDb(fastify)

  try {
    const { TEVET_APP = '19200' } = process.env;
    await fastify.listen({ port: parseInt(TEVET_APP) });
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
