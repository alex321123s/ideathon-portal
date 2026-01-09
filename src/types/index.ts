// ============================================
// IDEATHON PORTAL - TYPE DEFINITIONS
// ============================================

// Power-up Types
export type PowerUpType = 
  | 'roadblock_shield'
  | 'double_spark'
  | 'master_consultant'
  | 'time_warp'
  | 'insight_boost'
  | 'team_sync';

export interface PowerUp {
  id: string;
  type: PowerUpType;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
  usedAt?: Date;
  eventId?: string;
}

// Superpower Categories
export type SuperpowerCategory = 
  | 'design'
  | 'strategy'
  | 'storytelling'
  | 'prototyping'
  | 'research'
  | 'technical';

export interface SuperpowerRating {
  category: SuperpowerCategory;
  selfRating: number;
  peerRating: number;
  verifiedScore: number;
}

// Badge Types
export type BadgeType = 
  | 'bridge_builder'
  | 'mvp'
  | 'consensus_champion'
  | 'rapid_responder'
  | 'inclusion_advocate'
  | 'spark_igniter'
  | 'mentor'
  | 'innovator';

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  eventId: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
}

// Gratitude/Kudos
export interface GratitudeMessage {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  message: string;
  eventId: string;
  eventName: string;
  createdAt: Date;
  isPublic: boolean;
}

// Inclusion Profile
export interface InclusionProfile {
  screenReaderFriendly: boolean;
  prefersWrittenCommunication: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  reducedMotion: boolean;
  largeText: boolean;
  customNeeds: string[];
}

// User Profile
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedAt: Date;
  
  // Superpowers
  superpowers: SuperpowerRating[];
  
  // Legacy Vault
  powerUps: PowerUp[];
  
  // Gratitude Feed
  gratitudeMessages: GratitudeMessage[];
  gratitudeVisibility: 'public' | 'private' | 'teammates_only';
  
  // Inclusion Profile
  inclusionProfile: InclusionProfile;
  
  // Trophy Case
  badges: Badge[];
  
  // Stats
  eventsParticipated: number;
  projectsCompleted: number;
  consultanciesProvided: number;
  mvpWins: number;
  totalCollaborationScore: number;
  
  // Trust Score (calculated from gratitude)
  trustScore: number;
}

// Event States
export type EventState = 
  | 'upcoming'
  | 'registration_open'
  | 'team_formation'
  | 'sprint_active'
  | 'presentation'
  | 'rating'
  | 'completed';

// Event Project/Question
export interface EventProject {
  id: string;
  question: string;
  submittedBy: string;
  votes: number;
  isSponsored: boolean;
  sponsorName?: string;
  sponsorLogo?: string;
  selected: boolean;
  keywords: string[];
}

// Event
export interface IdeathonEvent {
  id: string;
  name: string;
  generatedTheme?: string;
  themeColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  state: EventState;
  registrationOpens: Date;
  registrationCloses: Date;
  teamFormationStart: Date;
  sprintStart: Date;
  sprintEnd: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  projects: EventProject[];
  finalProjects: EventProject[];
  createdAt: Date;
}

// Team
export interface Team {
  id: string;
  name: string;
  eventId: string;
  members: TeamMember[];
  projectId: string;
  projectQuestion: string;
  
  // Milestones
  selectedMilestones: Milestone[];
  
  // Resources
  consultancyTokens: number;
  points: number;
  
  // Sprint State
  currentSlide: number;
  slides: Slide[];
  
  // Consensus Votes
  activeConsensusVote?: ConsensusVote;
  
  // Power-ups equipped
  equippedPowerUps: PowerUp[];
  
  // Active boosts
  activeBoosts: ActiveBoost[];
  
  // Roadblocks
  activeRoadblock?: Roadblock;
}

export interface TeamMember {
  userId: string;
  user: User;
  role: 'leader' | 'member';
  joinedAt: Date;
  superpowerFocus: SuperpowerCategory;
}

// Milestones
export type MilestoneType = 
  | 'user_research'
  | 'prototype_draft'
  | 'inclusion_audit'
  | 'business_model'
  | 'technical_spec'
  | 'presentation_outline';

export interface Milestone {
  id: string;
  type: MilestoneType;
  name: string;
  description: string;
  dueMinute: number;
  points: number;
  completed: boolean;
  completedAt?: Date;
}

// Slides
export interface Slide {
  id: string;
  slideNumber: number;
  type: 'user_persona' | 'solution_sketch' | 'inclusion_audit';
  content: string;
  imageUrl?: string;
  completed: boolean;
  submittedAt?: Date;
  points: number;
}

// Consensus Voting
export interface ConsensusVote {
  id: string;
  teamId: string;
  question: string;
  options: string[];
  votes: { [userId: string]: string };
  requiredPercentage: number;
  expiresAt: Date;
  resolved: boolean;
  result?: string;
}

// Boosts
export type BoostType = 
  | 'deep_focus'
  | 'ai_ghostwriter'
  | 'hall_shoutout'
  | 'time_extension';

export interface Boost {
  type: BoostType;
  name: string;
  description: string;
  cost: number;
  duration: number; // in minutes
}

export interface ActiveBoost {
  boost: Boost;
  activatedAt: Date;
  expiresAt: Date;
}

// Roadblocks
export type RoadblockType = 
  | 'the_pivot'
  | 'silent_sprint'
  | 'resource_drain'
  | 'role_swap'
  | 'constraint_challenge';

export interface Roadblock {
  id: string;
  type: RoadblockType;
  name: string;
  description: string;
  duration: number; // in minutes
  startedAt: Date;
  endsAt: Date;
  canBeShielded: boolean;
  isShielded: boolean;
}

// Consultancy
export interface ConsultancyRequest {
  id: string;
  fromTeamId: string;
  fromTeamName: string;
  toUserId: string;
  toUserName: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  superpowerNeeded: SuperpowerCategory;
  description: string;
  createdAt: Date;
  completedAt?: Date;
  pointsEarned?: number;
}

// Challenges
export interface Challenge {
  id: string;
  minute: number;
  slideNumber: number;
  type: 'user_persona' | 'solution_sketch' | 'inclusion_audit';
  title: string;
  description: string;
  reward: number;
  deadline: Date;
  completed: boolean;
}

// Ratings
export interface TeamRating {
  fromUserId: string;
  toUserId: string;
  teamId: string;
  eventId: string;
  rating: number;
  feedback: string;
  isMvpVote: boolean;
  createdAt: Date;
}

export interface ProjectRating {
  jurerId: string;
  teamId: string;
  eventId: string;
  originalityScore: number;
  executionScore: number;
  feedback: string;
  createdAt: Date;
}

// Memory Wall
export interface MemoryWallEntry {
  id: string;
  eventId: string;
  eventName: string;
  teamId: string;
  teamName: string;
  projectQuestion: string;
  slides: Slide[];
  teamMembers: TeamMember[];
  totalPoints: number;
  collaborationScore: number;
  badges: Badge[];
  createdAt: Date;
  canPickUpBaton: boolean;
  sponsorInterest?: {
    sponsorName: string;
    contactEmail: string;
    message: string;
  };
}

// Sprint Timer State
export interface SprintState {
  eventId: string;
  startTime: Date;
  currentMinute: number;
  isPaused: boolean;
  phase: 'active' | 'milestone1' | 'roadblock' | 'milestone2' | 'asset_sprint' | 'lockdown' | 'loot_drop';
  challenges: Challenge[];
  activeRoadblock?: Roadblock;
}

// Loot Drop
export interface LootDrop {
  id: string;
  userId: string;
  eventId: string;
  powerUp: PowerUp;
  revealedAt?: Date;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  type: 'challenge' | 'roadblock' | 'consensus' | 'consultancy' | 'milestone' | 'loot' | 'kudos';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
