import {ProjectListComponent} from "./project-list.component";
import {useNavigate} from "react-router";
import {useProjects} from "@hooks";

export const ProjectListController = () => {
    const navigate = useNavigate();

    const {projects, loading: isProjectsLoading, isCreating} = useProjects();

    return <ProjectListComponent
        navigate={navigate}
        isCreating={isCreating}
        projects={projects}
        isProjectsLoading={isProjectsLoading}
    />
};
