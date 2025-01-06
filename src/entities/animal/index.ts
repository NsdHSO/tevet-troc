import { FastifyInstance } from 'fastify';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { join } from 'path';
import fastifyAutoload from '@fastify/autoload';
// Get current file's path and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), 'infrastructure');


export async function animalPlugin(app: FastifyInstance) {
    console.log(join(__dirname, 'http/routes/v1'));
    app.register(fastifyAutoload, {
        dir: join(__dirname, 'services'),
        forceESM: true,
    });

    app.register(fastifyAutoload, {
        dir: join(__dirname, 'http/routes'),  // Path to your v1 routes
        forceESM: true,  // If you're using ES modules
        options: { prefix: '/animal' }
    });

}