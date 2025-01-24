import fp from 'fastify-plugin';
import fastifyJwt, { Secret } from '@fastify/jwt';
import { createError, httpResponseBuilder } from '../../../../infrastructure/models/error';
import { LoginUser } from '../../applications';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (req: FastifyRequest, repl: FastifyReply) => Promise<any>;
        generateRefreshToken: (req: FastifyRequest, repl: FastifyReply) => void;
    }

    interface FastifyRequest {
        generateToken: (reply) => { accessToken: string };
        refreshToken: () => { refreshToken: string };
        revokeToken: (reply) => void;

    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        user: LoginUser;
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

    fastify.decorateRequest('revokeToken', function (reply) { // [6]
        revokedTokens.set(this.user.jti, true);

        reply.setCookie('refreshToken', '', { // Set an empty string as the value
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 0, // Immediately expire the cookie
        });

        reply.setCookie('accessToken', '', { // Set an empty string as the value
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 0, // Immediately expire the cookie
        });
    });

    fastify.decorateRequest('generateToken', function (reply) { // [7]
        // Generate the access token
        const accessToken = fastify.jwt.sign(
            {
                id: String(this.user.id),
                username: this.user.username,
                email: this.user.email,
                uic: this.user.uic,
            },
            {
                jti: String(Date.now()),
                expiresIn: process.env.JWT_SECRET_SIGNING_EXPIRES_IN,
            }
        );

        reply.setCookie('refreshToken', this.user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        });
        reply.setCookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        });
        return {
            accessToken
        };
    });


    fastify.decorateRequest('refreshToken', function () {
        const refreshToken = fastify.jwt.sign(
            {
                id: String(JSON.stringify(this.body)),
            },
            {
                jti: String(Date.now()),
                expiresIn: process.env.REFRESH_SECRET_DEFAULT_TOKEN_EXPIRES_IN,
            });
        return {
            refreshToken
        };
    });
    fastify.decorate('generateRefreshToken', async function (request, reply) {
        const incomingRefreshToken = request.cookies?.refreshToken || request.body?.refreshToken;
        const incommingAccessToken = request.cookies?.accessToken;
        if (!incommingAccessToken) {
            return reply.send({ message: 'Access token not found' }).status(403);
        }
        if (!incomingRefreshToken) {
            return reply.send({ message: 'Refresh token not found' }).status(403);
        }
        try {
            const decodedRefreshToken = fastify.jwt.decode(incomingRefreshToken);
            const decodedAccessToken = fastify.jwt.decode(incommingAccessToken);
            if (!revokedTokens.has(decodedRefreshToken['jti'])) {
                request.user = {
                    ...JSON.parse(decodedRefreshToken['id']),
                    refreshToken: incomingRefreshToken,
                    uic: decodedAccessToken.uic
                };
            } else {
                throw httpResponseBuilder.NotFound('Refresh token was revoked');
            }
        } catch (error) {
            return reply.send({ message: error });
        }
    });
});