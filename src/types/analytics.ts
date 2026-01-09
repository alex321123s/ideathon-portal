// ============================================
// ANALYTICS & GAMIFICATION TYPES
// ============================================

// Seasons & Leagues
export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'champion';

export interface Season {
  id: string;
  name: string;
  number: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  theme?: string;
  rewards: SeasonReward[];
}

export interface SeasonReward {
  tier: LeagueTier;
  minRank: number;
  maxRank: number;
  rewards: {
    powerUps: string[];
    badges: string[];
    title?: string;
    exclusiveItems?: string[];
  };
}

export interface LeagueStanding {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  tier: LeagueTier;
  points: number;
  eventsCompleted: number;
  winRate: number;
  streak: number;
  previousRank?: number;
  movement: 'up' | 'down' | 'same';
}

export interface UserSeasonStats {
  seasonId: string;
  userId: string;
  tier: LeagueTier;
  rank: number;
  totalPoints: number;
  eventsParticipated: number;
  eventsWon: number;
  mvpCount: number;
  consultanciesProvided: number;
  averageCollaborationScore: number;
  peakRank: number;
  currentStreak: number;
  longestStreak: number;
}

// Personal Growth Analytics
export interface SuperpowerHistory {
  category: string;
  date: Date;
  selfRating: number;
  peerRating: number;
  verifiedScore: number;
  eventId?: string;
}

export interface GrowthMetric {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  percentChange: number;
  trend: 'improving' | 'declining' | 'stable';
  history: { date: Date; value: number }[];
}

export interface PersonalGrowthData {
  userId: string;
  superpowerHistory: SuperpowerHistory[];
  overallGrowth: number;
  strongestGrowthArea: string;
  areasForImprovement: string[];
  milestones: GrowthMilestone[];
  predictions: GrowthPrediction[];
}

export interface GrowthMilestone {
  id: string;
  title: string;
  description: string;
  achievedAt?: Date;
  progress: number;
  target: number;
  category: 'superpower' | 'collaboration' | 'leadership' | 'innovation';
}

export interface GrowthPrediction {
  category: string;
  predictedScore: number;
  confidence: number;
  timeframe: string;
  recommendations: string[];
}

// Team Performance Analytics
export interface TeamAnalytics {
  teamId: string;
  eventId: string;
  teamName: string;
  
  // Performance Metrics
  totalPoints: number;
  rank: number;
  percentile: number;
  
  // Collaboration Metrics
  collaborationScore: number;
  consensusSpeed: number; // Average time to reach consensus
  consensusRate: number; // % of votes that passed
  
  // Productivity Metrics
  slidesCompletedOnTime: number;
  milestonesHit: number;
  boostsUsed: number;
  roadblocksOvercome: number;
  
  // Team Dynamics
  memberContributions: MemberContribution[];
  communicationScore: number;
  synergyScore: number; // How well superpowers complemented each other
  
  // Comparative
  vsAverageTeam: number; // % better/worse than average
  vsTopTeam: number; // % of top team's performance
}

export interface MemberContribution {
  userId: string;
  displayName: string;
  superpower: string;
  pointsContributed: number;
  tasksCompleted: number;
  consensusParticipation: number;
  peerRating: number;
  mvpVotes: number;
}

// Innovation Metrics
export interface InnovationMetrics {
  eventId: string;
  
  // Question Quality
  questionCount: number;
  averageVotesPerQuestion: number;
  topQuestionKeywords: { keyword: string; count: number }[];
  
  // Solution Quality
  averageOriginalityScore: number;
  averageExecutionScore: number;
  averageFeasibilityScore: number;
  
  // Trends
  themeEmergence: { theme: string; strength: number }[];
  innovationTrends: { trend: string; direction: 'rising' | 'falling' | 'stable' }[];
}

// Collaboration Heatmap
export interface CollaborationConnection {
  userId1: string;
  userId2: string;
  collaborationCount: number;
  averageChemistryScore: number;
  sharedEvents: string[];
  sharedWins: number;
  lastCollaboration: Date;
}

export interface CollaborationNetwork {
  userId: string;
  connections: CollaborationConnection[];
  totalCollaborators: number;
  frequentCollaborators: string[];
  recommendedCollaborators: {
    userId: string;
    displayName: string;
    reason: string;
    compatibilityScore: number;
  }[];
}

// Sprint Replay
export interface SprintReplayEvent {
  timestamp: number; // Minutes into sprint
  type: 'slide_submit' | 'consensus_start' | 'consensus_end' | 'boost_purchase' | 'roadblock' | 'milestone' | 'consultancy';
  teamId: string;
  data: Record<string, unknown>;
  points?: number;
}

export interface SprintReplay {
  eventId: string;
  eventName: string;
  duration: number;
  teams: {
    id: string;
    name: string;
    finalRank: number;
    finalPoints: number;
  }[];
  timeline: SprintReplayEvent[];
  keyMoments: {
    timestamp: number;
    description: string;
    significance: 'high' | 'medium' | 'low';
  }[];
}

// Achievement System
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'sprint' | 'collaboration' | 'growth' | 'leadership' | 'special';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress: number;
  target: number;
  xpReward: number;
}

export interface AchievementChain {
  id: string;
  name: string;
  description: string;
  achievements: Achievement[];
  currentStep: number;
  totalSteps: number;
  ultimateReward: {
    title: string;
    badge: string;
    powerUp?: string;
  };
}

// XP & Leveling
export interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  title: string;
  perks: string[];
}

export interface XPTransaction {
  id: string;
  userId: string;
  amount: number;
  source: 'sprint' | 'achievement' | 'daily' | 'collaboration' | 'bonus';
  description: string;
  timestamp: Date;
}

// Streak System
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  streakType: 'daily_login' | 'weekly_sprint' | 'monthly_mvp';
  multiplier: number;
  nextMilestone: number;
  milestoneReward?: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar: string;
  value: number;
  tier?: LeagueTier;
  badge?: string;
}

export interface Leaderboard {
  id: string;
  name: string;
  type: 'global' | 'seasonal' | 'event' | 'weekly';
  category: 'points' | 'collaboration' | 'mvp' | 'consultancy' | 'streak';
  entries: LeaderboardEntry[];
  userRank?: number;
  updatedAt: Date;
}
