import {FC} from 'react';
import {Container, Title, Paper, Text, Stack, Group, Button, LoadingOverlay} from '@mantine/core';
import type {ProjectPageProps} from './project.type';
import {TaskListController} from "./components";

export const ProjectPageView: FC<ProjectPageProps> = ({project, isLoading, navigate}) => {
    return (
        <Container>
            <Stack gap="xl">
                <Group justify="space-between" align="center">
                    <Paper p="md" pos="relative">
                        <LoadingOverlay visible={isLoading}/>
                        <Stack gap="md">
                            <Title order={1}>{project?.name}</Title>
                            <Text c="dimmed">{project?.description || ''}</Text>
                        </Stack>
                    </Paper>
                    <Button variant="light" onClick={() => navigate('/')}>
                        Back to Projects
                    </Button>
                </Group>

                <TaskListController/>
            </Stack>
        </Container>
    );
};
