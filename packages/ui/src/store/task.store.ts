import { create } from 'zustand';
import { notifications } from '@mantine/notifications';
import type { Task, CreateTaskDto, UpdateTaskDto, TaskFilter } from '../../types/types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  fetchTasks: (filter?: TaskFilter) => Promise<void>;
  createTask: (task: CreateTaskDto) => Promise<void>;
  updateTask: (id: number, task: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const API_URL = 'http://localhost:3000/v1';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  filter: {},

  setFilter: (filter) => {
    set({ filter });
    get().fetchTasks(filter);
  },

  fetchTasks: async (filter = get().filter) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        return;
      }

      const queryParams = new URLSearchParams();
      if (filter.status) queryParams.append('status', filter.status);
      if (filter.priority) queryParams.append('priority', filter.priority);
      if (filter.projectId) queryParams.append('projectId', filter.projectId.toString());

      const response = await fetch(`${API_URL}/tasks?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to fetch tasks');
      }

      set({ tasks: Array.isArray(data) ? data : [] });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to fetch tasks',
        color: 'red',
      });
      set({ tasks: [] });
    } finally {
      set({ loading: false });
    }
  },

  createTask: async (task: CreateTaskDto) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        return;
      }

      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to create task');
      }

      await get().fetchTasks();
      notifications.show({
        title: 'Success',
        message: 'Task created successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to create task',
        color: 'red',
      });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (id: number, task: UpdateTaskDto) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        return;
      }

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to update task');
      }

      await get().fetchTasks();
      notifications.show({
        title: 'Success',
        message: 'Task updated successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to update task',
        color: 'red',
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id: number) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/';
        return;
      }

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to delete task');
      }

      await get().fetchTasks();
      notifications.show({
        title: 'Success',
        message: 'Task deleted successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to delete task',
        color: 'red',
      });
    } finally {
      set({ loading: false });
    }
  },
}));
