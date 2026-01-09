'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  Clock,
  Play,
  Pause,
  CheckCircle,
  MoreVertical,
  Copy,
  Archive,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EventManagementPanelProps {
  onCreateEvent: () => void;
}

// Mock events data
const mockEvents = [
  {
    id: '1',
    name: 'Live Innovation Sprint',
    state: 'sprint_active',
    location: 'Innovation Arena, Hall B',
    maxParticipants: 60,
    currentParticipants: 48,
    teamsFormed: 12,
    sprintStart: new Date(),
    sprintEnd: new Date(Date.now() + 2 * 60 * 60 * 1000),
    imageUrl: null,
  },
  {
    id: '2',
    name: 'Spring Ideathon 2026',
    state: 'registration_open',
    location: 'Tech Campus, Room 101',
    maxParticipants: 100,
    currentParticipants: 67,
    teamsFormed: 0,
    sprintStart: new Date('2026-01-20T10:00:00'),
    sprintEnd: new Date('2026-01-20T12:00:00'),
    imageUrl: null,
  },
  {
    id: '3',
    name: 'Winter Innovation Sprint',
    state: 'upcoming',
    location: 'Innovation Hub, Building A',
    maxParticipants: 100,
    currentParticipants: 0,
    teamsFormed: 0,
    sprintStart: new Date('2026-02-15T10:00:00'),
    sprintEnd: new Date('2026-02-15T12:00:00'),
    imageUrl: null,
  },
  {
    id: '4',
    name: 'Autumn Spark 2025',
    state: 'completed',
    location: 'Convention Center',
    maxParticipants: 80,
    currentParticipants: 72,
    teamsFormed: 18,
    sprintStart: new Date('2025-10-15T10:00:00'),
    sprintEnd: new Date('2025-10-15T12:00:00'),
    imageUrl: null,
  },
];

export function EventManagementPanel({ onCreateEvent }: EventManagementPanelProps) {
  const [events, setEvents] = useState(mockEvents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const getStateBadge = (state: string) => {
    switch (state) {
      case 'sprint_active':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 animate-pulse">
            <Play className="w-3 h-3 mr-1" />
            Live
          </Badge>
        );
      case 'registration_open':
        return (
          <Badge className="bg-blue-500/20 text-blue-400">
            <Users className="w-3 h-3 mr-1" />
            Registration Open
          </Badge>
        );
      case 'team_formation':
        return (
          <Badge className="bg-violet-500/20 text-violet-400">
            <Users className="w-3 h-3 mr-1" />
            Team Formation
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge className="bg-amber-500/20 text-amber-400">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-slate-500/20 text-slate-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEventId) {
      setEvents(events.filter(e => e.id !== selectedEventId));
      setDeleteDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  const handleChangeState = (eventId: string, newState: string) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, state: newState } : e
    ));
  };

  return (
    <>
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-400" />
              Event Management
            </CardTitle>
            <Button
              onClick={onCreateEvent}
              size="sm"
              className="bg-violet-600 hover:bg-violet-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px]">
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    event.state === 'sprint_active'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-700/30 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Event Image Placeholder */}
                    <div className="w-20 h-20 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                      {event.imageUrl ? (
                        <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Calendar className="w-8 h-8 text-slate-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white truncate">{event.name}</h3>
                        {getStateBadge(event.state)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.sprintStart.toLocaleDateString()}
                        </span>
                      </div>

                      {/* Participants Progress */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            {event.currentParticipants} / {event.maxParticipants} participants
                          </span>
                          <span className="text-slate-500">
                            {event.teamsFormed} teams
                          </span>
                        </div>
                        <Progress 
                          value={(event.currentParticipants / event.maxParticipants) * 100} 
                          className="h-1.5"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {event.state === 'registration_open' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          onClick={() => handleChangeState(event.id, 'team_formation')}
                        >
                          Start Team Formation
                        </Button>
                      )}
                      {event.state === 'team_formation' && (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleChangeState(event.id, 'sprint_active')}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Start Sprint
                        </Button>
                      )}
                      {event.state === 'sprint_active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                          onClick={() => handleChangeState(event.id, 'completed')}
                        >
                          <Pause className="w-4 h-4 mr-1" />
                          End Sprint
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          {event.state === 'completed' && (
                            <DropdownMenuItem className="text-slate-300 hover:text-white focus:text-white">
                              <Archive className="w-4 h-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                          )}
                          {event.state === 'upcoming' && (
                            <DropdownMenuItem 
                              className="text-slate-300 hover:text-white focus:text-white"
                              onClick={() => handleChangeState(event.id, 'registration_open')}
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Open Registration
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-red-400 hover:text-red-300 focus:text-red-300"
                            onClick={() => {
                              setSelectedEventId(event.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Event</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this event? This action cannot be undone.
              All associated registrations, teams, and data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteEvent}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
