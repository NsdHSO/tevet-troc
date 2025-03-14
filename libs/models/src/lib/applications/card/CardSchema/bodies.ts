import { Static, Type } from '@sinclair/typebox';

// Define Dashboard Schema
export const CardSchema = Type.Object({
  title: Type.String(),
  content: Type.String(),
  cardType: Type.Optional(Type.String()), // or use an enum type if you have one
  size: Type.Optional(Type.String()), // or use an enum type if you have one
  position: Type.Optional(Type.Number()),
  dataConfig: Type.Optional(Type.String()),
  dashboardName: Type.Optional(Type.String()), // Add dashboardName
});

// Infer TypeScript type from schema
export type CardBodyType = Static<typeof CardSchema>;
