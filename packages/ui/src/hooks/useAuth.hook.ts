import { useMutation } from '@tanstack/react-query';
import { loginV1Mutation, registerV1Mutation } from '@nila/client/src/@tanstack/react-query.gen';
import { useAuthStore } from '../store';
import { errorNotification, successNotification } from '../utils/notifications';

export const useAuth = () => {
  const { setAuth } = useAuthStore();

  const { mutate: register, isPending: isRegistering } = useMutation({
    ...registerV1Mutation(),
    onSuccess: (data) => {
      setAuth(data.token);
      successNotification('Registration successful');
    },
    onError: (error) => {
      errorNotification(error instanceof Error ? error.message : 'Registration failed');
    },
  });

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    ...loginV1Mutation(),
    onSuccess: (data) => {
      setAuth(data.token);
      successNotification('Login successful');
    },
    onError: (error) => {
      errorNotification(error instanceof Error ? error.message : 'Login failed');
    },
  });

  return {
    register: (credentials: { email: string; password: string }) => register({ body: credentials }),
    login: (credentials: { email: string; password: string }) => login({ body: credentials }),
    isRegistering,
    isLoggingIn,
  };
};
