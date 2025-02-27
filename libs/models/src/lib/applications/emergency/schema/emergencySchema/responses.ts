import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';
import { EmergencyObject } from './bodies';

const MessageItemSchema = Type.Object({
  ...EmergencyObject.properties, // Spread properties from EmergencyItemSchema
  modificationAttempts: Type.Optional(Type.String()),
});

export const EmergencyResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.Array(MessageItemSchema),
    code: Type.String(),
  }),
};
export const CreatedUpdatedEmergencyResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};
