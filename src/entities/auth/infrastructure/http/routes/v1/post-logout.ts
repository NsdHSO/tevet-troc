import { FastifyInstance } from 'fastify';
import { Header } from '../../schema';
import { handleError } from '../../../errors/handling';

export default function logout(app: FastifyInstance) {
    app.post('/logout', {
        onRequest: [app.authenticate],
        schema: {
            tags: ['auth'],
            headers: Header
        }
    }, async (req, reply) => {
        try{
            req.revokeToken(reply);
            const revokeRefreshTokenFromDB = app.userAuthApplicationService.logout(req.user.email)
        }catch (error) {
            return handleError(error, app, reply);
        }

    });
}