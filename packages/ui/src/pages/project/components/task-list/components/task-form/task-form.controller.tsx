import { useForm } from '@mantine/form';
import type { CreateTaskDto } from '../../../../../../../types/types';
import type { TaskFormProps } from './task-form.type';
import { TaskFormComponent } from './task-form.component';

export const TaskFormController = ({
                                       opened,
                                       onClose,
                                       onSubmit,
                                       initialValues,
                                       projectId,
                                   }: TaskFormProps) => {
    const form = useForm<CreateTaskDto>({
        initialValues: initialValues
            ? {
                title: initialValues.title,
                description: initialValues.description || '',
                status: initialValues.status,
                priority: initialValues.priority,
                projectId: initialValues.projectId,
            }
            : {
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                projectId,
            },
        validate: {
            title: (value) => (!value ? 'Title is required' : null),
        },
    });

    const handleSubmit = (values: CreateTaskDto) => {
        onSubmit(values);
        form.reset();
        onClose();
    };

    return (
        <TaskFormComponent
            opened={opened}
            onClose={onClose}
            handleSubmit={handleSubmit}
            form={form}
            initialValues={initialValues}
        />
    );
};
