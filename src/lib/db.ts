// Database service layer for Supabase operations
import { supabase, isSupabaseConfigured } from './supabase';

// Types for our data
export interface DbUser {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  role: 'user' | 'admin';
  trust_score: number;
  events_participated: number;
  projects_completed: number;
  consultancies_provided: number;
  mvp_wins: number;
  total_collaboration_score: number;
  created_at: string;
  updated_at: string;
}

export interface DbEvent {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  generated_theme: string | null;
  state: 'upcoming' | 'registration_open' | 'team_formation' | 'sprint_active' | 'completed';
  registration_opens: string;
  registration_closes: string;
  team_formation_start: string;
  sprint_start: string;
  sprint_end: string;
  location: string;
  max_participants: number;
  current_participants: number;
  min_team_size: number;
  max_team_size: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// ============ USERS ============

export async function getUsers(): Promise<{ data: DbUser[]; error: Error | null }> {
  if (!supabase) return { data: [], error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data: (data as DbUser[]) || [], error: error as Error | null };
}

export async function getUserById(id: string): Promise<{ data: DbUser | null; error: Error | null }> {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data: data as DbUser | null, error: error as Error | null };
}

export async function updateUser(id: string, updates: Partial<DbUser>): Promise<{ data: DbUser | null; error: Error | null }> {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() } as never)
    .eq('id', id)
    .select()
    .single();
  
  return { data: data as DbUser | null, error: error as Error | null };
}

export async function deleteUser(id: string): Promise<{ error: Error | null }> {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  
  return { error: error as Error | null };
}

// ============ EVENTS ============

export async function getEvents(): Promise<{ data: DbEvent[]; error: Error | null }> {
  if (!supabase) return { data: [], error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('sprint_start', { ascending: false });
  
  return { data: (data as DbEvent[]) || [], error: error as Error | null };
}

export async function getEventById(id: string): Promise<{ data: DbEvent | null; error: Error | null }> {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data: data as DbEvent | null, error: error as Error | null };
}

export async function createEvent(event: Omit<DbEvent, 'id' | 'created_at' | 'updated_at' | 'current_participants'>): Promise<{ data: DbEvent | null; error: Error | null }> {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('events')
    .insert(event as never)
    .select()
    .single();
  
  return { data: data as DbEvent | null, error: error as Error | null };
}

export async function updateEvent(id: string, updates: Partial<DbEvent>): Promise<{ data: DbEvent | null; error: Error | null }> {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  
  const { data, error } = await supabase
    .from('events')
    .update({ ...updates, updated_at: new Date().toISOString() } as never)
    .eq('id', id)
    .select()
    .single();
  
  return { data: data as DbEvent | null, error: error as Error | null };
}

export async function deleteEvent(id: string): Promise<{ error: Error | null }> {
  if (!supabase) return { error: new Error('Supabase not configured') };
  
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  return { error: error as Error | null };
}

// ============ STORAGE (for image uploads) ============

export async function uploadEventImage(file: File, eventId: string): Promise<{ url: string | null; error: Error | null }> {
  if (!supabase) return { url: null, error: new Error('Supabase not configured') };
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${eventId}.${fileExt}`;
  const filePath = `events/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file, { upsert: true });
  
  if (uploadError) return { url: null, error: uploadError as Error };
  
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);
  
  return { url: publicUrl, error: null };
}

// ============ STATS ============

export async function getAdminStats(): Promise<{ data: { totalUsers: number; activeEvents: number; teamsFormed: number; pendingApprovals: number }; error: Error | null }> {
  if (!supabase) {
    return {
      data: { totalUsers: 0, activeEvents: 0, teamsFormed: 0, pendingApprovals: 0 },
      error: new Error('Supabase not configured')
    };
  }
  
  const [usersRes, eventsRes, teamsRes, pendingRes] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('events').select('id', { count: 'exact', head: true }).in('state', ['registration_open', 'team_formation', 'sprint_active']),
    supabase.from('teams').select('id', { count: 'exact', head: true }),
    supabase.from('event_registrations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);
  
  return {
    data: {
      totalUsers: usersRes.count || 0,
      activeEvents: eventsRes.count || 0,
      teamsFormed: teamsRes.count || 0,
      pendingApprovals: pendingRes.count || 0,
    },
    error: null,
  };
}

// ============ UTILITY ============

export { isSupabaseConfigured };
