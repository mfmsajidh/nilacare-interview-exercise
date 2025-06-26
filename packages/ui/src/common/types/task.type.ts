import type { GetTaskByIdResponse } from "@nila/client/src";

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';
export type Task = GetTaskByIdResponse;

export interface CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    projectId: number;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
}

export interface TaskFilter {
    status?: TaskStatus;
    priority?: TaskPriority;
    projectId?: number;
}
