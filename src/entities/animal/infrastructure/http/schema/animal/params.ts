import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
import { AnimalEntity } from '../../../dao/animal.entity';

export const AnimalId = Type.Object({
    animalId: Type.Number(),
});

export const FilterByAnimal = Type.Object({
    fields: Type.Optional(Type.String({
        pattern: "^(?!,)([^,]+,)*[^,]+$", // Does not start or end with a comma
        examples:["age, bread"],
        description: "Comma-separated list of fields without a trailing comma"
    })),
});
