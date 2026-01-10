'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  Trash2,
  Eye,
  Edit,
  MapPin,
  Clock,
  Play,
  Pause,
  CheckCircle,
  MoreVertical,
  Copy,
  Archive,
  RefreshCw,
  Loader2,
  AlertCircle,
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
import { getEvents, updateEvent, deleteEvent, DbEvent, isSupabaseConfigured } from '@/lib/db';

interface EventManagementPanelProps {
  onCreateEvent: () => void;
  onRefresh?: () => void;
}

export function EventManagementPanel({ onCreateEvent, onRefresh }: EventManagementPanelProps) {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const isDbConfigured = isSupabaseConfigured();

  const fetchEvents = useCallback(async () => {
    if (!isDbConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await getEvents();
    setEvents(data);
    setLoading(false);
  }, [isDbConfigured]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
            Registration Open
          </Badge>
        );
      case 'team_formation':
        return (
          <Badge className="bg-violet-500/20 text-violet-400">
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

  const handleDeleteEvent = async () => {
    if (!selectedEventId) return;
    setActionLoading(selectedEventId);
    await deleteEvent(selectedEventId);
    await fetchEvents();
    onRefresh?.();
    setActionLoading(null);
    setDeleteDialogOpen(false);
    setSelectedEventId(null);
  };

  const handleChangeState = async (eventId: string, newState: DbEvent['state']) => {
    setActionLoading(eventId);
    await updateEvent(eventId, { state: newState });
    await fetchEvents();
    onRefresh?.();
    setActionLoading(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[200px]">
          <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
        </div>
      );
    }

    if (!isDbConfigured) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] text-center">
          <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
          <p className="text-slate-400">Database not configured</p>
          <p className="text-sm text-slate-500">Add Supabase credentials to view events</p>
        </div>
      );
    }

    if (events.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] text-center">
          <Calendar className="w-12 h-12 text-slate-500 mb-3" />
          <p className="text-slate-400">No events yet</p>
          <p className="text-sm text-slate-500">Create your first event to get started</p>
          <Button onClick={onCreateEvent} className="mt-4 bg-violet-600 hover:bg-violet-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      );
    }

    return (
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
                <div className="w-20 h-20 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.name} className="w-full h-full object-cover rounded-lg" />
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
                      {new Date(event.sprint_start).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        {event.current_participants} / {event.max_participants} participants
                      </span>
                    </div>
                    <Progress 
                      value={(event.current_participants / event.max_participants) * 100} 
                      className="h-1.5"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {event.state === 'registration_open' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => handleChangeState(event.id, 'team_formation')}
                      disabled={actionLoading === event.id}
                    >
                      Start Team Formation
                    </Button>
                  )}
                  {event.state === 'team_formation' && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleChangeState(event.id, 'sprint_active')}
                      disabled={actionLoading === event.id}
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
                      disabled={actionLoading === event.id}
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
    );
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
          {renderContent()}
        </CardContent>
      </Card>

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
