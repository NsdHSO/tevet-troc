import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import userDao from '../dao/userDao';
import { UserEntity } from '../dao/user.entity';
import { IUserRepository, userAuthApplicationService } from '../../applications';
import { IUserHttp } from '../http/model';

declare module 'fastify' {
    interface FastifyInstance {
        userAuthApplicationService: IUserHttp;
    }
}
export default fp(
    async (fastify: FastifyInstance) => {
        try {
            fastify.log.info('Generating UserAuth plugin');
            const userRepository = userDao(fastify.orm.getRepository(UserEntity));
            const userService = userAuthApplicationService(userRepository);
            fastify.decorate('userAuthApplicationService', userService);
        } catch (error) {
            fastify.log.error('Error registering auth service:', error);
        }
    }
);