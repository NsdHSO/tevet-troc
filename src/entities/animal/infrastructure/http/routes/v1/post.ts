import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { AuthBearerHeader } from '../../../../../auth/infrastructure/http/schema';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
import { CreateAnimal } from '../../schema/animal/bodies';

export default async function animalRoutes(app: FastifyInstance) {
    app.post('/', {
        schema: {
            response: {
                [HttpCodeW.NotFound]: Type.Object({
                    message: Type.String(),
                    code: Type.String(),
                })
            },
            body: CreateAnimal,
            headers: AuthBearerHeader,
            tags: ['animal'],
        },
        onRequest: [app.authenticate]
    }, async (req, reply) => {
        try {
            const animalData = req.body;  // The data coming in from the request
            const newAnimal = await app.animalService.create(animalData as { name: string, type: string }, {
                uic: req
                    .user.uic,
                email: req.user.email,
            });  // Call the service method to create the animal

            return reply.status(HttpCodeW.Created).send(newAnimal);  // Return the created animal with a 201 status code
        } catch (err: any) {
            app.log.error(err);
            reply.code(HttpCodeW.NotFound).send(err.message);

        }
    });

    app.setErrorHandler((err, req, res) => {
        if (err.validation) {
            const {
                validation,
                validationContext
            } = err;
            app.log.warn({ validationError: validation });
            res.code(HttpCodeW.BadRequest).send(validation);
        } else {
            app.log.error(err);
            res.status(HttpCodeW.InternalServerError).send(err);
        }
    });
}