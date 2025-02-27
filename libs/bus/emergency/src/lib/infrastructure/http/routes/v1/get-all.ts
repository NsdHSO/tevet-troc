import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import {
  AmbulanceEntity, EmergencyEntity,
  EmergencyResponse,
  FilterByEmergency,
  FilterTypeEmergency,
} from '@tevet-troc/models';
import { parseFilterParams } from '@tevet-troc/utils';

export default function (app: FastifyInstance): void {
  app.get(
    '/',
    {
      schema: {
        response: EmergencyResponse,
        querystring: FilterByEmergency,
      },
    },
    async (
      req: FastifyRequest<{ Querystring: FilterTypeEmergency }>,
      reply
    ) => {
      try {
        app.log.info(`Registered Emergency`);
        const { fields, filterBy } = req.query;
        const filterByParsed =
          parseFilterParams<keyof Omit<Partial<EmergencyEntity>, 'id'>>(
            filterBy
          );
        return httpResponseBuilder.OK(
          await app.emergencyApplicationService.getAll({
            query: fields?.split(',') as Array<
              keyof Omit<EmergencyEntity, 'id'>
            >,
            filterBy: filterByParsed,
          })
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Emergency is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
