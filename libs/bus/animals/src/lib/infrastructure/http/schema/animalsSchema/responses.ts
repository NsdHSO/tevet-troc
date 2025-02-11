import { HttpCodeW } from '@tevet-troc/http-response';
import { Type } from '@sinclair/typebox';

// Define the Header schema
export const AnimalsResponse = {
  [HttpCodeW.OK]: Type.Object({ name: Type.String() })
}
