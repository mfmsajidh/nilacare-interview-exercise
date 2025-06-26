import {CreateTaskDto, Task, TaskPriority, TaskStatus} from "@types";

export type TaskFilter = {
    status?: TaskStatus;
    priority?: TaskPriority;
};

export interface TaskListComponentProps {
    tasks: Task[];
    loading: boolean;
    opened: boolean;
    open: () => void;
    close: () => void;
    selectedTask: Task | null;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, status: TaskStatus) => void;
    onSubmit: (values: CreateTaskDto) => void;
    onFilterChange: (field: 'status' | 'priority', value: TaskStatus | TaskPriority | null) => void;
    projectId: number;
}
