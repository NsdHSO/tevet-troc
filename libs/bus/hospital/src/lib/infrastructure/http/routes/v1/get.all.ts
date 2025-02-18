import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import {
  FilterByHospital,
  FilterTypeHospital,
  HospitalAllResponse,
  HospitalEntity,
} from '@tevet-troc/models';
import { parseFilterParams } from '@tevet-troc/utils';

export default function (app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        response: HospitalAllResponse,
        querystring: FilterByHospital,
      },
    },
    async (
      req: FastifyRequest<{
        Querystring: FilterTypeHospital;
      }>,
      reply
    ) => {
      try {
        app.log.info(`Register Get all Hospital ${req.query}`);
        const { fields, filterBy } = req.query;
        const filterByParsed =
          parseFilterParams<keyof Omit<Partial<HospitalEntity>, 'id'>>(
            filterBy
          );
        return httpResponseBuilder.OK(
          await app.hospitalApplicationService.getAll({
            query: fields?.split(',') as Array<
              keyof Omit<HospitalEntity, 'id'>
            >,
            filterBy: filterByParsed,
          })
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error(
          `Error when Updated Hospital is register ${JSON.stringify(error)}`
        );
        reply.code(error.code);
        return error;
      }
    }
  );
}
