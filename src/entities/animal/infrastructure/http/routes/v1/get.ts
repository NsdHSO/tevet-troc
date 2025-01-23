import { AnimalSchemas } from '../../schema';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { AuthBearerHeader } from '../../../../../auth/infrastructure/http/schema';
import { handleError } from '../../../errors/handling';
import { createError, isErrorObject } from '../../../../../../infrastructure/models/error';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';

export default async function getAnimalRoute(app: FastifyInstance) {
    app.get('/:animalId', {
        schema: {
            response: {
                [HttpCodeW.Created]: AnimalSchemas.Bodies.Created201
            },
            params: AnimalSchemas.Params.AnimalId,
            headers: AuthBearerHeader,
            tags: ['animal'],
        }
        ,
        onRequest: [app.authenticate]

    }, async (req: FastifyRequest<{ Params: { animalId: number } }>, reply) => {
        try {
            const answerDAO = await app.animalService.findById(req.params.animalId);
            if (isErrorObject(answerDAO)) {
                throw createError(answerDAO.message, HttpCodeW.NotFound);
            }
        } catch (error) {
            return handleError(error, app, reply);
        }
    });

}
