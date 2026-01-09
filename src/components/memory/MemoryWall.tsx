'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Archive,
  Calendar,
  Users,
  Trophy,
  ExternalLink,
  Star,
  Zap,
  ArrowRight,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/store';

// Mock memory wall entries
const mockEntries = [
  {
    id: 'mem-1',
    eventId: 'event-1',
    eventName: 'Summer Innovation Challenge 2025',
    teamId: 'team-1',
    teamName: 'The Innovators',
    projectQuestion: 'How might we help remote workers maintain work-life balance?',
    slides: [
      { id: 's1', slideNumber: 1, type: 'user_persona', content: 'Sarah, 32, works from home...', completed: true, points: 50 },
      { id: 's2', slideNumber: 2, type: 'solution_sketch', content: 'Smart boundary app that...', completed: true, points: 50 },
      { id: 's3', slideNumber: 3, type: 'inclusion_audit', content: 'Accessibility features include...', completed: true, points: 50 },
    ],
    teamMembers: [
      { userId: 'u1', user: { displayName: 'Alex Innovator' }, superpowerFocus: 'design' },
      { userId: 'u2', user: { displayName: 'Sarah Chen' }, superpowerFocus: 'strategy' },
      { userId: 'u3', user: { displayName: 'Marcus Johnson' }, superpowerFocus: 'technical' },
    ],
    totalPoints: 420,
    collaborationScore: 94,
    badges: [
      { id: 'b1', type: 'mvp', name: 'MVP', icon: '🏆', rarity: 'gold' },
      { id: 'b2', type: 'bridge_builder', name: 'Bridge Builder', icon: '🌉', rarity: 'silver' },
    ],
    createdAt: new Date('2025-07-15'),
    canPickUpBaton: true,
  },
  {
    id: 'mem-2',
    eventId: 'event-2',
    eventName: 'Spring Ideathon 2025',
    teamId: 'team-2',
    teamName: 'Green Thinkers',
    projectQuestion: 'How can we reduce food waste in urban communities?',
    slides: [
      { id: 's1', slideNumber: 1, type: 'user_persona', content: 'Local restaurant owner...', completed: true, points: 50 },
      { id: 's2', slideNumber: 2, type: 'solution_sketch', content: 'Community food sharing platform...', completed: true, points: 50 },
      { id: 's3', slideNumber: 3, type: 'inclusion_audit', content: 'Multi-language support...', completed: true, points: 50 },
    ],
    teamMembers: [
      { userId: 'u1', user: { displayName: 'Alex Innovator' }, superpowerFocus: 'storytelling' },
      { userId: 'u4', user: { displayName: 'Emma Wilson' }, superpowerFocus: 'research' },
    ],
    totalPoints: 380,
    collaborationScore: 88,
    badges: [
      { id: 'b3', type: 'inclusion_advocate', name: 'Inclusion Advocate', icon: '❤️', rarity: 'gold' },
    ],
    createdAt: new Date('2025-04-20'),
    canPickUpBaton: true,
    sponsorInterest: {
      sponsorName: 'GreenTech Inc.',
      contactEmail: 'partnerships@greentech.com',
      message: 'We love this idea! Would like to discuss funding.',
    },
  },
];

export function MemoryWall() {
  const { currentUser } = useAppStore();
  const [selectedEntry, setSelectedEntry] = useState<typeof mockEntries[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Archive className="w-8 h-8 text-purple-400" />
            Memory Wall
          </h1>
          <p className="text-slate-400 mt-1">
            Your portfolio of collaborative projects over time
          </p>
        </div>
        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
          {mockEntries.length} Projects
        </Badge>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer group"
              onClick={() => setSelectedEntry(entry)}
            >
              {/* Header gradient */}
              <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(entry.createdAt), 'MMMM d, yyyy')}
                    </p>
                    <CardTitle className="text-lg text-white group-hover:text-purple-300 transition-colors">
                      {entry.eventName}
                    </CardTitle>
                    <p className="text-sm text-slate-400 mt-1">
                      Team: {entry.teamName}
                    </p>
                  </div>
                  {entry.sponsorInterest && (
                    <Badge className="bg-amber-500/20 text-amber-400">
                      <Star className="w-3 h-3 mr-1" />
                      Sponsor Interest
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Project Question */}
                <div className="p-3 bg-slate-700/50 rounded-lg">
                  <p className="text-sm text-purple-300 italic">
                    "{entry.projectQuestion}"
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-slate-700/30 rounded-lg">
                    <p className="text-lg font-bold text-white">{entry.totalPoints}</p>
                    <p className="text-xs text-slate-400">Points</p>
                  </div>
                  <div className="p-2 bg-slate-700/30 rounded-lg">
                    <p className="text-lg font-bold text-emerald-400">{entry.collaborationScore}%</p>
                    <p className="text-xs text-slate-400">Collab Score</p>
                  </div>
                  <div className="p-2 bg-slate-700/30 rounded-lg">
                    <p className="text-lg font-bold text-white">{entry.teamMembers.length}</p>
                    <p className="text-xs text-slate-400">Members</p>
                  </div>
                </div>

                {/* Team Avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {entry.teamMembers.slice(0, 4).map((member, i) => (
                      <Avatar key={member.userId} className="w-8 h-8 border-2 border-slate-800">
                        <AvatarFallback className="bg-purple-500/20 text-purple-400 text-xs">
                          {member.user.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {entry.teamMembers.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs text-slate-400">
                        +{entry.teamMembers.length - 4}
                      </div>
                    )}
                  </div>
                  
                  {/* Badges */}
                  <div className="flex gap-1">
                    {entry.badges.slice(0, 3).map((badge) => (
                      <span key={badge.id} className="text-lg" title={badge.name}>
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View button */}
                <Button
                  variant="ghost"
                  className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Time Capsule
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {mockEntries.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Archive className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No Projects Yet</h3>
          <p className="text-slate-500">
            Complete sprints to build your memory wall
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedEntry(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
              <p className="text-sm text-slate-500 mb-1">{selectedEntry.eventName}</p>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedEntry.teamName}</h2>
              <p className="text-purple-300 italic">"{selectedEntry.projectQuestion}"</p>
            </div>

            {/* Slides */}
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Pitch Deck
              </h3>
              <div className="space-y-3">
                {selectedEntry.slides.map((slide) => (
                  <div key={slide.id} className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase mb-1">
                      Slide {slide.slideNumber}: {slide.type.replace('_', ' ')}
                    </p>
                    <p className="text-slate-300">{slide.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Team Roster
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedEntry.teamMembers.map((member) => (
                  <div key={member.userId} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-purple-500/20 text-purple-400">
                        {member.user.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{member.user.displayName}</p>
                      <p className="text-xs text-slate-400 capitalize">{member.superpowerFocus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsor Interest */}
            {selectedEntry.sponsorInterest && (
              <div className="p-6 border-b border-slate-700">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    <h3 className="font-semibold text-amber-400">Sponsor Interest</h3>
                  </div>
                  <p className="text-white mb-2">{selectedEntry.sponsorInterest.sponsorName}</p>
                  <p className="text-sm text-slate-300 mb-3">{selectedEntry.sponsorInterest.message}</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Pick Up the Baton
                  </Button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6">
              <Button
                variant="outline"
                className="w-full border-slate-600"
                onClick={() => setSelectedEntry(null)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
