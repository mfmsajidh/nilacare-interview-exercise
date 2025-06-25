import { FC } from 'react';
import { Container, Title, Paper, Text, Stack, Group, Button, LoadingOverlay } from '@mantine/core';
import { TaskList } from '../../components/task.list';
import type { ProjectPageProps } from './project.type';

export const ProjectPageView: FC<ProjectPageProps> = ({ project, isLoading, navigate, projectId }) => {
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
                        <Title order={1}>{project?.name}</Title>
                        <Text c="dimmed">{project?.description || ''}</Text>
                    </Stack>
                </Paper>

                <Paper p="md">
                    <TaskList projectId={projectId} />
                </Paper>
            </Stack>
        </Container>
    );
};
