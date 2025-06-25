import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  searchTasksV1Options,
  searchTasksV1QueryKey,
  createTaskV1Mutation,
  updateTaskV1Mutation,
  deleteTaskV1Mutation
} from '@nila/client/src/@tanstack/react-query.gen';
import type { CreateTaskDto, UpdateTaskDto, TaskFilter } from '../../types/types';
import { errorNotification, successNotification } from "../utils/notifications";

export const useTasks = (filter: TaskFilter = {}) => {
  const queryClient = useQueryClient();

  console.log("filter", filter);
  const { data: tasks = [], isLoading } = useQuery({
    ...searchTasksV1Options({
      query: { ...filter },
    })
  });

  const { mutate: createTaskMutation } = useMutation({
    ...createTaskV1Mutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: searchTasksV1QueryKey({
          query: { ...filter }
        })
      });
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
      queryClient.invalidateQueries({
        queryKey: searchTasksV1QueryKey({
          query: { ...filter }
        })
      });
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
      queryClient.invalidateQueries({
        queryKey: searchTasksV1QueryKey({
          query: { ...filter }
        })
      });
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
