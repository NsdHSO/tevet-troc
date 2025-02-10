import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { FastifyInstance, FastifyRequest } from 'fastify';

export default function (app: FastifyInstance) {
  app.post(
    '/',
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info('Registered Parandulea');
        return httpResponseBuilder.Created("iancu")
      } catch (error:ResponseObject<string, number> | any) {
        app.log.error('Registered when Parandulea is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
