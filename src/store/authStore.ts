import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';
import type { Profile, SignUpData } from '../types';

interface AuthState {
  user: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { user } = await authService.signIn(email, password);
      
      if (user) {
        const profile = await authService.getProfile(user.id);
        set({ user: profile });
      }
    } catch (error) {
      set({ error: 'Invalid email or password. Please try again.' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (data: SignUpData) => {
    try {
      set({ loading: true, error: null });
      const { user } = await authService.signUp(data);
      
      if (user) {
        const profile = await authService.getProfile(user.id);
        set({ user: profile });
      }
    } catch (error) {
      set({ error: 'Failed to create account. Please try again.' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        set({ user: null });
        return;
      }

      const profile = await authService.getProfile(user.id);
      set({ user: profile });
    } catch (error) {
      set({ error: 'Failed to fetch profile' });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));