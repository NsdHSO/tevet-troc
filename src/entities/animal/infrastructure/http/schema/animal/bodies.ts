import { Type } from '@sinclair/typebox';

export const CreateAnimal = Type.Object({
    name: Type.String(),
    type: Type.String({examples: "'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Fish' | 'Horse' | 'Cow'"})
})

export const Created201 =
    Type.Object({
        201: Type.Object({
            message:Type.String()
        })})

