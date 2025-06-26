import {useQuery, useQueryClient} from '@tanstack/react-query';
import { getProjectByIdV1Options } from '@nila/client/src/@tanstack/react-query.gen';
import {useAuthStore} from "@store";

export const useProject = (projectId: number) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const query = getProjectByIdV1Options({ path: { id: projectId } });

  const { data: project, isLoading } = useQuery({
    ...query,
    enabled: !!projectId && isAuthenticated
  });

  if (!isAuthenticated) {
    queryClient.cancelQueries({ queryKey: query.queryKey });
  }

  return {
    project,
    isLoading,
  };
};
