import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import paranduleaDao from '../dao/paranduleaDao';
import { ParanduleaEntity } from '../dao/parandulea.entity';
import {
  IParanduleaHttp,
  paranduleaApplicationService,
} from '../../applications';

declare module 'fastify' {
  interface FastifyInstance {
    paranduleaApplicationService: IParanduleaHttp;
    orm: any;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const paranduleaRepository = paranduleaDao(
      fastify.orm.getRepository(ParanduleaEntity)
    );
    const paranduleaService =
      paranduleaApplicationService(paranduleaRepository);
    fastify.decorate('paranduleaApplicationService', paranduleaService);
  } catch (error) {
    fastify.log.error('Error registering parandulea service:', error);
  }
});
