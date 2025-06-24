import { useState, useEffect } from 'react';
import { Container, Title, Card, Text, Button, Group, TextInput, Stack, PasswordInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { notifications } from '@mantine/notifications';

interface Project {
	id: number;
	name: string;
	description: string;
}

export const HomePage = () => {
	const navigate = useNavigate();
	const [projects, setProjects] = useState<Project[]>([]);
	const [newProject, setNewProject] = useState({ name: '', description: '' });
	const [authForm, setAuthForm] = useState({ email: '', password: '' });
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsAuthenticated(true);
			fetchProjects();
		}
	}, []);

	const handleRegister = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('http://localhost:3000/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authForm),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || 'Registration failed');
			}

			localStorage.setItem('token', data.token);
			setIsAuthenticated(true);
			setAuthForm({ email: '', password: '' });

			notifications.show({
				title: 'Success',
				message: 'Registration successful',
				color: 'green',
			});

			fetchProjects();
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Registration failed',
				color: 'red',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(authForm),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			localStorage.setItem('token', data.token);
			setIsAuthenticated(true);
			setAuthForm({ email: '', password: '' });

			notifications.show({
				title: 'Success',
				message: 'Login successful',
				color: 'green',
			});

			fetchProjects();
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Login failed',
				color: 'red',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const fetchProjects = async () => {
		try {
			setIsLoading(true);
			const token = localStorage.getItem('token');
			if (!token) {
				setIsAuthenticated(false);
				return;
			}

			const response = await fetch('http://localhost:3000/projects', {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			const data = await response.json();
			if (!response.ok) {
				if (response.status === 401) {
					setIsAuthenticated(false);
					localStorage.removeItem('token');
					return;
				}
				throw new Error(data.message || 'Failed to fetch projects');
			}

			setProjects(Array.isArray(data) ? data : []);
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Failed to fetch projects',
				color: 'red',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const createProject = async () => {
		try {
			setIsLoading(true);
			const token = localStorage.getItem('token');
			if (!token) {
				setIsAuthenticated(false);
				return;
			}

			const response = await fetch('http://localhost:3000/projects', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify(newProject),
			});

			const data = await response.json();
			if (!response.ok) {
				if (response.status === 401) {
					setIsAuthenticated(false);
					localStorage.removeItem('token');
					return;
				}
				throw new Error(data.message || 'Failed to create project');
			}

			setNewProject({ name: '', description: '' });
			fetchProjects();

			notifications.show({
				title: 'Success',
				message: 'Project created successfully',
				color: 'green',
			});
		} catch (error) {
			notifications.show({
				title: 'Error',
				message: error instanceof Error ? error.message : 'Failed to create project',
				color: 'red',
			});
		} finally {
			setIsLoading(false);
		}
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
								disabled={isLoading}
							/>
							<PasswordInput
								label="Password"
								placeholder="Enter your password"
								value={authForm.password}
								onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
								disabled={isLoading}
							/>
							<Group>
								<Button
									onClick={handleLogin}
									loading={isLoading}
									disabled={!authForm.email || !authForm.password || isLoading}
								>
									Login
								</Button>
								<Button
									onClick={handleRegister}
									variant="light"
									loading={isLoading}
									disabled={!authForm.email || !authForm.password || isLoading}
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
						onClick={() => {
							localStorage.removeItem('token');
							setIsAuthenticated(false);
							setProjects([]);
						}}
						disabled={isLoading}
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
							disabled={isLoading}
						/>
						<TextInput
							label="Description"
							placeholder="Enter project description"
							value={newProject.description}
							onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
							disabled={isLoading}
						/>
						<Button
							onClick={createProject}
							loading={isLoading}
							disabled={!newProject.name || isLoading}
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
									disabled={isLoading}
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
