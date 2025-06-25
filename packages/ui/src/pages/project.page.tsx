import { useParams, useNavigate } from 'react-router';
import { Container, Title, Paper, Text, Stack, Group, Button, LoadingOverlay } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getProjectByIdV1Options } from '@nila/client/src/@tanstack/react-query.gen';
import { TaskList } from '../components/task.list';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || '0', 10);

  const query = getProjectByIdV1Options({ path: { id: projectId } });
  const { data: project, isLoading } = useQuery({
    ...query,
    enabled: !!projectId,
  });

  if (project === undefined) {
    localStorage.removeItem('token');
    navigate('/');
    return null;
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group>
          <Button variant="light" onClick={() => navigate('/')}>
            Back to Projects
          </Button>
        </Group>

        <Paper p="md" pos="relative">
          <LoadingOverlay visible={isLoading} />
          <Stack gap="md">
            <Title order={1}>{project?.name || 'Loading...'}</Title>
            <Text c="dimmed">{project?.description || ''}</Text>
          </Stack>
        </Paper>

        <Paper p="md">
          <TaskList projectId={projectId} />
        </Paper>
      </Stack>
    </Container>
  );
}
