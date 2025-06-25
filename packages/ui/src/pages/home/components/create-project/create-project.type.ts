import {Dispatch, SetStateAction} from "react";

export type NewProjectForm = {
    name: string;
    description: string;
};

export type CreateProjectComponentProps = {
    newProject: NewProjectForm;
    setNewProject: Dispatch<SetStateAction<NewProjectForm>>;
    isCreating: boolean;
    handleCreateProject: () => void;
};
