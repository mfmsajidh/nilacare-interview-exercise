import {
    Button,
    Grid,
    Group,
    LoadingOverlay,
    Paper,
    Select,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import type {TaskStatus, TaskPriority} from '../../../../../types/types';
import {TaskListComponentProps} from "./task-list.type";
import {TaskFormController} from "../task-form";
import {TaskCardController} from "../task-card";

export function TaskListComponent({
                                      tasks,
                                      loading,
                                      opened,
                                      open,
                                      close,
                                      selectedTask,
                                      onEdit,
                                      onDelete,
                                      onStatusChange,
                                      onSubmit,
                                      onFilterChange,
                                      projectId,
                                  }: TaskListComponentProps) {
    return (
        <Paper p="md">
            <Stack gap="lg">
                <Group justify="space-between">
                    <Title order={2}>Tasks</Title>
                    <Button onClick={open}>Create Task</Button>
                </Group>

                <Group>
                    <Select
                        placeholder="Filter by status"
                        clearable
                        data={[
                            {value: 'todo', label: 'To Do'},
                            {value: 'in_progress', label: 'In Progress'},
                            {value: 'done', label: 'Done'},
                        ]}
                        onChange={(value) => onFilterChange('status', value as TaskStatus)}
                    />
                    <Select
                        placeholder="Filter by priority"
                        clearable
                        data={[
                            {value: 'low', label: 'Low'},
                            {value: 'medium', label: 'Medium'},
                            {value: 'high', label: 'High'},
                        ]}
                        onChange={(value) => onFilterChange('priority', value as TaskPriority)}
                    />
                </Group>

                <div style={{position: 'relative', minHeight: '200px'}}>
                    <LoadingOverlay visible={loading}/>
                    {tasks.length === 0 ? (
                        <Text c="dimmed">No tasks found</Text>
                    ) : (
                        <Grid>
                            {tasks.map((task) => (
                                <Grid.Col key={task.id} span={4}>
                                    <TaskCardController
                                        task={task}
                                        onStatusChange={onStatusChange}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                    )}
                </div>

                <TaskFormController
                    opened={opened}
                    onClose={() => {
                        close();
                    }}
                    onSubmit={onSubmit}
                    initialValues={selectedTask || undefined}
                    projectId={projectId}
                />
            </Stack>
        </Paper>
    );
}
