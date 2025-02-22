import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { EmergencyResponse } from '@tevet-troc/models';
export default function (app: FastifyInstance): void {
  app.post(
    '/',
    {
      schema: {
        response: EmergencyResponse,
      },
    },
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info(`Registered Emergency`);
        return httpResponseBuilder.NotImplemented('Not Implemented');
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Emergency is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
