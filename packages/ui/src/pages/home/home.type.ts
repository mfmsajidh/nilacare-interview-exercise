import type { NavigateFunction } from 'react-router';
import type { GetProjectByIdResponse } from '@nila/client/src';
import {Dispatch, SetStateAction} from "react";

export type AuthForm = {
    email: string;
    password: string;
};

export type NewProjectForm = {
    name: string;
    description: string;
};

export type HomePageViewProps = {
    navigate: NavigateFunction;
    newProject: NewProjectForm;
    setNewProject: Dispatch<SetStateAction<NewProjectForm>>;
    authForm: AuthForm;
    setAuthForm: Dispatch<SetStateAction<AuthForm>>;
    isAuthenticated: boolean;
    logout: () => void;
    isProjectsLoading: boolean;
    isCreating: boolean;
    projects: GetProjectByIdResponse[];
    isLoggingIn: boolean;
    isRegistering: boolean;
    handleRegister: () => void;
    handleLogin: () => void;
    handleCreateProject: () => void;
};
