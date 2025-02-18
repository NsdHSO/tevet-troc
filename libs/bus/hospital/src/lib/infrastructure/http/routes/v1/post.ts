import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import {
  HospitalBodyType,
  HospitalResponse,
  HospitalSchema,
} from '@tevet-troc/models';

export default function (app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        response: HospitalResponse,
        body: HospitalSchema,
      },
    },
    async (req: FastifyRequest<{ Body: HospitalBodyType }>, reply) => {
      try {
        app.log.info('Registered Hospital');
        return httpResponseBuilder.OK(
          await app.hospitalApplicationService.create(req.body)
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error(
          `Error when Register Hospital is register ${JSON.stringify(error)}`
        );
        reply.code(error.code);
        return error;
      }
    }
  );
}
