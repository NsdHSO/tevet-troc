import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';

// Extracting the `Union` types into separate constants
export const AnimalClassification = Type.Union([
    Type.Literal('string'),
    Type.Literal('Dog'),
    Type.Literal('Cat'),
    Type.Literal('Rabbit'),
    Type.Literal('Bird'),
    Type.Literal('Fish'),
    Type.Literal('Horse'),
    Type.Literal('Cow'),
]);

export const TypeGender = Type.Union([
    Type.Literal('Male'),
    Type.Literal('Female'),
]);

export const TypeFootCount = Type.Union([
    Type.Literal(0),
    Type.Literal(2),
    Type.Literal(4),
]);

export const TypeDiet = Type.Union([
    Type.Literal('Carnivore'),
    Type.Literal('Herbivore'),
    Type.Literal('Omnivore'),
]);

export const TypeTemperament = Type.Array(
    Type.Union([
        Type.Literal('Friendly'),
        Type.Literal('Energetic'),
        Type.Literal('Calm'),
        Type.Literal('Aggressive'),
    ])
);

export const TypeHomeEnvironment = Type.Union([
    Type.Literal('Apartment'),
    Type.Literal('House'),
    Type.Literal('Farm'),
    Type.Literal('Aquarium'),
    Type.Literal('Aviary'),
]);

export const AnimalSchema = Type.Object({
    id: Type.Optional(Type.Number()),
    name: Type.Optional(Type.String()),
    type: Type.Optional(AnimalClassification),
    breed: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    age: Type.Optional(Type.Number()),
    lifespan: Type.Optional(Type.Number()),
    weight: Type.Optional(
        Type.Object({
            min: Type.Optional(Type.Number()),
            max: Type.Optional(Type.Number()),
        })
    ),
    height: Type.Optional(
        Type.Object({
            min: Type.Optional(Type.Number()),
            max: Type.Optional(Type.Number()),
        })
    ),
    user: Type.Optional(
        Type.Object({
            uic: Type.Optional(Type.Number()),
            email: Type.Optional(Type.String()),
        })
    ),
    colors: Type.Optional(Type.Array(Type.String())),
    gender: Type.Optional(Type.Optional(TypeGender)),
    neutered: Type.Optional(Type.Boolean()),
    footCount: Type.Optional(Type.Optional(TypeFootCount)),
    diet: Type.Optional(Type.Optional(TypeDiet)),
    favoriteFoods: Type.Optional(Type.Array(Type.String())),
    temperament: Type.Optional(Type.Optional(TypeTemperament)),
    trained: Type.Optional(Type.Boolean()),
    skills: Type.Optional(Type.Array(Type.String())),
    owner: Type.Optional(
        Type.Object({
            name: Type.Optional(Type.String()),
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
    homeEnvironment: Type.Optional(Type.Optional(TypeHomeEnvironment)),
    sounds: Type.Optional(Type.Array(Type.String())),
    createdAt: Type.Optional(Type.String()),
    updatedAt: Type.Optional(Type.String()),
});

export const CreateAnimal = Type.Object({
    name: Type.String(),
    type: AnimalClassification
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
