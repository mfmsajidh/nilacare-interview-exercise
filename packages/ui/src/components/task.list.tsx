import { useState } from 'react';
import {
  Grid,
  Title,
  Group,
  Button,
  Select,
  Stack,
  Text,
  LoadingOverlay,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TaskCard } from './task.card';
import { TaskForm } from './task.form';
import { useTasks } from '@hooks';
import type { Task, TaskStatus, TaskPriority, CreateTaskDto } from '../../types/types';

interface TaskListProps {
  projectId: number;
}

export function TaskList({ projectId }: TaskListProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<{ status?: TaskStatus; priority?: TaskPriority }>({});
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks({
    ...filter,
    projectId,
  });

  const handleStatusChange = (id: number, status: TaskStatus) => updateTask(id, {status});

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

  const handleFilterChange = (field: 'status' | 'priority', value: TaskStatus | TaskPriority | null) => {
    setFilter(prev => ({
      ...prev,
      [field]: value || undefined,
    }));
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Tasks</Title>
        <Button onClick={open}>Create Task</Button>
      </Group>

      <Group>
        <Select
          placeholder="Filter by status"
          clearable
          data={[
            { value: 'todo', label: 'To Do' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
          onChange={(value) => handleFilterChange('status', value as TaskStatus)}
        />
        <Select
          placeholder="Filter by priority"
          clearable
          data={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          onChange={(value) => handleFilterChange('priority', value as TaskPriority)}
        />
      </Group>

      <div style={{ position: 'relative', minHeight: '200px' }}>
        <LoadingOverlay visible={loading} />
        {tasks.length === 0 ? (
          <Text c="dimmed">No tasks found</Text>
        ) : (
          <Grid>
            {tasks.map((task) => (
              <Grid.Col key={task.id} span={4}>
                <TaskCard
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </div>

      <TaskForm
        opened={opened}
        onClose={() => {
          close();
          setSelectedTask(null);
        }}
        onSubmit={handleSubmit}
        initialValues={selectedTask || undefined}
        projectId={projectId}
      />
    </Stack>
  );
}
