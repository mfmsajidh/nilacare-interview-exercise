import type {UseFormReturnType} from "@mantine/form";
import {CreateTaskDto, Task} from "@types";

export interface TaskFormProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (values: CreateTaskDto) => void;
    initialValues?: Task;
    projectId: number;
}

export interface TaskFormComponentProps {
    opened: boolean;
    onClose: () => void;
    handleSubmit: (values: CreateTaskDto) => void;
    form: UseFormReturnType<CreateTaskDto>;
    initialValues?: Task;
}
