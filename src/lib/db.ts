// Database service layer with localStorage fallback when Supabase isn't configured
import { supabase, isSupabaseConfigured as checkSupabaseConfigured } from './supabase';

// Re-export for external use
export const isSupabaseConfigured = checkSupabaseConfigured;

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

// ============ LOCAL STORAGE HELPERS ============
const EVENTS_KEY = 'ideathon_events';
const USERS_KEY = 'ideathon_users';

function getLocalEvents(): DbEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(EVENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setLocalEvents(events: DbEvent[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

function getLocalUsers(): DbUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setLocalUsers(users: DbUser[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ============ USERS ============

export async function getUsers(): Promise<{ data: DbUser[]; error: Error | null }> {
  if (supabase) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: (data as DbUser[]) || [], error: error as Error | null };
  }
  return { data: getLocalUsers(), error: null };
}

export async function getUserById(id: string): Promise<{ data: DbUser | null; error: Error | null }> {
  if (supabase) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    return { data: data as DbUser | null, error: error as Error | null };
  }
  return { data: getLocalUsers().find(u => u.id === id) || null, error: null };
}

export async function updateUser(id: string, updates: Partial<DbUser>): Promise<{ data: DbUser | null; error: Error | null }> {
  if (supabase) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() } as never)
      .eq('id', id)
      .select()
      .single();
    return { data: data as DbUser | null, error: error as Error | null };
  }
  const users = getLocalUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return { data: null, error: new Error('User not found') };
  users[index] = { ...users[index], ...updates, updated_at: new Date().toISOString() };
  setLocalUsers(users);
  return { data: users[index], error: null };
}

export async function deleteUser(id: string): Promise<{ error: Error | null }> {
  if (supabase) {
    const { error } = await supabase.from('users').delete().eq('id', id);
    return { error: error as Error | null };
  }
  setLocalUsers(getLocalUsers().filter(u => u.id !== id));
  return { error: null };
}

// ============ EVENTS ============

export async function getEvents(): Promise<{ data: DbEvent[]; error: Error | null }> {
  if (supabase) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('sprint_start', { ascending: false });
    return { data: (data as DbEvent[]) || [], error: error as Error | null };
  }
  const events = getLocalEvents();
  console.log('[DB] Getting events from localStorage:', events.length);
  return { data: events, error: null };
}

export async function getEventById(id: string): Promise<{ data: DbEvent | null; error: Error | null }> {
  if (supabase) {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    return { data: data as DbEvent | null, error: error as Error | null };
  }
  return { data: getLocalEvents().find(e => e.id === id) || null, error: null };
}

export async function createEvent(event: Omit<DbEvent, 'id' | 'created_at' | 'updated_at' | 'current_participants'>): Promise<{ data: DbEvent | null; error: Error | null }> {
  const now = new Date().toISOString();
  const newEvent: DbEvent = {
    ...event,
    id: crypto.randomUUID(),
    current_participants: 0,
    created_at: now,
    updated_at: now,
  };

  if (supabase) {
    const { data, error } = await supabase.from('events').insert(event as never).select().single();
    return { data: data as DbEvent | null, error: error as Error | null };
  }
  
  const events = getLocalEvents();
  events.unshift(newEvent);
  setLocalEvents(events);
  console.log('[DB] Created event:', newEvent.name, '- Total:', events.length);
  return { data: newEvent, error: null };
}

export async function updateEvent(id: string, updates: Partial<DbEvent>): Promise<{ data: DbEvent | null; error: Error | null }> {
  if (supabase) {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() } as never)
      .eq('id', id)
      .select()
      .single();
    return { data: data as DbEvent | null, error: error as Error | null };
  }
  const events = getLocalEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) return { data: null, error: new Error('Event not found') };
  events[index] = { ...events[index], ...updates, updated_at: new Date().toISOString() };
  setLocalEvents(events);
  return { data: events[index], error: null };
}

export async function deleteEvent(id: string): Promise<{ error: Error | null }> {
  if (supabase) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    return { error: error as Error | null };
  }
  setLocalEvents(getLocalEvents().filter(e => e.id !== id));
  return { error: null };
}

// ============ STORAGE ============

export async function uploadEventImage(file: File, eventId: string): Promise<{ url: string | null; error: Error | null }> {
  if (!supabase) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result as string, error: null });
      reader.onerror = () => resolve({ url: null, error: new Error('Failed to read file') });
      reader.readAsDataURL(file);
    });
  }
  
  const fileExt = file.name.split('.').pop();
  const filePath = 'events/' + eventId + '.' + fileExt;
  const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file, { upsert: true });
  if (uploadError) return { url: null, error: uploadError as Error };
  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
  return { url: publicUrl, error: null };
}

// ============ STATS ============

export async function getAdminStats(): Promise<{ data: { totalUsers: number; activeEvents: number; teamsFormed: number; pendingApprovals: number }; error: Error | null }> {
  if (supabase) {
    const [usersRes, eventsRes] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id', { count: 'exact', head: true }).in('state', ['registration_open', 'team_formation', 'sprint_active']),
    ]);
    return {
      data: { totalUsers: usersRes.count || 0, activeEvents: eventsRes.count || 0, teamsFormed: 0, pendingApprovals: 0 },
      error: null
    };
  }
  
  const users = getLocalUsers();
  const events = getLocalEvents();
  const activeEvents = events.filter(e => ['registration_open', 'team_formation', 'sprint_active'].includes(e.state));
  return {
    data: { totalUsers: users.length, activeEvents: activeEvents.length, teamsFormed: 0, pendingApprovals: 0 },
    error: null
  };
}
