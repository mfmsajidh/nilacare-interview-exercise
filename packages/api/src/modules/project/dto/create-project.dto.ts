import {type Static, Type} from "@sinclair/typebox";

export const CreateProjectSchema = Type.Object({
    name: Type.String({
        minLength: 3,
        maxLength: 255,
        examples: ['Task Management System']
    }),
    description: Type.Optional(
        Type.String({
            maxLength: 1000,
            examples: ['A system to manage tasks and track their progress']
        })
    ),
}, {
    examples: [{
        name: 'Task Management System',
        description: 'A system to manage tasks and track their progress'
    }]
});

export type CreateProjectDto = Static<typeof CreateProjectSchema>;

