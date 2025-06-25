import {Title, Card, Button, Group, TextInput, Stack, PasswordInput} from '@mantine/core';
import {UserAuthenticationComponentProps} from './user-authentication.type';

export const UserAuthenticationComponent = ({
                                                authForm,
                                                setAuthForm,
                                                isRegistering,
                                                isLoggingIn,
                                                handleLogin,
                                                handleRegister,
                                            }: UserAuthenticationComponentProps) => {
    return (
        <Card withBorder shadow="sm" p="md">
            <Stack gap="md">
                <Title order={4}>Login or Register</Title>
                <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                    disabled={isRegistering || isLoggingIn}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    disabled={isRegistering || isLoggingIn}
                />
                <Group>
                    <Button
                        onClick={handleLogin}
                        loading={isLoggingIn}
                        disabled={!authForm.email || !authForm.password || isRegistering || isLoggingIn}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={handleRegister}
                        variant="light"
                        loading={isRegistering}
                        disabled={!authForm.email || !authForm.password || isRegistering || isLoggingIn}
                    >
                        Register
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
};
