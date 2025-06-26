import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
    searchTasksV1Options,
    searchTasksV1QueryKey,
    createTaskV1Mutation,
    updateTaskV1Mutation,
    deleteTaskV1Mutation
} from '@nila/client/src/@tanstack/react-query.gen';
import {errorNotification, successNotification} from "@utils";
import {CreateTaskDto, TaskFilter, UpdateTaskDto} from "@types";

export const useTasks = (filter: TaskFilter = {}) => {
    const queryClient = useQueryClient();

    const handleSuccess = (message?: string) => {
        queryClient.invalidateQueries({
            queryKey: searchTasksV1QueryKey({
                query: {...filter}
            })
        });
        if (message) {
            successNotification('Task updated successfully')
        }
    }

    const handleError = (error: Error, message: string) => {
        if (error.message.includes('401')) {
            localStorage.removeItem('token');
            window.location.href = '/';
            return;
        }
        errorNotification(error.message ?? message)
    }

    const {data: tasks = [], isLoading} = useQuery({
        ...searchTasksV1Options({
            query: {...filter},
        })
    });

    const {mutate: createTaskMutation} = useMutation({
        ...createTaskV1Mutation(),
        onSuccess: () => handleSuccess('Task created successfully'),
        onError: (error: Error) => handleError(error, 'Failed to create task'),
    });

    const {mutate: updateTaskMutation} = useMutation({
        ...updateTaskV1Mutation(),
        onSuccess: () => handleSuccess('Task updated successfully'),
        onError: (error: Error) => handleError(error, 'Failed to update task')
    });

    const {mutate: deleteTaskMutation} = useMutation({
        ...deleteTaskV1Mutation(),
        onSuccess: () => handleSuccess('Task deleted successfully'),
        onError: (error: Error) => handleError(error, 'Failed to delete task')
    });

    return {
        tasks,
        loading: isLoading,
        createTask: (task: CreateTaskDto) => createTaskMutation({body: task}),
        updateTask: (id: number, task: UpdateTaskDto) => updateTaskMutation({body: task, path: {id}}),
        deleteTask: (id: number) => deleteTaskMutation({path: {id}}),
    };
};
