import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { AnimalSchemas } from '../schema';

const routes: FastifyPluginAsyncTypebox = async (app) => {
    app.post('/', {
        schema: {
            response: {
                201: AnimalSchemas.Bodies.CreateAnimal
            }
        }
    },
        async (req, reply)=>{
            const newAnimal = await app.animalService.create(req.body as any);
            return reply.status(201).send(newAnimal);
        });
};