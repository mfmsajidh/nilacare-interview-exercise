import {
    TextInput,
    Textarea,
    Select,
    Button,
    Stack,
    Group,
    Modal,
} from '@mantine/core';
import {TaskFormComponentProps} from "./task-form.type";

export const TaskFormComponent = ({
                                      opened,
                                      onClose,
                                      handleSubmit,
                                      form,
                                      initialValues,
                                  }: TaskFormComponentProps) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={initialValues ? 'Edit Task' : 'Create Task'}
            size="md"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                    <TextInput
                        required
                        label="Title"
                        placeholder="Enter task title"
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        label="Description"
                        placeholder="Enter task description"
                        {...form.getInputProps('description')}
                    />

                    <Select
                        label="Status"
                        data={[
                            {value: 'todo', label: 'To Do'},
                            {value: 'in_progress', label: 'In Progress'},
                            {value: 'done', label: 'Done'},
                        ]}
                        {...form.getInputProps('status')}
                    />

                    <Select
                        label="Priority"
                        data={[
                            {value: 'low', label: 'Low'},
                            {value: 'medium', label: 'Medium'},
                            {value: 'high', label: 'High'},
                        ]}
                        {...form.getInputProps('priority')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialValues ? 'Update' : 'Create'} Task
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
