import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTasksV1Options, createTaskV1Mutation, updateTaskV1Mutation, deleteTaskV1Mutation } from '@nila/client/src/@tanstack/react-query.gen';
import type { CreateTaskDto, UpdateTaskDto, TaskFilter } from '../../types/types';
import {errorNotification, successNotification} from "../utils/notifications.tsx";

export const useTaskStore = (filter: TaskFilter = {}) => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery(
    getAllTasksV1Options({
      query: { filter },
    })
  );

  const { mutate: createTaskMutation } = useMutation({
    ...createTaskV1Mutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllTasksV1'] });
      successNotification('Task created successfully')
    },
    onError: (error) => {
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
      }
      errorNotification(error instanceof Error ? error.message : 'Failed to create task')
    },
  });

  const { mutate: updateTaskMutation } = useMutation({
    ...updateTaskV1Mutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllTasksV1'] });
      successNotification('Task updated successfully')
    },
    onError: (error) => {
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
      }
      errorNotification(error instanceof Error ? error.message : 'Failed to update task')
    },
  });

  const { mutate: deleteTaskMutation } = useMutation({
    ...deleteTaskV1Mutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllTasksV1'] });
      successNotification('Task deleted successfully')
    },
    onError: (error) => {
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
      }
      errorNotification(error instanceof Error ? error.message : 'Failed to delete task')
    },
  });

  return {
    tasks,
    loading: isLoading,
    createTask: (task: CreateTaskDto) => createTaskMutation({ body: task }),
    updateTask: (id: number, task: UpdateTaskDto) => updateTaskMutation({ body: task, path: { id } }),
    deleteTask: (id: number) => deleteTaskMutation({ path: { id } }),
  };
};
