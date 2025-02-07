import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import { join } from 'path';
import dbConn from 'typeorm-fastify-plugin';

export default async function registerDb(fastify: FastifyInstance,) {
  fastify
    .register(dbConn, {
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: process.env.NODE_ENV === 'dev',
      logging: process.env.NODE_ENV === 'dev',
      subscribers: [],
      migrationsRun: process.env.NODE_ENV !== 'dev',
      entities: [join( '**', '*.entity.{ts,js}')],
      logger: 'simple-console'
    })
    .ready();
}
