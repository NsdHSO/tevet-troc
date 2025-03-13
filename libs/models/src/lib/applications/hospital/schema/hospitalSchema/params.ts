import { Static, Type } from '@sinclair/typebox';

export const FilterByHospital = Type.Object({
  fields: Type.Optional(
    Type.String({
      pattern: '^(?!,)([^,]+,)*[^,]+$',
      examples: ['age, bread'],
      description: 'Comma-separated list of fields without a trailing comma',
    }),
  ),
  filterBy: Type.Optional(
    Type.String({
      pattern: '^(?!,)([^,]+,)*[^,]+$',
      examples: ['age=2, bread=something'],
      description: 'key=value',
    }),
  ),
});

export type FilterTypeHospital = Static<typeof FilterByHospital>;
