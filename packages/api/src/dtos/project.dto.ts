import {type Static, Type} from '@sinclair/typebox';

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

export const UpdateProjectSchema = Type.Partial(Type.Object({
  name: Type.String({
    minLength: 3,
    maxLength: 255,
    examples: ['Updated: Task Management System']
  }),
  description: Type.Optional(
    Type.String({
      maxLength: 1000,
      examples: ['Updated: A system to manage tasks and track their progress']
    })
  ),
}, {
  examples: [{
    name: 'Updated: Task Management System',
    description: 'Updated: A system to manage tasks and track their progress'
  }]
}));

export type CreateProjectDto = Static<typeof CreateProjectSchema>;
export type UpdateProjectDto = Static<typeof UpdateProjectSchema>;
