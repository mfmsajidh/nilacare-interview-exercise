import {useState} from 'react';
import {useAuth} from '@hooks';
import type {AuthForm} from './user-authentication.type';
import {UserAuthenticationComponent} from "./user-authentication.component.tsx";

export const UserAuthenticationController = () => {
    const [authForm, setAuthForm] = useState<AuthForm>({email: '', password: ''});

    const {login, register, isLoggingIn, isRegistering} = useAuth();

    const handleRegister = () => {
        register(authForm);
        setAuthForm({email: '', password: ''});
    };

    const handleLogin = () => {
        login(authForm);
        setAuthForm({email: '', password: ''});
    };

    return <UserAuthenticationComponent
        authForm={authForm}
        setAuthForm={setAuthForm}
        isRegistering={isRegistering}
        isLoggingIn={isLoggingIn}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
    />
};
