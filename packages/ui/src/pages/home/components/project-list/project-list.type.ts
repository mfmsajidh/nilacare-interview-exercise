import type {NavigateFunction} from "react-router";
import type { GetProjectByIdResponse } from '@nila/client/src';

export type ProjectListComponentProps = {
    navigate: NavigateFunction;
    isProjectsLoading: boolean;
    isCreating: boolean;
    projects: GetProjectByIdResponse[];
};
