import {Title, Card, Button, TextInput, Stack} from '@mantine/core';
import {CreateProjectComponentProps} from './create-project.type';

export const CreateProjectComponent = ({
                                           newProject,
                                           setNewProject,
                                           isCreating,
                                           handleCreateProject,
                                       }: CreateProjectComponentProps) => {
    return (
        <Card withBorder shadow="sm" p="md">
            <Stack gap="md">
                <Title order={4}>Create New Project</Title>
                <TextInput
                    label="Name"
                    placeholder="Enter project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    disabled={isCreating}
                />
                <TextInput
                    label="Description"
                    placeholder="Enter project description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    disabled={isCreating}
                />
                <Button
                    onClick={handleCreateProject}
                    loading={isCreating}
                    disabled={!newProject.name || isCreating}
                >
                    Create Project
                </Button>
            </Stack>
        </Card>
    );
};
