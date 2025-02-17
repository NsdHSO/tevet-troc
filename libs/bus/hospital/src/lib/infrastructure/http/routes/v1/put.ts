import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { hospitalSchemas } from '../../schema';
import { HospitalBodyType } from '../../schema/hospitalSchema/bodies';

export default function (app: FastifyInstance) {
  app.put(
    '/',
    {
      schema: {
        response: hospitalSchemas.Response.HospitalResponse,
        body: hospitalSchemas.Bodies.HospitalSchema,
      },
    },
    async (req: FastifyRequest<{ Body: HospitalBodyType }>, reply) => {
      try {
        app.log.info('Register Updating Hospital');
        return httpResponseBuilder.OK(
          await app.hospitalApplicationService.update(req.body)
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error(
          `Error when Updated Hospital is register ${JSON.stringify(error)}`
        );
        reply.code(error.code);
        return error;
      }
    }
  );
}
