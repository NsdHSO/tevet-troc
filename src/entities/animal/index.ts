import { dirname } from 'node:path';
import { join } from 'path';
import { FastifyInstance } from 'fastify';
import autoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), 'infrastructure');

export  function animalPlugin(app: FastifyInstance) {
}