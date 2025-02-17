import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { ambulanceSchemas } from '../../schema';

export default function (app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        response: ambulanceSchemas.Response.AmbulanceResponse,
      },
    },
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info(`Registered Ambulance`);
        return httpResponseBuilder.NotImplemented({
          payload: 'Not Implemented',
        });
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Ambulance is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
