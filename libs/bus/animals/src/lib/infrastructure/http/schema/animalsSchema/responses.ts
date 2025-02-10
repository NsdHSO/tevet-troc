import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';

// Define the Header schema
export const AnimalsResponse = Type.Object({
  [HttpCodeW.OK]: Type.Object({ name: Type.String() }),
});
