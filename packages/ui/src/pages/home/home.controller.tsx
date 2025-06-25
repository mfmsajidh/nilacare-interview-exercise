import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../store';
import { useProjects, useAuth } from '../../hooks';
import { HomePageView } from './home.page';
import type { AuthForm, NewProjectForm } from './home.type';

export const HomeController = () => {
    const navigate = useNavigate();
    const [newProject, setNewProject] = useState<NewProjectForm>({ name: '', description: '' });
    const [authForm, setAuthForm] = useState<AuthForm>({ email: '', password: '' });

    const { isAuthenticated, logout } = useAuthStore();
    const { projects, loading: isProjectsLoading, createProject, isCreating } = useProjects();
    const { login, register, isLoggingIn, isRegistering } = useAuth();

    const handleRegister = () => {
        register(authForm);
        setAuthForm({ email: '', password: '' });
    };

    const handleLogin = () => {
        login(authForm);
        setAuthForm({ email: '', password: '' });
    };

    const handleCreateProject = () => {
        createProject(newProject);
        setNewProject({ name: '', description: '' });
    };

    return (
        <HomePageView
            navigate={navigate}
            newProject={newProject}
            setNewProject={setNewProject}
            authForm={authForm}
            setAuthForm={setAuthForm}
            isAuthenticated={isAuthenticated}
            logout={logout}
            isProjectsLoading={isProjectsLoading}
            isCreating={isCreating}
            projects={projects}
            isLoggingIn={isLoggingIn}
            isRegistering={isRegistering}
            handleRegister={handleRegister}
            handleLogin={handleLogin}
            handleCreateProject={handleCreateProject}
        />
    );
};
