import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User,
  IdeathonEvent,
  Team,
  PowerUp,
  Badge,
  GratitudeMessage,
  Notification,
  SprintState,
  ConsultancyRequest,
  ConsensusVote,
  LootDrop,
  MemoryWallEntry,
  SuperpowerCategory,
} from '@/types';

// Mock Data Generators
const generateMockUser = (): User => ({
  id: 'user-1',
  email: 'citizen@ideathon.io',
  username: 'spark_citizen',
  displayName: 'Alex Innovator',
  avatar: '/avatars/default.png',
  bio: 'Passionate about collaborative innovation and inclusive design.',
  joinedAt: new Date('2024-01-15'),
  superpowers: [
    { category: 'design', selfRating: 8, peerRating: 7.5, verifiedScore: 7.8 },
    { category: 'strategy', selfRating: 7, peerRating: 8, verifiedScore: 7.5 },
    { category: 'storytelling', selfRating: 9, peerRating: 8.5, verifiedScore: 8.8 },
    { category: 'prototyping', selfRating: 6, peerRating: 6.5, verifiedScore: 6.2 },
    { category: 'research', selfRating: 7, peerRating: 7, verifiedScore: 7 },
    { category: 'technical', selfRating: 5, peerRating: 5.5, verifiedScore: 5.2 },
  ],
  powerUps: [
    {
      id: 'pu-1',
      type: 'roadblock_shield',
      name: 'Roadblock Shield',
      description: 'Protect your team from one roadblock event',
      icon: '🛡️',
      rarity: 'rare',
      earnedAt: new Date('2024-06-15'),
    },
    {
      id: 'pu-2',
      type: 'double_spark',
      name: 'Double Spark',
      description: 'Start with extra votes in the online phase',
      icon: '⚡',
      rarity: 'epic',
      earnedAt: new Date('2024-08-20'),
    },
  ],
  gratitudeMessages: [
    {
      id: 'gm-1',
      fromUserId: 'user-2',
      fromUserName: 'Sarah Chen',
      fromUserAvatar: '/avatars/sarah.png',
      message: 'Your design insights transformed our pitch completely. Amazing collaboration!',
      eventId: 'event-1',
      eventName: 'Innovation Sprint 2024',
      createdAt: new Date('2024-06-16'),
      isPublic: true,
    },
    {
      id: 'gm-2',
      fromUserId: 'user-3',
      fromUserName: 'Marcus Johnson',
      fromUserAvatar: '/avatars/marcus.png',
      message: 'Best teammate ever! Your storytelling skills are unmatched.',
      eventId: 'event-2',
      eventName: 'Summer Ideathon',
      createdAt: new Date('2024-08-21'),
      isPublic: true,
    },
  ],
  gratitudeVisibility: 'public',
  inclusionProfile: {
    screenReaderFriendly: false,
    prefersWrittenCommunication: false,
    colorBlindMode: 'none',
    reducedMotion: false,
    largeText: false,
    customNeeds: [],
  },
  badges: [
    {
      id: 'badge-1',
      type: 'bridge_builder',
      name: 'Bridge Builder',
      description: 'Provided consultancy to 5+ teams across events',
      icon: '🌉',
      earnedAt: new Date('2024-06-15'),
      eventId: 'event-1',
      rarity: 'gold',
    },
    {
      id: 'badge-2',
      type: 'mvp',
      name: 'MVP',
      description: 'Voted Most Valuable Participant by teammates',
      icon: '🏆',
      earnedAt: new Date('2024-08-20'),
      eventId: 'event-2',
      rarity: 'platinum',
    },
  ],
  eventsParticipated: 5,
  projectsCompleted: 4,
  consultanciesProvided: 12,
  mvpWins: 2,
  totalCollaborationScore: 4250,
  trustScore: 94,
});

const generateActiveSprintEvent = (): IdeathonEvent => ({
  id: 'event-sprint-active',
  name: 'Live Innovation Sprint',
  generatedTheme: 'Future of Urban Mobility',
  themeColors: {
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FBBF24',
  },
  state: 'sprint_active',
  registrationOpens: new Date('2026-01-01'),
  registrationCloses: new Date('2026-01-08'),
  teamFormationStart: new Date('2026-01-08'),
  sprintStart: new Date(),
  sprintEnd: new Date(Date.now() + 2 * 60 * 60 * 1000),
  location: 'Innovation Arena, Hall B',
  maxParticipants: 60,
  currentParticipants: 48,
  projects: [
    {
      id: 'proj-active-1',
      question: 'How might we make last-mile delivery more sustainable in urban areas?',
      submittedBy: 'user-1',
      votes: 35,
      isSponsored: false,
      selected: true,
      keywords: ['delivery', 'sustainable', 'urban', 'last-mile'],
    },
  ],
  finalProjects: [],
  createdAt: new Date('2025-12-15'),
});

const generateActiveTeam = (user: User): Team => ({
  id: 'team-active-1',
  name: 'Urban Innovators',
  eventId: 'event-sprint-active',
  members: [
    {
      userId: user.id,
      user: user,
      role: 'leader',
      joinedAt: new Date(),
      superpowerFocus: 'design',
    },
    {
      userId: 'user-2',
      user: {
        ...user,
        id: 'user-2',
        displayName: 'Sarah Chen',
        username: 'sarah_strategy',
        trustScore: 92,
      },
      role: 'member',
      joinedAt: new Date(),
      superpowerFocus: 'strategy',
    },
    {
      userId: 'user-3',
      user: {
        ...user,
        id: 'user-3',
        displayName: 'Marcus Johnson',
        username: 'marcus_tech',
        trustScore: 88,
      },
      role: 'member',
      joinedAt: new Date(),
      superpowerFocus: 'technical',
    },
    {
      userId: 'user-4',
      user: {
        ...user,
        id: 'user-4',
        displayName: 'Elena Rodriguez',
        username: 'elena_story',
        trustScore: 95,
      },
      role: 'member',
      joinedAt: new Date(),
      superpowerFocus: 'storytelling',
    },
  ],
  projectId: 'proj-active-1',
  projectQuestion: 'How might we make last-mile delivery more sustainable in urban areas?',
  selectedMilestones: [
    { id: 'ms-1', type: 'user_research', name: 'User Research', description: 'Complete user persona', dueMinute: 20, points: 30, completed: true, completedAt: new Date() },
    { id: 'ms-2', type: 'prototype_draft', name: 'Prototype Draft', description: 'Create solution sketch', dueMinute: 45, points: 40, completed: false },
    { id: 'ms-3', type: 'inclusion_audit', name: 'Inclusion Audit', description: 'Review accessibility', dueMinute: 75, points: 35, completed: false },
  ],
  consultancyTokens: 2,
  points: 130,
  currentSlide: 2,
  slides: [
    { id: 'slide-1', slideNumber: 1, type: 'user_persona', content: 'Meet Alex, a 28-year-old urban professional who orders 5+ deliveries per week. Frustrated by multiple delivery attempts and excessive packaging waste.', completed: true, submittedAt: new Date(), points: 50 },
    { id: 'slide-2', slideNumber: 2, type: 'solution_sketch', content: '', completed: false, points: 50 },
    { id: 'slide-3', slideNumber: 3, type: 'inclusion_audit', content: '', completed: false, points: 50 },
  ],
  equippedPowerUps: [
    {
      id: 'pu-equipped-1',
      type: 'roadblock_shield',
      name: 'Roadblock Shield',
      description: 'Protect your team from one roadblock event',
      icon: '🛡️',
      rarity: 'rare',
      earnedAt: new Date('2024-06-15'),
    },
  ],
  activeBoosts: [],
});

const generateMockEvents = (): IdeathonEvent[] => [
  generateActiveSprintEvent(),
  {
    id: 'event-upcoming-1',
    name: 'Winter Innovation Sprint',
    state: 'upcoming',
    registrationOpens: new Date('2026-02-01'),
    registrationCloses: new Date('2026-02-10'),
    teamFormationStart: new Date('2026-02-11'),
    sprintStart: new Date('2026-02-15T10:00:00'),
    sprintEnd: new Date('2026-02-15T12:00:00'),
    location: 'Innovation Hub, Building A',
    maxParticipants: 100,
    currentParticipants: 0,
    projects: [],
    finalProjects: [],
    createdAt: new Date('2025-12-01'),
  },
  {
    id: 'event-active-1',
    name: 'Spring Ideathon 2026',
    generatedTheme: 'Sustainable Urban Living',
    themeColors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
    },
    state: 'registration_open',
    registrationOpens: new Date('2026-01-05'),
    registrationCloses: new Date('2026-01-15'),
    teamFormationStart: new Date('2026-01-16'),
    sprintStart: new Date('2026-01-20T10:00:00'),
    sprintEnd: new Date('2026-01-20T12:00:00'),
    location: 'Tech Campus, Main Hall',
    maxParticipants: 80,
    currentParticipants: 45,
    projects: [
      {
        id: 'proj-1',
        question: 'How might we reduce food waste in urban apartment complexes?',
        submittedBy: 'user-5',
        votes: 28,
        isSponsored: false,
        selected: true,
        keywords: ['food', 'waste', 'urban', 'sustainability'],
      },
      {
        id: 'proj-2',
        question: 'How can we make public transport more accessible for elderly citizens?',
        submittedBy: 'user-8',
        votes: 24,
        isSponsored: false,
        selected: true,
        keywords: ['transport', 'accessibility', 'elderly', 'inclusive'],
      },
      {
        id: 'proj-3',
        question: 'What solutions can help remote workers stay connected to their neighborhoods?',
        submittedBy: 'user-12',
        votes: 22,
        isSponsored: false,
        selected: true,
        keywords: ['remote work', 'community', 'connection', 'neighborhood'],
      },
      {
        id: 'proj-4',
        question: 'How might we incentivize sustainable commuting in dense cities?',
        submittedBy: 'sponsor-1',
        votes: 0,
        isSponsored: true,
        sponsorName: 'GreenMove Inc.',
        sponsorLogo: '/sponsors/greenmove.png',
        selected: true,
        keywords: ['commuting', 'sustainability', 'incentive', 'cities'],
      },
    ],
    finalProjects: [],
    createdAt: new Date('2025-11-15'),
  },
  {
    id: 'event-completed-1',
    name: 'Summer Innovation Challenge',
    generatedTheme: 'Digital Wellness & Balance',
    themeColors: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#A78BFA',
    },
    state: 'completed',
    registrationOpens: new Date('2025-07-01'),
    registrationCloses: new Date('2025-07-10'),
    teamFormationStart: new Date('2025-07-11'),
    sprintStart: new Date('2025-07-15T10:00:00'),
    sprintEnd: new Date('2025-07-15T12:00:00'),
    location: 'Innovation Center',
    maxParticipants: 60,
    currentParticipants: 58,
    projects: [],
    finalProjects: [
      {
        id: 'proj-final-1',
        question: 'How might we help remote workers maintain work-life balance?',
        submittedBy: 'user-1',
        votes: 32,
        isSponsored: false,
        selected: true,
        keywords: ['remote', 'work-life', 'balance', 'wellness'],
      },
    ],
    createdAt: new Date('2025-05-01'),
  },
];

// App Store
interface AppState {
  // Auth
  isAuthenticated: boolean;
  currentUser: User | null;
  
  // Events
  events: IdeathonEvent[];
  activeEvent: IdeathonEvent | null;
  
  // Team
  currentTeam: Team | null;
  
  // Sprint
  sprintState: SprintState | null;
  
  // Consultancy
  consultancyRequests: ConsultancyRequest[];
  
  // Notifications
  notifications: Notification[];
  
  // Memory Wall
  memoryWallEntries: MemoryWallEntry[];
  
  // Loot
  pendingLootDrops: LootDrop[];
  
  // UI State
  showLoginModal: boolean;
  activeTab: string;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  
  setActiveEvent: (event: IdeathonEvent | null) => void;
  registerForEvent: (eventId: string, question: string) => void;
  voteForProject: (eventId: string, projectId: string) => void;
  
  joinTeam: (teamId: string) => void;
  createTeam: (name: string, projectId: string) => void;
  selectMilestones: (milestones: string[]) => void;
  equipPowerUp: (powerUpId: string) => void;
  
  castConsensusVote: (voteId: string, option: string) => void;
  purchaseBoost: (boostType: string) => void;
  submitSlide: (slideNumber: number, content: string) => void;
  
  requestConsultancy: (userId: string, superpower: SuperpowerCategory, description: string) => void;
  respondToConsultancy: (requestId: string, accept: boolean) => void;
  
  rateTeammate: (userId: string, rating: number, feedback: string, isMvp: boolean) => void;
  sendGratitude: (userId: string, message: string, isPublic: boolean) => void;
  
  revealLoot: (lootId: string) => void;
  
  markNotificationRead: (notificationId: string) => void;
  clearNotifications: () => void;
  
  setShowLoginModal: (show: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      isAuthenticated: false,
      currentUser: null,
      events: generateMockEvents(),
      activeEvent: null,
      currentTeam: null,
      sprintState: null,
      consultancyRequests: [],
      notifications: [
        {
          id: 'notif-1',
          userId: 'user-1',
          type: 'challenge',
          title: 'New Event Available!',
          message: 'Spring Ideathon 2026 is now open for registration.',
          read: false,
          createdAt: new Date(),
        },
      ],
      memoryWallEntries: [],
      pendingLootDrops: [],
      showLoginModal: false,
      activeTab: 'events',
      
      // Auth Actions
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const user = generateMockUser();
        user.email = email;
        const activeSprintEvent = generateActiveSprintEvent();
        const activeTeam = generateActiveTeam(user);
        set({ 
          isAuthenticated: true, 
          currentUser: user, 
          showLoginModal: false,
          activeEvent: activeSprintEvent,
          currentTeam: activeTeam,
          activeTab: 'sprint',
          notifications: [
            {
              id: 'notif-sprint',
              userId: user.id,
              type: 'challenge',
              title: '🔥 Sprint is LIVE!',
              message: 'Your team is competing in the Live Innovation Sprint. Complete Slide 2 now!',
              read: false,
              createdAt: new Date(),
            },
            {
              id: 'notif-milestone',
              userId: user.id,
              type: 'milestone',
              title: '✅ Milestone 1 Complete',
              message: 'Your team completed User Research and earned 30 points!',
              read: true,
              createdAt: new Date(Date.now() - 10 * 60 * 1000),
            },
          ],
        });
        return true;
      },
      
      logout: () => {
        set({ isAuthenticated: false, currentUser: null, currentTeam: null });
      },
      
      updateUser: (updates: Partial<User>) => {
        const { currentUser } = get();
        if (currentUser) {
          set({ currentUser: { ...currentUser, ...updates } });
        }
      },
      
      // Event Actions
      setActiveEvent: (event: IdeathonEvent | null) => {
        set({ activeEvent: event });
      },
      
      registerForEvent: (eventId: string, question: string) => {
        const { events, currentUser } = get();
        if (!currentUser) return;
        
        set({
          events: events.map(event => 
            event.id === eventId
              ? {
                  ...event,
                  currentParticipants: event.currentParticipants + 1,
                  projects: [
                    ...event.projects,
                    {
                      id: `proj-${Date.now()}`,
                      question,
                      submittedBy: currentUser.id,
                      votes: 1,
                      isSponsored: false,
                      selected: false,
                      keywords: question.toLowerCase().split(' ').filter(w => w.length > 4),
                    },
                  ],
                }
              : event
          ),
        });
      },
      
      voteForProject: (eventId: string, projectId: string) => {
        const { events } = get();
        set({
          events: events.map(event =>
            event.id === eventId
              ? {
                  ...event,
                  projects: event.projects.map(proj =>
                    proj.id === projectId
                      ? { ...proj, votes: proj.votes + 1 }
                      : proj
                  ),
                }
              : event
          ),
        });
      },
      
      // Team Actions
      joinTeam: (teamId: string) => {
        // Implementation for joining a team
      },
      
      createTeam: (name: string, projectId: string) => {
        const { currentUser, activeEvent } = get();
        if (!currentUser || !activeEvent) return;
        
        const project = activeEvent.projects.find(p => p.id === projectId);
        if (!project) return;
        
        const newTeam: Team = {
          id: `team-${Date.now()}`,
          name,
          eventId: activeEvent.id,
          members: [
            {
              userId: currentUser.id,
              user: currentUser,
              role: 'leader',
              joinedAt: new Date(),
              superpowerFocus: 'design',
            },
          ],
          projectId,
          projectQuestion: project.question,
          selectedMilestones: [],
          consultancyTokens: 3,
          points: 0,
          currentSlide: 1,
          slides: [
            { id: 'slide-1', slideNumber: 1, type: 'user_persona', content: '', completed: false, points: 50 },
            { id: 'slide-2', slideNumber: 2, type: 'solution_sketch', content: '', completed: false, points: 50 },
            { id: 'slide-3', slideNumber: 3, type: 'inclusion_audit', content: '', completed: false, points: 50 },
          ],
          equippedPowerUps: [],
          activeBoosts: [],
        };
        
        set({ currentTeam: newTeam });
      },
      
      selectMilestones: (milestones: string[]) => {
        // Implementation for selecting milestones
      },
      
      equipPowerUp: (powerUpId: string) => {
        const { currentUser, currentTeam } = get();
        if (!currentUser || !currentTeam) return;
        
        const powerUp = currentUser.powerUps.find(p => p.id === powerUpId);
        if (!powerUp) return;
        
        set({
          currentTeam: {
            ...currentTeam,
            equippedPowerUps: [...currentTeam.equippedPowerUps, powerUp],
          },
        });
      },
      
      // Sprint Actions
      castConsensusVote: (voteId: string, option: string) => {
        // Implementation for consensus voting
      },
      
      purchaseBoost: (boostType: string) => {
        const { currentTeam } = get();
        if (!currentTeam) return;
        
        const boostCosts: Record<string, number> = {
          deep_focus: 30,
          ai_ghostwriter: 50,
          hall_shoutout: 20,
        };
        
        const cost = boostCosts[boostType] || 0;
        if (currentTeam.points < cost) return;
        
        set({
          currentTeam: {
            ...currentTeam,
            points: currentTeam.points - cost,
            activeBoosts: [
              ...currentTeam.activeBoosts,
              {
                boost: {
                  type: boostType as any,
                  name: boostType.replace('_', ' '),
                  description: '',
                  cost,
                  duration: 10,
                },
                activatedAt: new Date(),
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
              },
            ],
          },
        });
      },
      
      submitSlide: (slideNumber: number, content: string) => {
        const { currentTeam } = get();
        if (!currentTeam) return;
        
        set({
          currentTeam: {
            ...currentTeam,
            slides: currentTeam.slides.map(slide =>
              slide.slideNumber === slideNumber
                ? { ...slide, content, completed: true, submittedAt: new Date() }
                : slide
            ),
            points: currentTeam.points + 50,
          },
        });
      },
      
      // Consultancy Actions
      requestConsultancy: (userId: string, superpower: SuperpowerCategory, description: string) => {
        const { currentTeam, consultancyRequests } = get();
        if (!currentTeam) return;
        
        const newRequest: ConsultancyRequest = {
          id: `consult-${Date.now()}`,
          fromTeamId: currentTeam.id,
          fromTeamName: currentTeam.name,
          toUserId: userId,
          toUserName: 'Consultant',
          status: 'pending',
          superpowerNeeded: superpower,
          description,
          createdAt: new Date(),
        };
        
        set({
          consultancyRequests: [...consultancyRequests, newRequest],
          currentTeam: {
            ...currentTeam,
            consultancyTokens: currentTeam.consultancyTokens - 1,
          },
        });
      },
      
      respondToConsultancy: (requestId: string, accept: boolean) => {
        const { consultancyRequests } = get();
        set({
          consultancyRequests: consultancyRequests.map(req =>
            req.id === requestId
              ? { ...req, status: accept ? 'accepted' : 'declined' }
              : req
          ),
        });
      },
      
      // Rating Actions
      rateTeammate: (userId: string, rating: number, feedback: string, isMvp: boolean) => {
        // Store rating - in real app would go to API
      },
      
      sendGratitude: (userId: string, message: string, isPublic: boolean) => {
        const { currentUser } = get();
        if (!currentUser) return;
        
        const newGratitude: GratitudeMessage = {
          id: `grat-${Date.now()}`,
          fromUserId: currentUser.id,
          fromUserName: currentUser.displayName,
          fromUserAvatar: currentUser.avatar,
          message,
          eventId: 'current-event',
          eventName: 'Current Event',
          createdAt: new Date(),
          isPublic,
        };
        
        // In real app, this would go to the recipient's profile
      },
      
      // Loot Actions
      revealLoot: (lootId: string) => {
        const { pendingLootDrops, currentUser } = get();
        if (!currentUser) return;
        
        const loot = pendingLootDrops.find(l => l.id === lootId);
        if (!loot) return;
        
        set({
          pendingLootDrops: pendingLootDrops.filter(l => l.id !== lootId),
          currentUser: {
            ...currentUser,
            powerUps: [...currentUser.powerUps, { ...loot.powerUp, earnedAt: new Date() }],
          },
        });
      },
      
      // Notification Actions
      markNotificationRead: (notificationId: string) => {
        const { notifications } = get();
        set({
          notifications: notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        });
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      // UI Actions
      setShowLoginModal: (show: boolean) => {
        set({ showLoginModal: show });
      },
      
      setActiveTab: (tab: string) => {
        set({ activeTab: tab });
      },
    }),
    {
      name: 'ideathon-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
      }),
    }
  )
);
