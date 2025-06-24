import { useForm } from '@mantine/form';
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Stack,
  Group,
  Modal,
} from '@mantine/core';
import type { Task, CreateTaskDto, TaskStatus, TaskPriority } from '../../types/types';

interface TaskFormProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateTaskDto) => void;
  initialValues?: Task;
  projectId: number;
}

export function TaskForm({
  opened,
  onClose,
  onSubmit,
  initialValues,
  projectId,
}: TaskFormProps) {
  const form = useForm<CreateTaskDto>({
    initialValues: initialValues ? {
      title: initialValues.title,
      description: initialValues.description || '',
      status: initialValues.status,
      priority: initialValues.priority,
      projectId: initialValues.projectId,
    } : {
      title: '',
      description: '',
      status: 'todo' as TaskStatus,
      priority: 'medium' as TaskPriority,
      projectId,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
    },
  });

  const handleSubmit = (values: CreateTaskDto) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialValues ? 'Edit Task' : 'Create Task'}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Title"
            placeholder="Enter task title"
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Description"
            placeholder="Enter task description"
            {...form.getInputProps('description')}
          />

          <Select
            label="Status"
            data={[
              { value: 'todo', label: 'To Do' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'done', label: 'Done' },
            ]}
            {...form.getInputProps('status')}
          />

          <Select
            label="Priority"
            data={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            {...form.getInputProps('priority')}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialValues ? 'Update' : 'Create'} Task
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
