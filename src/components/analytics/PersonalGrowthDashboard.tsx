'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Target,
  Zap,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Lightbulb,
  BookOpen,
  Users,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from 'recharts';

// Mock data for charts
const superpowerEvolution = [
  { month: 'Aug', design: 6.2, strategy: 5.8, storytelling: 7.5, prototyping: 4.5, research: 5.2, technical: 4.0 },
  { month: 'Sep', design: 6.5, strategy: 6.2, storytelling: 7.8, prototyping: 5.0, research: 5.5, technical: 4.2 },
  { month: 'Oct', design: 7.0, strategy: 6.8, storytelling: 8.2, prototyping: 5.5, research: 6.0, technical: 4.5 },
  { month: 'Nov', design: 7.3, strategy: 7.2, storytelling: 8.5, prototyping: 5.8, research: 6.5, technical: 4.8 },
  { month: 'Dec', design: 7.6, strategy: 7.5, storytelling: 8.7, prototyping: 6.0, research: 6.8, technical: 5.0 },
  { month: 'Jan', design: 7.8, strategy: 7.5, storytelling: 8.8, prototyping: 6.2, research: 7.0, technical: 5.2 },
];

const currentSuperpowers = [
  { subject: 'Design', A: 7.8, fullMark: 10 },
  { subject: 'Strategy', A: 7.5, fullMark: 10 },
  { subject: 'Storytelling', A: 8.8, fullMark: 10 },
  { subject: 'Prototyping', A: 6.2, fullMark: 10 },
  { subject: 'Research', A: 7.0, fullMark: 10 },
  { subject: 'Technical', A: 5.2, fullMark: 10 },
];

const collaborationHistory = [
  { month: 'Aug', score: 78, events: 1 },
  { month: 'Sep', score: 82, events: 2 },
  { month: 'Oct', score: 85, events: 2 },
  { month: 'Nov', score: 88, events: 1 },
  { month: 'Dec', score: 91, events: 2 },
  { month: 'Jan', score: 94, events: 2 },
];

const milestones = [
  { id: 1, title: 'First MVP Award', progress: 100, target: 1, category: 'leadership', completed: true },
  { id: 2, title: 'Collaborate with 20 users', progress: 18, target: 20, category: 'collaboration', completed: false },
  { id: 3, title: 'Reach Gold Tier', progress: 100, target: 1, category: 'growth', completed: true },
  { id: 4, title: 'Complete 10 sprints', progress: 8, target: 10, category: 'sprint', completed: false },
  { id: 5, title: 'Provide 25 consultancies', progress: 15, target: 25, category: 'collaboration', completed: false },
];

const recommendations = [
  { area: 'Technical', suggestion: 'Join sprints with technical focus to improve this skill', priority: 'high' },
  { area: 'Prototyping', suggestion: 'Practice rapid prototyping in the next 2 events', priority: 'medium' },
  { area: 'Consultancy', suggestion: 'Share your Storytelling expertise to earn Bridge Builder badges', priority: 'low' },
];

export function PersonalGrowthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  const growthMetrics = [
    { label: 'Overall Growth', value: '+23%', trend: 'up', color: 'text-emerald-400' },
    { label: 'Collab Score', value: '94', trend: 'up', color: 'text-blue-400' },
    { label: 'Events Completed', value: '8', trend: 'same', color: 'text-violet-400' },
    { label: 'Peer Rating', value: '4.7', trend: 'up', color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            Personal Growth
          </h1>
          <p className="text-slate-400 mt-1">
            Track your evolution and unlock your potential
          </p>
        </div>
        <div className="flex gap-2">
          {['1m', '3m', '6m', '1y', 'all'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {period.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {growthMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{metric.label}</span>
                  {metric.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-400" />}
                  {metric.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-400" />}
                  {metric.trend === 'same' && <Minus className="w-4 h-4 text-slate-400" />}
                </div>
                <p className={`text-2xl font-bold ${metric.color} mt-1`}>{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Superpower Evolution Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-400" />
              Superpower Evolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={superpowerEvolution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis domain={[0, 10]} stroke="#64748b" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Line type="monotone" dataKey="design" stroke="#EC4899" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="strategy" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="storytelling" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="prototyping" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="research" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="technical" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {[
                { name: 'Design', color: '#EC4899' },
                { name: 'Strategy', color: '#8B5CF6' },
                { name: 'Storytelling', color: '#F59E0B' },
                { name: 'Prototyping', color: '#10B981' },
                { name: 'Research', color: '#3B82F6' },
                { name: 'Technical', color: '#6366F1' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Superpower Radar */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              Current Superpower Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={currentSuperpowers}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#64748b' }} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Badge className="bg-emerald-500/20 text-emerald-400">
                <Star className="w-3 h-3 mr-1" />
                Strongest: Storytelling (8.8)
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-400">
                <Lightbulb className="w-3 h-3 mr-1" />
                Focus Area: Technical (5.2)
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collaboration Score Trend */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Collaboration Score Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={collaborationHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis domain={[70, 100]} stroke="#64748b" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="url(#colorScore)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Growth Milestones */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Growth Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {milestone.completed ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Star className="w-3 h-3 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                        <Target className="w-3 h-3 text-slate-400" />
                      </div>
                    )}
                    <span className={`text-sm ${milestone.completed ? 'text-emerald-400' : 'text-white'}`}>
                      {milestone.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {milestone.progress}/{milestone.target}
                  </span>
                </div>
                <Progress 
                  value={(milestone.progress / milestone.target) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              Growth Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border ${
                  rec.priority === 'high' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : rec.priority === 'medium'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <BookOpen className={`w-5 h-5 flex-shrink-0 ${
                    rec.priority === 'high' ? 'text-red-400' :
                    rec.priority === 'medium' ? 'text-amber-400' : 'text-blue-400'
                  }`} />
                  <div>
                    <p className="font-medium text-white">{rec.area}</p>
                    <p className="text-sm text-slate-400 mt-1">{rec.suggestion}</p>
                  </div>
                  <Badge className={`flex-shrink-0 capitalize ${
                    rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {rec.priority}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
