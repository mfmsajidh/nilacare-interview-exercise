import { useParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useProject } from '@hooks';
import { ProjectPageView } from './project.page';
import { useAuthStore } from '@store';

export const ProjectController = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id || '0', 10);
    const { project, isLoading } = useProject(projectId);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (project === undefined && !isLoading) {
            localStorage.removeItem('token');
            navigate('/');
        }
    }, [project, isLoading, navigate]);

    if (!project) return null;

    return (
        <ProjectPageView
            project={project}
            isLoading={isLoading}
            navigate={navigate}
        />
    );
};
