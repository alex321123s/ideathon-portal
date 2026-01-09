// Supabase Database Types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
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
          inclusion_profile: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          username: string;
          display_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          role?: 'user' | 'admin';
          trust_score?: number;
          events_participated?: number;
          projects_completed?: number;
          consultancies_provided?: number;
          mvp_wins?: number;
          total_collaboration_score?: number;
          inclusion_profile?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          display_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          role?: 'user' | 'admin';
          trust_score?: number;
          events_participated?: number;
          projects_completed?: number;
          consultancies_provided?: number;
          mvp_wins?: number;
          total_collaboration_score?: number;
          inclusion_profile?: Json | null;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          generated_theme: string | null;
          theme_colors: Json | null;
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
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          generated_theme?: string | null;
          theme_colors?: Json | null;
          state?: 'upcoming' | 'registration_open' | 'team_formation' | 'sprint_active' | 'completed';
          registration_opens: string;
          registration_closes: string;
          team_formation_start: string;
          sprint_start: string;
          sprint_end: string;
          location: string;
          max_participants?: number;
          current_participants?: number;
          min_team_size?: number;
          max_team_size?: number;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          image_url?: string | null;
          generated_theme?: string | null;
          theme_colors?: Json | null;
          state?: 'upcoming' | 'registration_open' | 'team_formation' | 'sprint_active' | 'completed';
          registration_opens?: string;
          registration_closes?: string;
          team_formation_start?: string;
          sprint_start?: string;
          sprint_end?: string;
          location?: string;
          max_participants?: number;
          current_participants?: number;
          min_team_size?: number;
          max_team_size?: number;
          updated_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          question: string;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          question: string;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          event_id: string;
          project_question: string | null;
          points: number;
          consultancy_tokens: number;
          current_slide: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          event_id: string;
          project_question?: string | null;
          points?: number;
          consultancy_tokens?: number;
          current_slide?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          project_question?: string | null;
          points?: number;
          consultancy_tokens?: number;
          current_slide?: number;
          updated_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          team_id: string;
          user_id: string;
          role: 'leader' | 'member';
          superpower_focus: string | null;
          joined_at: string;
        };
        Insert: {
          id?: string;
          team_id: string;
          user_id: string;
          role?: 'leader' | 'member';
          superpower_focus?: string | null;
          joined_at?: string;
        };
        Update: {
          role?: 'leader' | 'member';
          superpower_focus?: string | null;
        };
      };
      superpowers: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          self_rating: number;
          peer_rating: number;
          verified_score: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          self_rating?: number;
          peer_rating?: number;
          verified_score?: number;
          updated_at?: string;
        };
        Update: {
          self_rating?: number;
          peer_rating?: number;
          verified_score?: number;
          updated_at?: string;
        };
      };
      badges: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          name: string;
          description: string;
          icon: string;
          rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
          event_id: string | null;
          earned_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          name: string;
          description: string;
          icon: string;
          rarity?: 'bronze' | 'silver' | 'gold' | 'platinum';
          event_id?: string | null;
          earned_at?: string;
        };
        Update: {
          type?: string;
          name?: string;
          description?: string;
          icon?: string;
          rarity?: 'bronze' | 'silver' | 'gold' | 'platinum';
        };
      };
      power_ups: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          name: string;
          description: string;
          icon: string;
          rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
          earned_at: string;
          used_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          name: string;
          description: string;
          icon: string;
          rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
          earned_at?: string;
          used_at?: string | null;
        };
        Update: {
          used_at?: string | null;
        };
      };
      gratitude_messages: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          message: string;
          event_id: string;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id: string;
          message: string;
          event_id: string;
          is_public?: boolean;
          created_at?: string;
        };
        Update: {
          is_public?: boolean;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          read?: boolean;
          action_url?: string | null;
          created_at?: string;
        };
        Update: {
          read?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Utility types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
