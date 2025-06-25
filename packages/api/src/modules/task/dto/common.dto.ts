import {type Static, Type} from "@sinclair/typebox";

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

export type TaskStatusEnumDto = Static<typeof TaskStatusEnum>;
export type TaskPriorityEnumDto = Static<typeof TaskPriorityEnum>;
