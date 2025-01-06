import { AnimalSchemas } from '../../schema';
import { FastifyInstance } from 'fastify';

export default async function getAnimalRoute(app: FastifyInstance) {
    app.get('/:animalId', {
        schema: {
            response: {
                201: AnimalSchemas.Bodies.Created201
            },
            params: AnimalSchemas.Params.AnimalId
        }
    }, async (req: any) => app.animalService.findById(req.params.animalId));
}
