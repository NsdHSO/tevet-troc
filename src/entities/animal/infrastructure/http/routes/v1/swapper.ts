import { FastifyInstance, FastifyRequest } from 'fastify';
import { AuthBearerHeader } from '../../../../../auth/infrastructure/http/schema';
import { FilterByAnimal } from '../../schema/animal/params';
import { GetAll } from '../../schema/animal/bodies';
import { parseFilterParams } from '../../../../../auth/util';
import { AnimalEntity } from '../../../dao/animal.entity';
import { isErrorObject } from '../../../../../../infrastructure/models/error';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
import { httpResponseBuilder } from '../../../../../../infrastructure/models/httResponseBuilder';
import { handleError } from '../../../errors/handling';

export default function (fastify: FastifyInstance ){
    fastify.get('/hard', {
        schema: {
            headers: AuthBearerHeader,
            tags: ['animal'],
            querystring: FilterByAnimal,
            response: GetAll
        }
        ,
        onRequest: [fastify.authenticate]
    }, async (req: FastifyRequest<{ Querystring: { fields: string, filterBy: string } }>, reply) => {
        try {
            const {
                fields,
                filterBy
            } = req.query;
            const filterByParsed = parseFilterParams<keyof AnimalEntity>(filterBy);
            const answerDAO = await fastify.animalService.hardFiltering(req.user.uic, {
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
    })
}