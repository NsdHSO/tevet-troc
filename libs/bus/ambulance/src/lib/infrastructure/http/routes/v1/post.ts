import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { AmbulanceResponse } from '@tevet-troc/models';

export default function (app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        response: AmbulanceResponse,
      },
    },
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info(`Registered Ambulance`);
        return httpResponseBuilder.NotImplemented('Not Implemented');
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Ambulance is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
