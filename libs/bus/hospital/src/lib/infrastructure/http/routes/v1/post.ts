import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { hospitalSchemas } from '../../schema';

export default function (app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: {
        response: hospitalSchemas.Response.HospitalResponse,
      },
    },
    async (req: FastifyRequest, reply) => {
      try {
        app.log.info('Registered Hospital');
        httpResponseBuilder.OK(app.hospitalApplicationService.create());
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Hospital is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
