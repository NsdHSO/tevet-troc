import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { IHomeHttp, homeApplicationService } from '../../applications';
import { DataSource } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    homeApplicationService: IHomeHttp;
    orm: DataSource;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const homeService = homeApplicationService();
    fastify.decorate('homeApplicationService', homeService);
  } catch (error) {
    fastify.log.error(`Error registering home service: ${error}`);
  }
});
