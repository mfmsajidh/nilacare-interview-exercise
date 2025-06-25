import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProjectsV1Options, createProjectV1Mutation, getAllProjectsV1QueryKey } from '@nila/client/src/@tanstack/react-query.gen';
import type { CreateProjectDto } from '../../types/types';
import {errorNotification, successNotification} from "../utils/notifications";
import { useAuthStore } from '@store';

export const useProjects = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const { data: projects = [], isLoading } = useQuery({
    ...getAllProjectsV1Options(),
    enabled: isAuthenticated,
  });

  const { mutate: createProject, isPending: isCreating } = useMutation({
    ...createProjectV1Mutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAllProjectsV1QueryKey()
      });
      successNotification('Project created successfully')
    },
    onError: (error) => {
      if (error instanceof Error && error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
      }
      errorNotification(error instanceof Error ? error.message : 'Failed to create project')
    },
  });

  return {
    projects,
    loading: isLoading,
    createProject: (project: CreateProjectDto) => createProject({ body: project }),
    isCreating,
  };
};
