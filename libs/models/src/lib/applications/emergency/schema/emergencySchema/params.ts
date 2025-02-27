import { Static, Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';

// Define the Header schema
export const EmergencyParams = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};

export const FilterByEmergency = Type.Object({
  fields: Type.Optional(
    Type.String({
      pattern: '^(?!,)([^,]+,)*[^,]+$',
      examples: ['age, bread'],
      description: 'Comma-separated list of fields without a trailing comma',
    })
  ),
  filterBy: Type.Optional(
    Type.String({
      pattern: '^(?!,)([^,]+,)*[^,]+$',
      examples: ['age=2, bread=something'],
      description: 'key=value',
    })
  ),
});

export type FilterTypeEmergency = Static<typeof FilterByEmergency>;
