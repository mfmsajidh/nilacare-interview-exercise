import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Title, Paper, Text, Stack, Group, Button, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { TaskList } from '../components/task.list';

interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || '0', 10);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/');
            return;
          }
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch project');
        }

        const data = await response.json();
        setProject(data);
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: error instanceof Error ? error.message : 'Failed to fetch project',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  if (!projectId) {
    return (
      <Container size="lg" py="xl">
        <Text c="red">Invalid project ID</Text>
      </Container>
    );
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
          <LoadingOverlay visible={loading} />
          <Stack gap="md">
            <Title order={1}>{project?.name || 'Loading...'}</Title>
            <Text c="dimmed">{project?.description || ''}</Text>
            {project && (
              <Group>
                <Text size="sm" c="dimmed">Created: {new Date(project.createdAt).toLocaleDateString()}</Text>
                <Text size="sm" c="dimmed">Updated: {new Date(project.updatedAt).toLocaleDateString()}</Text>
              </Group>
            )}
          </Stack>
        </Paper>

        <Paper p="md">
          <TaskList projectId={projectId} />
        </Paper>
      </Stack>
    </Container>
  );
}
