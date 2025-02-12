import Fastify from 'fastify';
import { app } from './app/app';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyCookie from '@fastify/cookie';

const port = process.env.TEVET_APP ? Number(process.env.TEVET_APP) : 3000;

// Instantiate Fastify with some config
export function startServer(): void {
  const fastify = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();
  fastify.register(fastifyCookie);
  fastify.register(app);

  try {
    fastify.listen({ port: port });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

startServer();
