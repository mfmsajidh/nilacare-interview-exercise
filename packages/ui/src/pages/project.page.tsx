import { useParams, useNavigate } from 'react-router';
import { Container, Title, Paper, Text, Stack, Group, Button, LoadingOverlay } from '@mantine/core';
import { useProject } from '../hooks';
import { TaskList } from '../components/task.list';
import { useEffect } from 'react';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || '0', 10);
  const { project, isLoading } = useProject(projectId);

  useEffect(() => {
    if (project === undefined && !isLoading) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [project, isLoading, navigate]);

  if (project === undefined) {
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
