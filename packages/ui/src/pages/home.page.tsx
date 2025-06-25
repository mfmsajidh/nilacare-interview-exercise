import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Button, Group, TextInput, Stack, PasswordInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { loginV1Mutation, registerV1Mutation, getAllProjectsV1Options, createProjectV1Mutation } from '@nila/client/src/@tanstack/react-query.gen';
import { client } from '@nila/client/src/client.gen';

export const HomePage = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [newProject, setNewProject] = useState({ name: '', description: '' });
	const [authForm, setAuthForm] = useState({ email: '', password: '' });
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
			client.setConfig({ headers: { Authorization: `Bearer ${token}` } });
		}
	}, []);

	const { data: projects = [], isLoading: isProjectsLoading } = useQuery({
		...getAllProjectsV1Options(),
		enabled: isAuthenticated,
	});

	const { mutate: register, isPending: isRegistering } = useMutation({
		...registerV1Mutation({
			baseUrl: import.meta.env.VITE_NILA_API_URL
		}),
		onSuccess: (data) => {
			localStorage.setItem('token', data.token);
			client.setConfig({ headers: { Authorization: `Bearer ${data.token}` } });
			setIsAuthenticated(true);
			setAuthForm({ email: '', password: '' });
			notifications.show({
				title: 'Success',
				message: 'Registration successful',
				color: 'green',
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Registration failed',
				color: 'red',
			});
		},
	});

	const { mutate: login, isPending: isLoggingIn } = useMutation({
		...loginV1Mutation(),
		onSuccess: (data) => {
			localStorage.setItem('token', data.token);
			client.setConfig({ headers: { Authorization: `Bearer ${data.token}` } });
			setIsAuthenticated(true);
			setAuthForm({ email: '', password: '' });
			notifications.show({
				title: 'Success',
				message: 'Login successful',
				color: 'green',
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Login failed',
				color: 'red',
			});
		},
	});

	const { mutate: createProject, isPending: isCreatingProject } = useMutation({
		...createProjectV1Mutation(),
		onSuccess: () => {
			setNewProject({ name: '', description: '' });
			queryClient.invalidateQueries({ queryKey: ['getAllProjectsV1'] });
			notifications.show({
				title: 'Success',
				message: 'Project created successfully',
				color: 'green',
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Failed to create project',
				color: 'red',
			});
		},
	});

	const handleRegister = () => {
		register({ body: authForm });
	};

	const handleLogin = () => {
		login({ body: authForm });
	};

	const handleCreateProject = () => {
		createProject({ body: newProject });
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		client.setConfig({ headers: {} });
		setIsAuthenticated(false);
		queryClient.clear();
	};

	if (!isAuthenticated) {
		return (
			<Container>
				<Stack gap="xl">
					<Title order={2}>Welcome to Project Manager</Title>
					<Card withBorder shadow="sm" p="md">
						<Stack gap="md">
							<Title order={4}>Login or Register</Title>
							<TextInput
								label="Email"
								placeholder="Enter your email"
								value={authForm.email}
								onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
								disabled={isRegistering || isLoggingIn}
							/>
							<PasswordInput
								label="Password"
								placeholder="Enter your password"
								value={authForm.password}
								onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
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
				</Stack>
			</Container>
		);
	}

	return (
		<Container>
			<Stack gap="xl">
				<Group justify="space-between" align="center">
					<Title order={2}>Projects</Title>
					<Button
						variant="light"
						onClick={handleLogout}
						disabled={isProjectsLoading || isCreatingProject}
					>
						Logout
					</Button>
				</Group>

				<Card withBorder shadow="sm" p="md">
					<Stack gap="md">
						<Title order={4}>Create New Project</Title>
						<TextInput
							label="Name"
							placeholder="Enter project name"
							value={newProject.name}
							onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
							disabled={isCreatingProject}
						/>
						<TextInput
							label="Description"
							placeholder="Enter project description"
							value={newProject.description}
							onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
							disabled={isCreatingProject}
						/>
						<Button
							onClick={handleCreateProject}
							loading={isCreatingProject}
							disabled={!newProject.name || isCreatingProject}
						>
							Create Project
						</Button>
					</Stack>
				</Card>

				<Stack gap="md">
					{projects.map((project) => (
						<Card key={project.id} withBorder shadow="sm" p="md">
							<Group justify="space-between">
								<div>
									<Text fw={500} size="lg">{project.name}</Text>
									<Text c="dimmed" size="sm">{project.description}</Text>
								</div>
								<Button
									variant="light"
									onClick={() => navigate(`/projects/${project.id}`)}
									disabled={isProjectsLoading || isCreatingProject}
								>
									View Tasks
								</Button>
							</Group>
						</Card>
					))}
				</Stack>
			</Stack>
		</Container>
	);
};
