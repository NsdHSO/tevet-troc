import { AnimalSchemas } from '../../schema';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Header } from '../../../../../auth/infrastructure/http/schema';

export default async function getAnimalRoute(app: FastifyInstance) {
    app.get('/:animalId', {
        schema: {
            response: {
                201: AnimalSchemas.Bodies.Created201
            },
            params: AnimalSchemas.Params.AnimalId,
            headers:Header,
            tags: ['animal'],
        }
        ,
        onRequest: [app.authenticate]

    }, async (req: FastifyRequest<{Params:{animalId:number}}>, resp) => {
        return app.animalService.findById(req.params.animalId);
    });

}
