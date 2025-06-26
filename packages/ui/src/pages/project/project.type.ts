import type { NavigateFunction } from 'react-router';
import type { GetProjectByIdResponse } from '@nila/client/src';

export type ProjectPageProps = {
    project: GetProjectByIdResponse;
    isLoading: boolean;
    navigate: NavigateFunction;
};
