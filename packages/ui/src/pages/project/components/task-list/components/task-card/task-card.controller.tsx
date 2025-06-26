import type { TaskCardProps } from './task-card.type';
import { TaskCardComponent } from './task-card.component';

export const TaskCardController = (props: TaskCardProps) => {
    return <TaskCardComponent {...props} />;
};
