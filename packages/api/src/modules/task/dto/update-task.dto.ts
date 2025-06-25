import {type Static, Type} from '@sinclair/typebox';
import {TaskPriorityEnum, TaskStatusEnum} from "./common.dto";

export const UpdateTaskSchema = Type.Partial(
  Type.Object({
    title: Type.String({
      minLength: 1,
      maxLength: 255,
      examples: ['Updated: Implement user authentication']
    }),
    description: Type.Optional(Type.String({
      examples: ['Updated: Implement JWT based authentication with refresh token support']
    })),
    status: TaskStatusEnum,
    priority: TaskPriorityEnum,
  }), {
    examples: [{
      title: 'Updated: Implement user authentication',
      description: 'Updated: Implement JWT based authentication with refresh token support',
      status: 'in_progress',
      priority: 'high'
    }]
  }
);

export type UpdateTaskDto = Static<typeof UpdateTaskSchema>;
