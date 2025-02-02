import { Type } from '@sinclair/typebox';


// Define the Header schema
export const AuthBearerHeader = Type.Object({
    Authorization:  Type.String({
        description: 'Authorization header with Bearer token',
        pattern: '^Bearer\\s.+$', // Validates "Bearer <token>" format
    }),
});
