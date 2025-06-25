import {type Static, Type} from "@sinclair/typebox";

export const ResponseSchema = Type.Object({
    id: Type.Number(),
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
})

export type ResponseDto = Static<typeof ResponseSchema>;
