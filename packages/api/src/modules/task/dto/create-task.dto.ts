import {type Static, Type} from "@sinclair/typebox";
import {TaskPriorityEnum, TaskStatusEnum} from "./common.dto";

export const CreateTaskSchema = Type.Object({
    title: Type.String({
        minLength: 1,
        maxLength: 255,
        examples: ['Implement user authentication']
    }),
    description: Type.Optional(Type.String({
        examples: ['Implement JWT based authentication with refresh token support']
    })),
    status: Type.Optional(TaskStatusEnum),
    priority: Type.Optional(TaskPriorityEnum),
    projectId: Type.Number({
        examples: [1]
    }),
}, {
    examples: [{
        title: 'Implement user authentication',
        description: 'Implement JWT based authentication with refresh token support',
        status: 'todo',
        priority: 'high',
        projectId: 1
    }]
});

export type CreateTaskDto = Static<typeof CreateTaskSchema>;
