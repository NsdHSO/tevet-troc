import fp from 'fastify-plugin';
import fastifyJwt, { Secret } from '@fastify/jwt';
import { randomBytes } from 'node:crypto';
import userDao from '../dao/userDao';
import { UserEntity } from '../dao/user.entity';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (req: FastifyRequest, repl: FastifyReply) => Promise<any>
        generateToken: any,
    }

    interface FastifyRequest {
        generateToken: () => Promise<any>,
        revokeToken: () => void;
    }
}
export default fp(async function (fastify, opts) {
    // Register the JWT plugin
    const revokedTokens = new Map(); // [2]

    fastify.register(fastifyJwt, { // [3]
        secret: process.env.JWT_SECRET_SIGNING as Secret,
        trusted: function isTrusted(request, decodedToken) {
            return !revokedTokens.has(decodedToken.jti);
        }
    });

    fastify.decorate('authenticate', async function authenticate(request, reply) { // [4]
        try {
            await request.jwtVerify(); // [5]
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.decorateRequest('revokeToken', function () { // [6]
        revokedTokens.set(this.user.jti, true);
    });

    fastify.decorateRequest('generateToken', async function () { // [7]
        // Generate the access token
        const accessToken = fastify.jwt.sign(
            {
                id: String(this.user.id),
                username: this.user.username,
                email: this.user.email,
            },
            {
                jti: String(Date.now()),
                expiresIn: process.env.JWT_SECRET_SIGNING_EXPIRES_IN,
            }
        );

        return {
            accessToken,
            refreshToken :this.user.refreshToken,
        };
    });
});