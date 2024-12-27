import { supabase } from '../lib/supabase';
import type { SignUpData } from '../types';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authService = {
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw new AuthError(error.message);
      if (!data.user) throw new AuthError('No user data returned');

      return data;
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  },

  async signUp({ email, password, fullName }: SignUpData) {
    try {
      // Check if user exists first
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (existingUser) {
        throw new AuthError('An account with this email already exists');
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim()
          }
        }
      });

      if (authError) throw new AuthError(authError.message);
      if (!authData.user) throw new AuthError('No user data returned');

      // Wait for trigger to create profile and account
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      return { user: authData.user, profile };
    } catch (error) {
      if (error instanceof AuthError) throw error;
      console.error('Signup error:', error);
      throw new AuthError('Failed to create account');
    }
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw new AuthError('Failed to fetch profile');
    return data;
  }
};