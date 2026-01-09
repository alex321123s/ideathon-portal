'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Trophy,
  Zap,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Award,
  MessageSquare,
  Shield,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';

// Mock team analytics data
const teamPerformance = {
  teamName: 'Urban Innovators',
  eventName: 'Live Innovation Sprint',
  rank: 3,
  totalTeams: 12,
  percentile: 85,
  totalPoints: 420,
  collaborationScore: 94,
  consensusSpeed: 45, // seconds average
  consensusRate: 92, // percentage
  slidesCompletedOnTime: 3,
  milestonesHit: 2,
  boostsUsed: 2,
  roadblocksOvercome: 1,
  vsAverageTeam: 23, // % better
  vsTopTeam: 85, // % of top team
};

const memberContributions = [
  { name: 'Alex I.', superpower: 'Design', points: 150, tasks: 4, rating: 4.8, mvpVotes: 2 },
  { name: 'Sarah C.', superpower: 'Strategy', points: 120, tasks: 3, rating: 4.5, mvpVotes: 1 },
  { name: 'Marcus J.', superpower: 'Technical', points: 90, tasks: 3, rating: 4.3, mvpVotes: 0 },
  { name: 'Elena R.', superpower: 'Storytelling', points: 60, tasks: 2, rating: 4.6, mvpVotes: 1 },
];

const pointsBreakdown = [
  { name: 'Slides', value: 150, color: '#8B5CF6' },
  { name: 'Milestones', value: 70, color: '#10B981' },
  { name: 'Boosts', value: 50, color: '#F59E0B' },
  { name: 'Consultancy', value: 80, color: '#3B82F6' },
  { name: 'Bonuses', value: 70, color: '#EC4899' },
];

const timelineData = [
  { time: '0:00', team: 0, average: 0 },
  { time: '0:20', team: 80, average: 60 },
  { time: '0:40', team: 180, average: 140 },
  { time: '1:00', team: 280, average: 220 },
  { time: '1:20', team: 350, average: 300 },
  { time: '1:40', team: 400, average: 350 },
  { time: '2:00', team: 420, average: 380 },
];

const synergyData = [
  { name: 'Synergy', value: 88, fill: '#8B5CF6' },
  { name: 'Communication', value: 92, fill: '#10B981' },
  { name: 'Consensus', value: 94, fill: '#F59E0B' },
  { name: 'Productivity', value: 85, fill: '#3B82F6' },
];

export function TeamAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            Team Analytics
          </h1>
          <p className="text-slate-400 mt-1">
            {teamPerformance.teamName} • {teamPerformance.eventName}
          </p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400 px-4 py-2 text-lg">
          <Trophy className="w-5 h-5 mr-2" />
          Rank #{teamPerformance.rank} of {teamPerformance.totalTeams}
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Points', value: teamPerformance.totalPoints, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/20' },
          { label: 'Collab Score', value: `${teamPerformance.collaborationScore}%`, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20' },
          { label: 'Percentile', value: `Top ${100 - teamPerformance.percentile}%`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
          { label: 'vs Average', value: `+${teamPerformance.vsAverageTeam}%`, icon: Target, color: 'text-violet-400', bg: 'bg-violet-500/20' },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${metric.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{metric.label}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Points Over Time */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Points Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="team" fill="#8B5CF6" name="Your Team" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="average" fill="#475569" name="Average" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Points Breakdown */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-violet-400" />
              Points Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <RechartsPie>
                  <Pie
                    data={pointsBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pointsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {pointsBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{item.value} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Dynamics */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Team Dynamics & Synergy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Radial Chart */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="100%"
                  data={synergyData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Legend
                    iconSize={10}
                    layout="horizontal"
                    verticalAlign="bottom"
                    wrapperStyle={{ color: '#94a3b8' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                <Clock className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{teamPerformance.consensusSpeed}s</p>
                <p className="text-xs text-slate-400">Avg Consensus Time</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{teamPerformance.consensusRate}%</p>
                <p className="text-xs text-slate-400">Consensus Rate</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{teamPerformance.roadblocksOvercome}</p>
                <p className="text-xs text-slate-400">Roadblocks Overcome</p>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-xl text-center">
                <Zap className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{teamPerformance.boostsUsed}</p>
                <p className="text-xs text-slate-400">Boosts Used</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Contributions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Individual Contributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {memberContributions.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl"
              >
                <Avatar className="w-12 h-12 border-2 border-violet-500/30">
                  <AvatarFallback className="bg-violet-500/20 text-violet-400">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{member.name}</span>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {member.superpower}
                    </Badge>
                    {member.mvpVotes > 0 && (
                      <Badge className="bg-amber-500/20 text-amber-400 text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {member.mvpVotes} MVP votes
                      </Badge>
                    )}
                  </div>
                  <Progress 
                    value={(member.points / 150) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-violet-400">{member.points}</p>
                    <p className="text-xs text-slate-500">Points</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-400">{member.tasks}</p>
                    <p className="text-xs text-slate-500">Tasks</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-400">{member.rating}</p>
                    <p className="text-xs text-slate-500">Rating</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
