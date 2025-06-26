import {useAuthStore} from '@store';
import {HomePage} from './home.page';
import {CreateProjectController, ProjectListController, UserAuthenticationController} from "./components";

export const HomeController = () => {
    const {isAuthenticated} = useAuthStore();
    return isAuthenticated ? <HomePage
        title={"Projects"}
        children={
            <>
                <CreateProjectController/>
                <ProjectListController/>
            </>
        }
    /> : <HomePage
        title={'Welcome to Nila Care'}
        children={<UserAuthenticationController/>}
    />
};
