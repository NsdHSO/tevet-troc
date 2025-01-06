import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';

export default async function animalRoutes(app: FastifyInstance) {
    app.post('/', {
        schema: {
            response: {
                404: Type.Object({
                    message: Type.String(),
                    code: Type.String(),
                })
            },
            body: Type.Object({
                name: Type.String(),
                type: Type.String({
                    examples: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Horse', 'Cow'],
                }),
            }),  // The schema to validate the incoming request body
        },
    }, async (req, reply) => {
        try {
            const animalData = req.body;  // The data coming in from the request
            const newAnimal = await app.animalService.create(animalData as { name: string, type: string });  // Call the service method to create the animal

            return reply.status(201).send(newAnimal);  // Return the created animal with a 201 status code
        } catch (err: any) {
            app.log.error(err);
            reply.code(404).send(err.message);

        }
    });

    app.setErrorHandler((err, req, res) => {
        if (err.validation) {
            const { validation, validationContext } = err;
            app.log.warn({ validationError: validation });
            res.code(400).send(validation);
        }else{
            app.log.error(err);
            res.status(500).send(err);
        }
    });
}