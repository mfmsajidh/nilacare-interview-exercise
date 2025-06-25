import {type Static, Type} from "@sinclair/typebox";
import {TaskPriorityEnum, TaskStatusEnum} from "./common.dto";

export const TaskFilterSchema = Type.Object({
    status: Type.Optional(TaskStatusEnum),
    priority: Type.Optional(TaskPriorityEnum),
    projectId: Type.Optional(Type.Number()),
});

export type TaskFilterDto = Static<typeof TaskFilterSchema>;
