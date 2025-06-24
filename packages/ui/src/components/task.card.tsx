import { Card, Badge, Button, Text, Group, ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconTrash, IconEdit } from '@tabler/icons-react';
import type { Task, TaskStatus } from '../../types/types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const statusColors = {
  todo: 'blue',
  in_progress: 'yellow',
  done: 'green',
} as const;

const priorityColors = {
  low: 'gray',
  medium: 'blue',
  high: 'red',
} as const;

export function TaskCard({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>{task.title}</Text>
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconEdit size="1rem" />} onClick={() => onEdit(task)}>
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size="1rem" />}
              c="red"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {task.description && (
        <Text size="sm" c="dimmed" mb="md">
          {task.description}
        </Text>
      )}

      <Group justify="space-between" mt="md">
        <Group gap="xs">
          <Badge color={statusColors[task.status]} variant="light">
            {task.status.replace('_', ' ')}
          </Badge>
          <Badge color={priorityColors[task.priority]} variant="light">
            {task.priority}
          </Badge>
        </Group>

        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <Button variant="light" size="xs">
              Change Status
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => onStatusChange(task.id, 'todo')}>
              To Do
            </Menu.Item>
            <Menu.Item onClick={() => onStatusChange(task.id, 'in_progress')}>
              In Progress
            </Menu.Item>
            <Menu.Item onClick={() => onStatusChange(task.id, 'done')}>
              Done
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Card>
  );
}
