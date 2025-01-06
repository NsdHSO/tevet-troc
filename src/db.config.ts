import 'reflect-metadata';
import { FastifyInstance } from 'fastify';

import { join } from 'path';
import plugin from 'typeorm-fastify-plugin';
import { Animal } from './entities/animal/infrastructure/dao/animal.entity';

export async function registerDb(fastify: FastifyInstance) {
    fastify.register(plugin, {
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: process.env.NODE_ENV === 'dev',
        logging: process.env.NODE_ENV === 'dev',
        subscribers: [],
        migrationsRun: process.env.NODE_ENV !== 'dev',
        entities: [Animal],
        logger: 'debug'

    }).after(() => {
        console.log('Database plugin registered successfully.');
    }).ready(async () => {
        try {
            fastify.log.info('Database connected successfully');
            console.log();
        } catch (err) {
            fastify.log.info('Error connecting to the database:', err);
        }
    });
}