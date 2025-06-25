import {Card, Text, Button, Group, Stack} from '@mantine/core';
import {ProjectListComponentProps} from "./project-list.type.ts";

export const ProjectListComponent = ({
                                         navigate,
                                         isCreating,
                                         projects,
                                         isProjectsLoading,
                                     }: ProjectListComponentProps) => {
    return (
        <Stack gap="md">
            {projects.map((project) => (
                <Card key={project.id} withBorder shadow="sm" p="md">
                    <Group justify="space-between">
                        <div>
                            <Text fw={500} size="lg">{project.name}</Text>
                            <Text c="dimmed" size="sm">{project.description}</Text>
                        </div>
                        <Button
                            variant="light"
                            onClick={() => navigate(`/projects/${project.id}`)}
                            disabled={isProjectsLoading || isCreating}
                        >
                            View Tasks
                        </Button>
                    </Group>
                </Card>
            ))}
        </Stack>
    );
};
