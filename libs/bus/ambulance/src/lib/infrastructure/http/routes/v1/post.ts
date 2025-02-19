import { FastifyInstance, FastifyRequest } from 'fastify';
import { httpResponseBuilder, ResponseObject } from '@tevet-troc/http-response';
import { AmbulanceBody, AmbulanceBodyStatic } from '@tevet-troc/models';

export default function (app: FastifyInstance): void {
  app.post(
    '/',
    {
      schema: {
        body: AmbulanceBody,
      },
    },
    async (req: FastifyRequest<{ Body: AmbulanceBodyStatic }>, reply) => {
      try {
        app.log.info(`Registered Ambulance ${JSON.stringify(req.body)}`);
        if (req.body.vehicleNumber) {
          const validationRegex = new RegExp(
            '^[A-Za-z]{2}[0-3]{1,6}[A-Za-z0-9]{3}$'
          );

          if (!validationRegex.test(req.body.vehicleNumber)) {
            return httpResponseBuilder.BadRequest(
              'Invalid Registration Number'
            );
          }
        }
        return httpResponseBuilder.OK(
          await app.ambulanceApplicationService.create(
            app.hospitalApplicationService,
            req.body
          )
        );
      } catch (error: ResponseObject<string, number> | any) {
        app.log.error('Registered when Ambulance is register', error);
        reply.code(error.code);
        return httpResponseBuilder.BadRequest(error.message);
      }
    }
  );
}
