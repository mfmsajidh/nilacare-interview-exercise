declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.css' {}
declare module '*.png' {}

export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
	id: number;
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	projectId: number;
	createdAt: string;
	updatedAt: string;
}

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
