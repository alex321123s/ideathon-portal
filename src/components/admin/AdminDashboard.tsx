'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Calendar,
  Users,
  Settings,
  Plus,
  BarChart3,
  Bell,
  UserCheck,
  AlertTriangle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store';
import { ADMIN_EMAIL, isSupabaseConfigured } from '@/lib/supabase';
import { getAdminStats } from '@/lib/db';
import { EventCreationModal } from './EventCreationModal';
import { UserManagementPanel } from './UserManagementPanel';
import { EventManagementPanel } from './EventManagementPanel';

export function AdminDashboard() {
  const { currentUser } = useAppStore();
  const [showEventModal, setShowEventModal] = useState(false);
  const [stats, setStats] = useState({ totalUsers: 0, activeEvents: 0, teamsFormed: 0, pendingApprovals: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const isDbConfigured = isSupabaseConfigured();

  // Check if user is admin
  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  // Fetch stats from database
  const fetchStats = useCallback(async () => {
    if (!isDbConfigured) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const { data, error } = await getAdminStats();
    if (error) {
      setError(error.message);
    } else {
      setStats(data);
      setError(null);
    }
    setLoading(false);
  }, [isDbConfigured]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, refreshKey]);

  const handleRefresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl max-w-md"
        >
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">
            You do not have permission to access the admin dashboard.
            Only authorized administrators can view this page.
          </p>
        </motion.div>
      </div>
    );
  }

  const statItems = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Active Events', value: stats.activeEvents, icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { label: 'Teams Formed', value: stats.teamsFormed, icon: UserCheck, color: 'text-violet-400', bg: 'bg-violet-500/20' },
    { label: 'Pending Approvals', value: stats.pendingApprovals, icon: Bell, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Database Warning Banner */}
      {!isDbConfigured && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-amber-400 font-medium">Database Not Connected</p>
            <p className="text-sm text-slate-400">
              Add your Supabase credentials to <code className="text-amber-300">.env.local</code> to enable full functionality.
              Currently showing empty data.
            </p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-400" />
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Manage events, users, and platform settings
          </p>
        </div>
        <Button
          onClick={() => setShowEventModal(true)}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {statItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="events" className="data-[state=active]:bg-violet-600">
            <Calendar className="w-4 h-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-violet-600">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-violet-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-violet-600">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <EventManagementPanel onCreateEvent={() => setShowEventModal(true)} />
        </TabsContent>

        <TabsContent value="users">
          <UserManagementPanel />
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-700/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">This Month</span>
                      <span className="text-emerald-400">+34 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Rate</span>
                      <span className="text-blue-400">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Retention</span>
                      <span className="text-violet-400">85%</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-700/30 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4">Event Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Participation</span>
                      <span className="text-emerald-400">45 users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Completion Rate</span>
                      <span className="text-blue-400">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Satisfaction</span>
                      <span className="text-amber-400">4.7/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">General</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">Maintenance Mode</span>
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400">Off</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">New Registrations</span>
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">Email Notifications</span>
                      <Badge variant="outline" className="border-emerald-500 text-emerald-400">Enabled</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Defaults</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">Max Team Size</span>
                      <span className="text-white font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">Sprint Duration</span>
                      <span className="text-white font-medium">2 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-slate-300">Consultancy Tokens</span>
                      <span className="text-white font-medium">3 per team</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Creation Modal */}
      {showEventModal && (
        <EventCreationModal
          onClose={() => setShowEventModal(false)}
          onSave={(eventData: Record<string, unknown>) => {
            console.log('Event created:', eventData);
            setShowEventModal(false);
          }}
        />
      )}
    </div>
  );
}
