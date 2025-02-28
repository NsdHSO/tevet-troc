import { FastifyInstance, FastifyRequest, FastifySchema } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import {
  CreatedUpdatedEmergencyResponse,
  EmergencyBodyStatic,
  EmergencyObject,
} from '@tevet-troc/models';

export default function (app: FastifyInstance): void {
  app.post(
    '/',
    {
      schema: {
        response: CreatedUpdatedEmergencyResponse  ,
        body: EmergencyObject,
        tags: ['emergency'],
      } as FastifySchema,
    },
    async (req: FastifyRequest<{ Body: EmergencyBodyStatic }>, reply) => {
      try {
        app.log.info(`Registered Emergency`);
        return httpResponseBuilder.OK(
          await app.emergencyApplicationService.create(req.body)
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Emergency is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
