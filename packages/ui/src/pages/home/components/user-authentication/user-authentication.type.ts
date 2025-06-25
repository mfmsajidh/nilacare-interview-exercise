import {Dispatch, SetStateAction} from "react";

export type AuthForm = {
    email: string;
    password: string;
};

export type UserAuthenticationComponentProps = {
    authForm: AuthForm;
    setAuthForm: Dispatch<SetStateAction<AuthForm>>;
    isLoggingIn: boolean;
    isRegistering: boolean;
    handleRegister: () => void;
    handleLogin: () => void;
};
