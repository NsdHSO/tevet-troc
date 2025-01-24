import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
export const TypeAnimal = Type.Union([Type.Literal('Dog'), Type.Literal('Cat'), Type.Literal('Rabbit'), Type.Literal('Bird'), Type.Literal('Fish'), Type.Literal('Horse'), Type.Literal('Cow')])
export const AnimalSchema = Type.Object({
    name: Type.String(),
    type: TypeAnimal, // Replace with valid `DomesticAnimalType` literals
    breed: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    age: Type.Optional(Type.Number()),
    lifespan: Type.Optional(Type.Number()),
    weight: Type.Optional(
        Type.Object({
            min: Type.Number(),
            max: Type.Number(),
        })
    ),
    height: Type.Optional(
        Type.Object({
            min: Type.Number(),
            max: Type.Number(),
        })
    ),
    user: Type.Object({
        uic: Type.Number(),
        email: Type.String(),
    }),
    colors: Type.Optional(Type.Array(Type.String())),
    gender: Type.Optional(Type.Union([Type.Literal('Male'), Type.Literal('Female')])),
    neutered: Type.Optional(Type.Boolean()),
    footCount: Type.Optional(Type.Union([Type.Literal(0), Type.Literal(2), Type.Literal(4)])),
    diet: Type.Optional(
        Type.Union([Type.Literal('Carnivore'), Type.Literal('Herbivore'), Type.Literal('Omnivore')])
    ),
    favoriteFoods: Type.Optional(Type.Array(Type.String())),
    temperament: Type.Optional(
        Type.Array(
            Type.Union([
                Type.Literal('Friendly'),
                Type.Literal('Energetic'),
                Type.Literal('Calm'),
                Type.Literal('Aggressive'),
            ])
        )
    ),
    trained: Type.Optional(Type.Boolean()),
    skills: Type.Optional(Type.Array(Type.String())),
    owner: Type.Optional(
        Type.Object({
            name: Type.String(),
            contact: Type.Optional(Type.String()),
        })
    ),
    health: Type.Optional(
        Type.Object({
            vaccinated: Type.Optional(Type.Boolean()),
            knownIssues: Type.Optional(Type.Array(Type.String())),
            lastVetVisit: Type.Optional(Type.String()),
        })
    ),
    activities: Type.Optional(Type.Array(Type.String())),
    homeEnvironment: Type.Optional(
        Type.Union([
            Type.Literal('Apartment'),
            Type.Literal('House'),
            Type.Literal('Farm'),
            Type.Literal('Aquarium'),
            Type.Literal('Aviary'),
        ])
    ),
    sounds: Type.Optional(Type.Array(Type.String())),
});

export const CreateAnimal = Type.Object({
    name: Type.String(),
    type: Type.String({ examples: '\'Dog\' | \'Cat\' | \'Rabbit\' | \'Bird\' | \'Fish\' | \'Horse\' | \'Cow\'' })
});

export const Created201 =
    Type.Object({
        [HttpCodeW.Created]: Type.Object({
            message: Type.String()
        })
    });

export const GetAll =
    {
        [HttpCodeW.OK]: Type.Object({
            message: Type.Array(AnimalSchema)
        }),
        [HttpCodeW.BadRequest || HttpCodeW.NotFound]: Type.Object({
            message: Type.String(),
            registered: Type.Boolean()
        })
    };


// Define the schema
