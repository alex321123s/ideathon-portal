import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Admin email - only this user can access admin features
export const ADMIN_EMAIL = 'alexander.joseph.bell@gmail.com';

// Check if user is admin
export const isAdmin = (email: string | null | undefined): boolean => {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
};
