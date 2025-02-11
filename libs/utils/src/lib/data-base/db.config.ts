import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import dbConn from 'typeorm-fastify-plugin';

export async function registerDb(fastify: FastifyInstance) {
  console.log('Registering DB...');
  await fastify.register(dbConn, {
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: process.env.NODE_ENV === 'dev',
    logging: process.env.NODE_ENV === 'dev',
    subscribers: [],
    migrationsRun: process.env.NODE_ENV !== 'dev',
    logger: 'simple-console',
  });
  console.log('DB Registered');
}
