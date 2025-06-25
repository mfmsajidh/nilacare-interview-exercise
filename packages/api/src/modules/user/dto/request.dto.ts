import {type Static, Type} from "@sinclair/typebox";

export const RequestSchema = Type.Object({
    email: Type.String({
        format: 'email',
        examples: ['john.doe@example.com']
    }),
    password: Type.String({
        minLength: 6,
        description: 'Password must be at least 6 characters long',
        examples: ['securePassword123']
    }),
}, {
    examples: [{
        email: 'john.doe@example.com',
        password: 'securePassword123'
    }]
});

export type RequestDto = Static<typeof RequestSchema>;
