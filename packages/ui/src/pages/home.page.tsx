import { useState } from 'react';
import { Container, Title, Card, Text, Button, Group, TextInput, Stack, PasswordInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store';
import { useProjects, useAuth } from '../hooks';

export const HomePage = () => {
	const navigate = useNavigate();
	const [newProject, setNewProject] = useState({ name: '', description: '' });
	const [authForm, setAuthForm] = useState({ email: '', password: '' });
	const { isAuthenticated, logout } = useAuthStore();
	const { projects, loading: isProjectsLoading, createProject, isCreating } = useProjects();
	const { login, register, isLoggingIn, isRegistering } = useAuth();

	const handleRegister = () => {
		register(authForm);
		setAuthForm({ email: '', password: '' });
	};

	const handleLogin = () => {
		login(authForm);
		setAuthForm({ email: '', password: '' });
	};

	const handleCreateProject = () => {
		createProject(newProject);
		setNewProject({ name: '', description: '' });
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
						onClick={logout}
						disabled={isProjectsLoading || isCreating}
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
							disabled={isCreating}
						/>
						<TextInput
							label="Description"
							placeholder="Enter project description"
							value={newProject.description}
							onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
							disabled={isCreating}
						/>
						<Button
							onClick={handleCreateProject}
							loading={isCreating}
							disabled={!newProject.name || isCreating}
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
									disabled={isProjectsLoading || isCreating}
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
