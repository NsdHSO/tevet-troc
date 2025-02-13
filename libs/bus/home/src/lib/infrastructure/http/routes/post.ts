import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { homeSchemas } from '../schema';

export default function (app: FastifyInstance) {
  app.get(
    '/home',
    {
      schema: {
        response: homeSchemas.Response.HomeResponse,
      },
    },
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info('Registered Home');
        return httpResponseBuilder.NotImplemented('This is a home page, what are you doing here?');
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Home is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
