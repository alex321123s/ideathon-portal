'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  Lock,
  Unlock,
  ChevronRight,
  Sparkles,
  Clock,
  Star,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';
import type { EventState } from '@/types';
import { getEvents, DbEvent } from '@/lib/db';

const stateLabels: Record<EventState, { label: string; color: string }> = {
  upcoming: { label: 'Coming Soon', color: 'bg-slate-500' },
  registration_open: { label: 'Registration Open', color: 'bg-emerald-500' },
  team_formation: { label: 'Team Formation', color: 'bg-blue-500' },
  sprint_active: { label: 'Sprint Active', color: 'bg-orange-500' },
  presentation: { label: 'Presentations', color: 'bg-purple-500' },
  rating: { label: 'Rating Phase', color: 'bg-pink-500' },
  completed: { label: 'Completed', color: 'bg-slate-600' },
};

// Map database event to display format
interface DisplayEvent {
  id: string;
  name: string;
  description: string | null;
  state: EventState;
  location: string;
  sprintStart: string;
  registrationOpens: string;
  registrationCloses: string;
  currentParticipants: number;
  maxParticipants: number;
  generatedTheme: string | null;
  imageUrl: string | null;
}

function mapDbEventToDisplay(event: DbEvent): DisplayEvent {
  return {
    id: event.id,
    name: event.name,
    description: event.description,
    state: event.state as EventState,
    location: event.location,
    sprintStart: event.sprint_start,
    registrationOpens: event.registration_opens,
    registrationCloses: event.registration_closes,
    currentParticipants: event.current_participants,
    maxParticipants: event.max_participants,
    generatedTheme: event.generated_theme,
    imageUrl: event.image_url,
  };
}

export function EventDiscovery() {
  const { setActiveTab } = useAppStore();
  const [events, setEvents] = useState<DisplayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<DisplayEvent | null>(null);
  const [showEntryGate, setShowEntryGate] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data } = await getEvents();
    setEvents(data.map(mapDbEventToDisplay));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const sortedEvents = [...events].sort((a, b) => {
    if (a.state === 'completed' && b.state !== 'completed') return 1;
    if (a.state !== 'completed' && b.state === 'completed') return -1;
    return new Date(a.sprintStart).getTime() - new Date(b.sprintStart).getTime();
  });

  const handleEventClick = (event: DisplayEvent) => {
    if (event.state === 'upcoming') return;
    setSelectedEvent(event);
    if (event.state === 'registration_open') {
      setShowEntryGate(true);
    } else {
      setActiveTab('team');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-violet-400" />
            Event Discovery
          </h1>
          <p className="text-slate-400 mt-1">
            Explore upcoming sprints and join the collaborative journey
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{events.filter(e => e.state !== 'completed').length} active events</span>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-purple-500 to-slate-700" />
        
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Calendar className="w-12 h-12 text-slate-500 mb-3" />
            <p className="text-slate-400">No events yet</p>
            <p className="text-sm text-slate-500">Check back later for upcoming events</p>
          </div>
        )}

        {/* Events List */}
        {!loading && events.length > 0 && (
        <div className="space-y-6">
          {sortedEvents.map((event, index) => {
            const isLocked = event.state === 'upcoming';
            const isActive = event.state === 'registration_open' || event.state === 'team_formation';
            const stateInfo = stateLabels[event.state];
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline Node */}
                <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 ${
                  isLocked 
                    ? 'bg-slate-700 border-slate-600' 
                    : isActive 
                    ? 'bg-violet-500 border-violet-400 animate-pulse' 
                    : 'bg-slate-600 border-slate-500'
                }`}>
                  {isLocked && (
                    <Lock className="w-2 h-2 text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>

                <Card 
                  className={`group cursor-pointer transition-all duration-300 ${
                    isLocked 
                      ? 'bg-slate-800/50 border-slate-700/50 opacity-60' 
                      : 'bg-slate-800/80 border-slate-700 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10'
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge className={`${stateInfo.color} text-white text-xs`}>
                            {stateInfo.label}
                          </Badge>
                          {event.generatedTheme && (
                            <Badge variant="outline" className="border-violet-500/50 text-violet-400 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Theme Generated
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {event.name}
                        </h3>
                        {event.generatedTheme && (
                          <p className="text-sm text-violet-400 italic">
                            "{event.generatedTheme}"
                          </p>
                        )}
                      </div>
                      {!isLocked && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-slate-400 group-hover:text-violet-400 group-hover:bg-violet-500/10"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(event.sprintStart), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(event.sprintStart), 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Participants Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Participants
                        </span>
                        <span className="text-white font-medium">
                          {event.currentParticipants}/{event.maxParticipants}
                        </span>
                      </div>
                      <Progress 
                        value={(event.currentParticipants / event.maxParticipants) * 100} 
                        className="h-2 bg-slate-700"
                      />
                    </div>

                    {/* Registration countdown or status */}
                    {isActive && (
                      <div className="flex items-center justify-between p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                        <div className="flex items-center gap-2 text-violet-300">
                          <Unlock className="w-4 h-4" />
                          <span className="text-sm font-medium">Entry Gate Open</span>
                        </div>
                        <span className="text-xs text-violet-400">
                          Closes {formatDistanceToNow(new Date(event.registrationCloses), { addSuffix: true })}
                        </span>
                      </div>
                    )}

                    {isLocked && (
                      <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Registration opens</span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {formatDistanceToNow(new Date(event.registrationOpens), { addSuffix: true })}
                        </span>
                      </div>
                    )}

                    {/* Event Description Preview */}
                    {event.description && (
                      <div className="pt-2 border-t border-slate-700">
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>

      {/* Entry Gate Modal - simplified for now */}
      <AnimatePresence>
        {showEntryGate && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => {
              setShowEntryGate(false);
              setSelectedEvent(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-2">Register for {selectedEvent.name}</h3>
              <p className="text-slate-400 mb-4">Registration is open! Click below to join this event.</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-600"
                  onClick={() => {
                    setShowEntryGate(false);
                    setSelectedEvent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-violet-600 hover:bg-violet-700"
                  onClick={() => {
                    setShowEntryGate(false);
                    setActiveTab('team');
                  }}
                >
                  Join Event
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
