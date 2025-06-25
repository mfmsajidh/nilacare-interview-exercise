import { create } from 'zustand';
import { client } from '@nila/client/src/client.gen';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

const token = localStorage.getItem('token');
if (token) {
  client.setConfig({
    baseUrl: import.meta.env.VITE_NILA_API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!token,
  token: token,
  setAuth: (token: string) => {
    localStorage.setItem('token', token);
    client.setConfig({ headers: { Authorization: `Bearer ${token}` } });
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    client.setConfig({ headers: {} });
    set({ isAuthenticated: false, token: null });
  },
}));
