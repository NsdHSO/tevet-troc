import { FastifyInstance, FastifyRequest, FastifySchema } from 'fastify';
import {
  httpResponseBuilder,
  isErrorObject,
  ResponseObject,
} from '@tevet-troc/http-response';
import {
  AmbulanceEntity,
  FilterByAmbulance,
  FilterTypeAmbulance,
  GetAllAmbulanceResponse,
} from '@tevet-troc/models';
import { parseFilterParams } from '@tevet-troc/utils';

export default function (app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        response: GetAllAmbulanceResponse,
        querystring: FilterByAmbulance,
        tags: ['ambulance'],
      } as FastifySchema,
    },
    async (
      req: FastifyRequest<{
        Querystring: FilterTypeAmbulance;
      }>,
      reply
    ) => {
      try {
        app.log.info(`Register Get all Ambulance ${JSON.stringify(req.query)}`);
        const { fields, filterBy } = req.query;
        const filterByParsed =
          parseFilterParams<keyof Omit<Partial<AmbulanceEntity>, 'id'>>(
            filterBy
          );
        return httpResponseBuilder.OK(
          await app.ambulanceApplicationService.getAll(
            app.hospitalApplicationService,
            {
              query: fields?.split(',') as Array<
                keyof Omit<AmbulanceEntity, 'id'>
              >,
              filterBy: filterByParsed,
            }
          )
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error(
          `Error when Updated Ambulance is register ${JSON.stringify(error)}`
        );
        if (isErrorObject(error)) {
          reply.code(error.code);
        }
        return error;
      }
    }
  );
}
