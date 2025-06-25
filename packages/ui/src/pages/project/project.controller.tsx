import { useParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import {useProject} from "../../hooks";
import { ProjectPageView } from './project.page';
import type { ProjectPageProps } from './project.type';

export const ProjectController = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const projectId = parseInt(id || '0', 10);
    const { project, isLoading } = useProject(projectId);

    useEffect(() => {
        if (project === undefined && !isLoading) {
            localStorage.removeItem('token');
            navigate('/');
        }
    }, [project, isLoading, navigate]);

    if (!project) return null;

    const props: ProjectPageProps = {
        project,
        isLoading,
        navigate,
        projectId,
    };

    return <ProjectPageView {...props} />;
};
