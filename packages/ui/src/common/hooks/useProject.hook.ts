import { useQuery } from '@tanstack/react-query';
import { getProjectByIdV1Options } from '@nila/client/src/@tanstack/react-query.gen';

export const useProject = (projectId: number) => {
  const query = getProjectByIdV1Options({ path: { id: projectId } });

  const { data: project, isLoading } = useQuery({
    ...query,
    enabled: !!projectId,
  });

  return {
    project,
    isLoading,
  };
};
