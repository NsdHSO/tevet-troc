import 'reflect-metadata';
import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import server from './infrastructure/server.js';
import { registerDb } from './db.config';

dotenv.config();

export async function startServer() {
    const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>();
    await registerDb(fastify);

    fastify.register(server);

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