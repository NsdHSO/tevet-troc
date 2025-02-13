import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { animalsSchemas } from '../../schema';

export default function (app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        response: animalsSchemas.Response.AnimalsResponse,
      },
    },
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info('Registered Animals');
        return httpResponseBuilder.NotImplemented('Was generated');
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Animals is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
