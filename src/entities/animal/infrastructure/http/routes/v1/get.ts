import { FastifyInstance, FastifyRequest } from 'fastify';
import { AuthBearerHeader } from '../../../../../auth/infrastructure/http/schema';
import { handleError } from '../../../errors/handling';
import { httpResponseBuilder, isErrorObject } from '../../../../../../infrastructure/models/error';
import { FilterByAnimal } from '../../schema/animal/params';
import { AnimalEntity } from '../../../dao/animal.entity';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
import { GetAll } from '../../schema/animal/bodies';

export default async function getAnimalRoute(app: FastifyInstance) {
    app.get('/', {
        schema: {
            headers: AuthBearerHeader,
            tags: ['animal'],
            querystring: FilterByAnimal,
            response: GetAll
        }
        ,
        onRequest: [app.authenticate]

    }, async (req: FastifyRequest<{ Querystring: { fields: string } }>, reply) => {
        try {
            const { fields } = req.query;
            const answerDAO = await app.animalService.findAll(req.user.uic, { query: fields?.split(',') as Array<keyof AnimalEntity> });
            if (isErrorObject(answerDAO) && answerDAO.code === HttpCodeW.NotFound) {
                throw httpResponseBuilder.NotFound(answerDAO.message);
            } else if (isErrorObject(answerDAO) && answerDAO.code === HttpCodeW.BadRequest) {
                throw httpResponseBuilder.BadRequest(answerDAO.message);
            }
            return answerDAO;
        } catch (error) {
            return handleError(error, app, reply);
        }
    });

}
