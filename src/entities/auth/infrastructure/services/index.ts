import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import userDao from '../dao/userDao';
import { UserEntity } from '../dao/user.entity';
import jwtPlugin from './jwt';
import { IUserHttp, userAuthApplicationService } from '../../applications';

declare module 'fastify' {
    interface FastifyInstance {
        userAuthApplicationService: IUserHttp;
    }
}
export default fp(
    async (fastify: FastifyInstance) => {
        try {
            fastify.register(jwtPlugin);
            const userRepository = userDao(fastify.orm.getRepository(UserEntity));
            const userService = userAuthApplicationService(userRepository);
            fastify.decorate('userAuthApplicationService', userService);
        } catch (error) {
            fastify.log.error('Error registering auth service:', error);
        }
    }
);
