import {type Static, Type} from '@sinclair/typebox';

export const TaskStatusEnum = Type.Union([
  Type.Literal('todo'),
  Type.Literal('in_progress'),
  Type.Literal('done'),
]);

export const TaskPriorityEnum = Type.Union([
  Type.Literal('low'),
  Type.Literal('medium'),
  Type.Literal('high'),
]);

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

export const TaskFilterSchema = Type.Object({
  status: Type.Optional(TaskStatusEnum),
  priority: Type.Optional(TaskPriorityEnum),
  projectId: Type.Optional(Type.Number({
    examples: [1]
  })),
}, {
  examples: [{
    status: 'todo',
    priority: 'high',
    projectId: 1
  }]
});

export type CreateTaskDto = Static<typeof CreateTaskSchema>;
export type UpdateTaskDto = Static<typeof UpdateTaskSchema>;
export type TaskFilterDto = Static<typeof TaskFilterSchema>;
