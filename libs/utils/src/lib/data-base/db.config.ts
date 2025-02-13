import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import plugin from 'typeorm-fastify-plugin';

export async function registerDb(fastify: FastifyInstance) {
  fastify.log.info('Registering database...');
  fastify
    .register(plugin, {
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.NODE_ENV === 'dev',
      logging: process.env.NODE_ENV === 'dev',
      subscribers: [],
      migrationsRun: process.env.NODE_ENV !== 'dev',
      entities: [],
      logger: 'debug',
    })
    .after(() => {
      fastify.log.info('Database plugin registered successfully.');
    })
    .ready(async () => {
      try {
        fastify.log.info('Database connected successfully');
      } catch (err) {
        fastify.log.info('Error connecting to the database:', err);
      }
    });
}
