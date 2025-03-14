import { Static, Type } from '@sinclair/typebox';

// Define Dashboard Schema
export const DashboardSchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  isActive: Type.Optional(Type.Boolean()),
  ownerId: Type.Optional(Type.Number()),
  layoutConfig: Type.Optional(Type.String()),
  cards: Type.Optional(
    Type.Array(
      Type.Object({
        title: Type.String(),
        content: Type.String(),
        cardType: Type.Optional(Type.String()), // or use an enum type if you have one
        position: Type.Optional(Type.Number()),
        size: Type.Optional(Type.String()), // or use an enum type if you have one
        dataConfig: Type.Optional(Type.String()),
      }),
    ),
  ),
});

// Infer TypeScript type from schema
export type DashboardBodyType = Static<typeof DashboardSchema>;
