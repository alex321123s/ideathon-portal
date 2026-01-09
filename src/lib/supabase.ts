import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if credentials are provided
export const supabase: SupabaseClient<Database> | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;

// Admin email - only this user can access admin features
export const ADMIN_EMAIL = 'alexander.joseph.bell@gmail.com';

// Check if user is admin
export const isAdmin = (email: string | null | undefined): boolean => {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
};

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};
