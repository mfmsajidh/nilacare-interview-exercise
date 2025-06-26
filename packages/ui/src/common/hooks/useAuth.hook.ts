import {useMutation} from '@tanstack/react-query';
import {loginV1Mutation, registerV1Mutation} from '@nila/client/src/@tanstack/react-query.gen';
import {useAuthStore} from '@store';
import {errorNotification, successNotification} from '@utils';

export const useAuth = () => {
    const {setAuth} = useAuthStore();

    const handleSuccess = (token: string, message: string) => {
      setAuth(token);
      successNotification(message);
    }

    const {mutate: register, isPending: isRegistering} = useMutation({
        ...registerV1Mutation(),
        onSuccess: (data) => handleSuccess(data.token, 'Registration successful'),
        onError: (error: Error) => errorNotification(error.message ?? 'Registration failed')
    });

    const {mutate: login, isPending: isLoggingIn} = useMutation({
        ...loginV1Mutation(),
        onSuccess: (data) => handleSuccess(data.token, 'Login successful'),
        onError: (error: Error) => errorNotification(error.message ?? 'Login failed')
    });

    return {
        register: (credentials: { email: string; password: string }) => register({body: credentials}),
        login: (credentials: { email: string; password: string }) => login({body: credentials}),
        isRegistering,
        isLoggingIn,
    };
};
