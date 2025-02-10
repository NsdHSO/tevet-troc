import Fastify, { FastifyInstance } from 'fastify';
import { app } from './app/app';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyCookie from '@fastify/cookie';
import pgConfig from 'typeorm-fastify-plugin'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
export async function registerDb(fastify: FastifyInstance) {
  console.log('Registering DB...');
  return fastify.register(pgConfig, {
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: process.env.NODE_ENV === 'dev',
    logging: process.env.NODE_ENV === 'dev',
    subscribers: [],
    migrationsRun: process.env.NODE_ENV !== 'dev',
    logger: 'advanced-console',
  });
}

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();
server.register(fastifyCookie);
registerDb(server)
// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
