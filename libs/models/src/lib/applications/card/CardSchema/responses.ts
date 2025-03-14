import { Type } from '@sinclair/typebox';
import { CardSchema } from './bodies';

export const cardResponseSchema = Type.Object({
  message: CardSchema,
  code: Type.String(),
});
