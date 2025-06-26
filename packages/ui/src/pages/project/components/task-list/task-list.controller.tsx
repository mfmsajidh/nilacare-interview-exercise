import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useTasks } from '@hooks';
import { TaskListComponent } from './task-list.component';
import type { Task, CreateTaskDto } from '../../../../../types/types';
import type { TaskFilter, TaskListProps } from './task-list.type';

export function TaskListController({ projectId }: TaskListProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState<TaskFilter>({});
    const { tasks, loading, createTask, updateTask, deleteTask } = useTasks({
        ...filter,
        projectId,
    });

    const handleStatusChange = (id: number, status: Task['status']) => {
        updateTask(id, { status });
    };

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        open();
    };

    const handleDelete = (id: number) => deleteTask(id);

    const handleSubmit = (values: CreateTaskDto) => {
        if (selectedTask) {
            updateTask(selectedTask.id, values);
        } else {
            createTask(values);
        }
        close();
    };

    const handleFilterChange = (
        field: keyof TaskFilter,
        value: TaskFilter[keyof TaskFilter] | null
    ) => {
        setFilter((prev) => ({
            ...prev,
            [field]: value || undefined,
        }));
    };

    return (
        <TaskListComponent
            tasks={tasks}
            loading={loading}
            opened={opened}
            open={open}
            close={close}
            selectedTask={selectedTask}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onSubmit={handleSubmit}
            onFilterChange={handleFilterChange}
            projectId={projectId}
        />
    );
}
