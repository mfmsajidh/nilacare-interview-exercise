import {type Static, Type} from "@sinclair/typebox";

export const ResponseSchema = Type.Object({
    user: Type.Object({
        id: Type.Number({
            examples: [1]
        }),
        email: Type.String({
            format: 'email',
            examples: ['john.doe@example.com']
        }),
    }),
    token: Type.String({
        description: 'JWT token for authentication',
        examples: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...']
    }),
})

export type ResponseDto = Static<typeof ResponseSchema>;
