import {type Static, Type} from "@sinclair/typebox";
import {TaskPriorityEnum, TaskStatusEnum} from "./common.dto";

export const ResponseSchema = Type.Object({
    id: Type.Number(),
    title: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    status: TaskStatusEnum,
    priority: TaskPriorityEnum,
    projectId: Type.Number()
})

export type ResponseDto = Static<typeof ResponseSchema>;
