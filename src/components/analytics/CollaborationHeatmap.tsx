'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Link2,
  Star,
  TrendingUp,
  UserPlus,
  Heart,
  Zap,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock collaboration data
const collaborators = [
  { id: 'u2', name: 'Sarah Chen', count: 5, chemistry: 94, wins: 2, lastEvent: '2 days ago' },
  { id: 'u3', name: 'Marcus Johnson', count: 4, chemistry: 88, wins: 1, lastEvent: '1 week ago' },
  { id: 'u4', name: 'Elena Rodriguez', count: 3, chemistry: 91, wins: 2, lastEvent: '3 days ago' },
  { id: 'u5', name: 'James Wilson', count: 3, chemistry: 82, wins: 0, lastEvent: '2 weeks ago' },
  { id: 'u6', name: 'Aisha Patel', count: 2, chemistry: 89, wins: 1, lastEvent: '1 week ago' },
  { id: 'u7', name: 'David Kim', count: 2, chemistry: 85, wins: 0, lastEvent: '3 weeks ago' },
  { id: 'u8', name: 'Lisa Thompson', count: 1, chemistry: 78, wins: 0, lastEvent: '1 month ago' },
];

const recommendedCollaborators = [
  { id: 'r1', name: 'Michael Brown', superpower: 'Technical', compatibility: 92, reason: 'Complementary skills - you need Technical expertise' },
  { id: 'r2', name: 'Jennifer Lee', superpower: 'Research', compatibility: 88, reason: 'High chemistry with your frequent collaborators' },
  { id: 'r3', name: 'Robert Garcia', superpower: 'Prototyping', compatibility: 85, reason: 'Similar working style based on consensus patterns' },
];

const networkStats = {
  totalCollaborators: 18,
  averageChemistry: 86,
  strongConnections: 5,
  eventsShared: 24,
};

// Generate heatmap grid data
const generateHeatmapData = () => {
  const users = ['You', 'Sarah', 'Marcus', 'Elena', 'James', 'Aisha', 'David'];
  const data: { x: number; y: number; value: number }[] = [];
  
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (i !== j) {
        data.push({
          x: i,
          y: j,
          value: Math.floor(Math.random() * 5) + 1,
        });
      }
    }
  }
  return { users, data };
};

const heatmapData = generateHeatmapData();

export function CollaborationHeatmap() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const getColorForValue = (value: number) => {
    const colors = [
      'bg-slate-700',
      'bg-violet-900/50',
      'bg-violet-700/60',
      'bg-violet-500/70',
      'bg-violet-400/80',
      'bg-violet-300',
    ];
    return colors[value] || colors[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Link2 className="w-8 h-8 text-violet-400" />
            Collaboration Network
          </h1>
          <p className="text-slate-400 mt-1">
            Discover your collaboration patterns and find ideal teammates
          </p>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Collaborators', value: networkStats.totalCollaborators, icon: Users, color: 'text-blue-400' },
          { label: 'Avg Chemistry', value: `${networkStats.averageChemistry}%`, icon: Heart, color: 'text-pink-400' },
          { label: 'Strong Connections', value: networkStats.strongConnections, icon: Link2, color: 'text-violet-400' },
          { label: 'Events Shared', value: networkStats.eventsShared, icon: Calendar, color: 'text-emerald-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Collaboration Heatmap */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Collaboration Intensity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-around pr-2 text-xs text-slate-400">
                {heatmapData.users.map((user) => (
                  <span key={user} className="h-10 flex items-center">{user}</span>
                ))}
              </div>
              
              {/* Heatmap grid */}
              <div className="flex-1">
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${heatmapData.users.length}, 1fr)` }}>
                  {heatmapData.users.map((_, y) =>
                    heatmapData.users.map((_, x) => {
                      if (x === y) {
                        return <div key={`${x}-${y}`} className="aspect-square bg-slate-800 rounded" />;
                      }
                      const cell = heatmapData.data.find(d => d.x === x && d.y === y);
                      return (
                        <motion.div
                          key={`${x}-${y}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (x + y) * 0.02 }}
                          className={`aspect-square ${getColorForValue(cell?.value || 0)} rounded cursor-pointer hover:ring-2 hover:ring-violet-400 transition-all`}
                          title={`${heatmapData.users[y]} & ${heatmapData.users[x]}: ${cell?.value || 0} events`}
                        />
                      );
                    })
                  )}
                </div>
                
                {/* X-axis labels */}
                <div className="flex justify-around mt-2 text-xs text-slate-400">
                  {heatmapData.users.map((user) => (
                    <span key={user} className="w-10 text-center truncate">{user}</span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-xs text-slate-500">Less</span>
              {[1, 2, 3, 4, 5].map((v) => (
                <div key={v} className={`w-4 h-4 rounded ${getColorForValue(v)}`} />
              ))}
              <span className="text-xs text-slate-500">More</span>
            </div>
          </CardContent>
        </Card>

        {/* Frequent Collaborators */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Frequent Collaborators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px]">
              <div className="space-y-3">
                {collaborators.map((collab, index) => (
                  <motion.div
                    key={collab.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(collab.id)}
                  >
                    <Avatar className="w-10 h-10 border-2 border-blue-500/30">
                      <AvatarFallback className="bg-blue-500/20 text-blue-400">
                        {collab.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white truncate">{collab.name}</span>
                        {collab.chemistry >= 90 && (
                          <Badge className="bg-pink-500/20 text-pink-400 text-xs">
                            <Heart className="w-3 h-3 mr-1 fill-current" />
                            High Chemistry
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{collab.lastEvent}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-violet-400">{collab.count}</span>
                        <span className="text-xs text-slate-500">events</span>
                      </div>
                      {collab.wins > 0 && (
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs">{collab.wins} wins</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Collaborators */}
      <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-violet-400" />
            Recommended Collaborators
            <Badge className="bg-violet-500/30 text-violet-300 ml-2">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendedCollaborators.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12 border-2 border-violet-500/30">
                    <AvatarFallback className="bg-violet-500/20 text-violet-400">
                      {rec.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{rec.name}</p>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {rec.superpower}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">{rec.compatibility}% compatibility</span>
                </div>
                
                <p className="text-xs text-slate-400 mb-3">{rec.reason}</p>
                
                <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
