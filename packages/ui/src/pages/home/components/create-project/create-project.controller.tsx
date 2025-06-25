import {useState} from 'react';
import {useProjects} from "@hooks";
import type {NewProjectForm} from './create-project.type';
import {CreateProjectComponent} from "./create-project.component";

export const CreateProjectController = () => {
    const [newProject, setNewProject] = useState<NewProjectForm>({name: '', description: ''});

    const {createProject, isCreating} = useProjects();

    const handleCreateProject = () => {
        createProject(newProject);
        setNewProject({name: '', description: ''});
    };

    return <CreateProjectComponent
        newProject={newProject}
        setNewProject={setNewProject}
        isCreating={isCreating}
        handleCreateProject={handleCreateProject}
    />
};
