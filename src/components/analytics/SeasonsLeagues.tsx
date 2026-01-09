'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Medal,
  Star,
  Flame,
  Calendar,
  ChevronRight,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { LeagueTier, LeagueStanding, Season, UserSeasonStats } from '@/types/analytics';

// Mock data
const currentSeason: Season = {
  id: 'season-3',
  name: 'Innovation Winter',
  number: 3,
  startDate: new Date('2026-01-01'),
  endDate: new Date('2026-03-31'),
  isActive: true,
  theme: 'Sustainable Future',
  rewards: [
    { tier: 'champion', minRank: 1, maxRank: 1, rewards: { powerUps: ['legendary_shield'], badges: ['champion'], title: 'Season Champion' } },
    { tier: 'diamond', minRank: 2, maxRank: 10, rewards: { powerUps: ['epic_boost'], badges: ['diamond_tier'], title: 'Diamond Innovator' } },
    { tier: 'platinum', minRank: 11, maxRank: 50, rewards: { powerUps: ['rare_warp'], badges: ['platinum_tier'] } },
  ],
};

const userStats: UserSeasonStats = {
  seasonId: 'season-3',
  userId: 'user-1',
  tier: 'platinum',
  rank: 23,
  totalPoints: 2450,
  eventsParticipated: 8,
  eventsWon: 2,
  mvpCount: 3,
  consultanciesProvided: 15,
  averageCollaborationScore: 92,
  peakRank: 15,
  currentStreak: 4,
  longestStreak: 7,
};

const leaderboard: LeagueStanding[] = [
  { rank: 1, userId: 'u1', username: 'innovation_queen', displayName: 'Sarah Martinez', avatar: '', tier: 'champion', points: 4850, eventsCompleted: 12, winRate: 75, streak: 8, movement: 'same' },
  { rank: 2, userId: 'u2', username: 'design_master', displayName: 'James Chen', avatar: '', tier: 'diamond', points: 4320, eventsCompleted: 11, winRate: 64, streak: 5, previousRank: 3, movement: 'up' },
  { rank: 3, userId: 'u3', username: 'strategy_pro', displayName: 'Elena Rodriguez', avatar: '', tier: 'diamond', points: 4180, eventsCompleted: 10, winRate: 60, streak: 3, previousRank: 2, movement: 'down' },
  { rank: 4, userId: 'u4', username: 'tech_wizard', displayName: 'Marcus Johnson', avatar: '', tier: 'diamond', points: 3950, eventsCompleted: 11, winRate: 55, streak: 4, movement: 'same' },
  { rank: 5, userId: 'u5', username: 'story_teller', displayName: 'Aisha Patel', avatar: '', tier: 'diamond', points: 3720, eventsCompleted: 9, winRate: 56, streak: 2, previousRank: 7, movement: 'up' },
  { rank: 23, userId: 'user-1', username: 'spark_citizen', displayName: 'Alex Innovator', avatar: '', tier: 'platinum', points: 2450, eventsCompleted: 8, winRate: 50, streak: 4, previousRank: 28, movement: 'up' },
];

const tierConfig: Record<LeagueTier, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  bronze: { color: 'text-amber-600', bg: 'bg-amber-600/20', border: 'border-amber-600/50', icon: <Medal className="w-5 h-5" /> },
  silver: { color: 'text-slate-300', bg: 'bg-slate-300/20', border: 'border-slate-300/50', icon: <Medal className="w-5 h-5" /> },
  gold: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/50', icon: <Trophy className="w-5 h-5" /> },
  platinum: { color: 'text-cyan-400', bg: 'bg-cyan-400/20', border: 'border-cyan-400/50', icon: <Star className="w-5 h-5" /> },
  diamond: { color: 'text-violet-400', bg: 'bg-violet-400/20', border: 'border-violet-400/50', icon: <Crown className="w-5 h-5" /> },
  champion: { color: 'text-rose-400', bg: 'bg-rose-400/20', border: 'border-rose-400/50', icon: <Crown className="w-5 h-5" /> },
};

export function SeasonsLeagues() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const tier = tierConfig[userStats.tier];

  const pointsToNextTier = 3000 - userStats.totalPoints;
  const progressToNextTier = (userStats.totalPoints / 3000) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-400" />
            Seasons & Leagues
          </h1>
          <p className="text-slate-400 mt-1">
            Compete, climb, and claim seasonal rewards
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-4 py-2">
          <Calendar className="w-4 h-4 mr-2" />
          {currentSeason.name} • Season {currentSeason.number}
        </Badge>
      </div>

      {/* Current Standing Card */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 overflow-hidden">
        <div className={`h-1 bg-gradient-to-r ${
          userStats.tier === 'champion' ? 'from-rose-500 to-pink-500' :
          userStats.tier === 'diamond' ? 'from-violet-500 to-purple-500' :
          userStats.tier === 'platinum' ? 'from-cyan-500 to-blue-500' :
          userStats.tier === 'gold' ? 'from-yellow-500 to-amber-500' :
          'from-slate-500 to-slate-400'
        }`} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Tier Badge */}
              <div className={`w-24 h-24 rounded-2xl ${tier.bg} ${tier.border} border-2 flex flex-col items-center justify-center`}>
                <div className={tier.color}>{tier.icon}</div>
                <span className={`text-sm font-bold ${tier.color} uppercase mt-1`}>{userStats.tier}</span>
              </div>
              
              {/* Stats */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-bold text-white">#{userStats.rank}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5 from last week
                  </Badge>
                </div>
                <p className="text-slate-400">Peak Rank: #{userStats.peakRank}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-white">{userStats.totalPoints.toLocaleString()}</p>
                <p className="text-sm text-slate-400">Season Points</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">{userStats.eventsWon}</p>
                <p className="text-sm text-slate-400">Wins</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">{userStats.mvpCount}</p>
                <p className="text-sm text-slate-400">MVPs</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <Flame className="w-6 h-6 text-orange-400" />
                  <span className="text-3xl font-bold text-orange-400">{userStats.currentStreak}</span>
                </div>
                <p className="text-sm text-slate-400">Streak</p>
              </div>
            </div>
          </div>

          {/* Progress to next tier */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Progress to Diamond</span>
              <span className="text-sm text-cyan-400">{pointsToNextTier} pts needed</span>
            </div>
            <Progress value={progressToNextTier} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leaderboard" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-violet-600">
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-violet-600">
            Season Rewards
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-violet-600">
            Past Seasons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Global Rankings
                </span>
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  Updated 5 min ago
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => {
                    const entryTier = tierConfig[entry.tier];
                    const isCurrentUser = entry.userId === 'user-1';
                    
                    return (
                      <motion.div
                        key={entry.userId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                          isCurrentUser 
                            ? 'bg-violet-500/20 border-2 border-violet-500/50' 
                            : 'bg-slate-700/30 hover:bg-slate-700/50'
                        }`}
                      >
                        {/* Rank */}
                        <div className="w-12 text-center">
                          {entry.rank <= 3 ? (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                              entry.rank === 1 ? 'bg-yellow-500/30 text-yellow-400' :
                              entry.rank === 2 ? 'bg-slate-300/30 text-slate-300' :
                              'bg-amber-600/30 text-amber-500'
                            }`}>
                              <Trophy className="w-5 h-5" />
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-slate-400">#{entry.rank}</span>
                          )}
                        </div>

                        {/* Movement */}
                        <div className="w-8">
                          {entry.movement === 'up' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                          {entry.movement === 'down' && <TrendingDown className="w-5 h-5 text-red-400" />}
                          {entry.movement === 'same' && <Minus className="w-5 h-5 text-slate-500" />}
                        </div>

                        {/* User */}
                        <Avatar className={`w-10 h-10 border-2 ${entryTier.border}`}>
                          <AvatarFallback className={`${entryTier.bg} ${entryTier.color}`}>
                            {entry.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${isCurrentUser ? 'text-violet-300' : 'text-white'}`}>
                              {entry.displayName}
                            </span>
                            {isCurrentUser && (
                              <Badge className="bg-violet-500/30 text-violet-300 text-xs">You</Badge>
                            )}
                          </div>
                          <span className="text-sm text-slate-500">@{entry.username}</span>
                        </div>

                        {/* Tier */}
                        <Badge className={`${entryTier.bg} ${entryTier.color} border-0 capitalize`}>
                          {entry.tier}
                        </Badge>

                        {/* Stats */}
                        <div className="text-right">
                          <p className="font-bold text-white">{entry.points.toLocaleString()} pts</p>
                          <p className="text-xs text-slate-500">{entry.winRate}% win rate</p>
                        </div>

                        {/* Streak */}
                        {entry.streak > 0 && (
                          <div className="flex items-center gap-1 text-orange-400">
                            <Flame className="w-4 h-4" />
                            <span className="font-bold">{entry.streak}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { tier: 'champion' as LeagueTier, title: 'Champion', ranks: 'Rank #1', rewards: ['🏆 Season Champion Badge', '⚡ Legendary Power-up', '👑 Champion Title'] },
              { tier: 'diamond' as LeagueTier, title: 'Diamond', ranks: 'Rank #2-10', rewards: ['💎 Diamond Badge', '⚡ Epic Power-up', '✨ Diamond Title'] },
              { tier: 'platinum' as LeagueTier, title: 'Platinum', ranks: 'Rank #11-50', rewards: ['🌟 Platinum Badge', '⚡ Rare Power-up', '🎯 Bonus XP'] },
            ].map((reward, index) => {
              const config = tierConfig[reward.tier];
              return (
                <motion.div
                  key={reward.tier}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${config.bg} ${config.border} border-2 h-full`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full ${config.bg} mx-auto mb-4 flex items-center justify-center`}>
                        <Trophy className={`w-8 h-8 ${config.color}`} />
                      </div>
                      <h3 className={`text-xl font-bold ${config.color} mb-1`}>{reward.title}</h3>
                      <p className="text-sm text-slate-400 mb-4">{reward.ranks}</p>
                      <ul className="space-y-2 text-left">
                        {reward.rewards.map((r, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { season: 'Season 2 - Autumn Spark', rank: 31, tier: 'gold', points: 1850, badge: '🥉' },
                  { season: 'Season 1 - Summer Heat', rank: 58, tier: 'silver', points: 920, badge: '🎖️' },
                ].map((past, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{past.badge}</span>
                      <div>
                        <p className="font-medium text-white">{past.season}</p>
                        <p className="text-sm text-slate-400">Final Rank: #{past.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={tierConfig[past.tier as LeagueTier].bg + ' ' + tierConfig[past.tier as LeagueTier].color + ' capitalize'}>
                        {past.tier}
                      </Badge>
                      <p className="text-sm text-slate-400 mt-1">{past.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
