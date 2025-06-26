import {Task} from "@types";

export interface TaskCardProps {
    task: Task;
    onStatusChange: (id: number, status: Task['status']) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
}

export const statusColors: Record<Task['status'], string> = {
    todo: 'blue',
    in_progress: 'yellow',
    done: 'green',
} as const;

export const priorityColors: Record<Task['priority'], string> = {
    low: 'gray',
    medium: 'blue',
    high: 'red',
} as const;
