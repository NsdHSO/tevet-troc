import { FastifyInstance, FastifyRequest } from 'fastify';
import { AuthBearerHeader } from '../../../../../auth/infrastructure/http/schema';
import { handleError } from '../../../errors/handling';
import { isErrorObject } from '../../../../../../infrastructure/models/error';
import { FilterByAnimal } from '../../schema/animal/params';
import { AnimalEntity } from '../../../dao/animal.entity';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
import { GetAll } from '../../schema/animal/bodies';
import { parseFilterParams } from '../../../../../auth/util';
import { httpResponseBuilder } from '../../../../../../infrastructure/models/httResponseBuilder';

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

    }, async (req: FastifyRequest<{ Querystring: { fields: string, filterBy: string } }>, reply) => {
        try {
            const {
                fields,
                filterBy
            } = req.query;
            const filterByParsed = parseFilterParams<keyof AnimalEntity>(filterBy);
            const answerDAO = await app.animalService.findAll(req.user.uic, {
                query: fields?.split(',') as Array<keyof AnimalEntity>,
                filterBy: filterByParsed
            });
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
