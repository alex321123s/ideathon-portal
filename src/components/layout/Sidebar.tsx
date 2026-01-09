'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Calendar,
  User,
  Trophy,
  Users,
  Timer,
  Archive,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Link2,
  Medal,
  Shield,
} from 'lucide-react';
import { ADMIN_EMAIL } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppStore } from '@/store';
import { useState } from 'react';

const navItems = [
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'team', label: 'My Team', icon: Users },
  { id: 'sprint', label: 'Sprint', icon: Timer },
  { id: 'memory', label: 'Memory Wall', icon: Archive },
  { id: 'trophies', label: 'Trophies', icon: Trophy },
  { id: 'divider', label: '', icon: null },
  { id: 'seasons', label: 'Seasons & Leagues', icon: Medal },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp },
  { id: 'team-analytics', label: 'Team Analytics', icon: BarChart3 },
  { id: 'network', label: 'Collaboration Network', icon: Link2 },
  { id: 'admin', label: 'Admin Panel', icon: Shield, adminOnly: true },
];

export function Sidebar() {
  const { currentUser, activeTab, setActiveTab, notifications, logout } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <TooltipProvider>
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, width: collapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="font-bold text-white text-lg">Ideathon</h1>
                <p className="text-xs text-slate-500">Collaborative Sprint</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* User Card */}
        {currentUser && (
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-violet-500/50">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-violet-600 text-white">
                  {currentUser.displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-medium text-white truncate">{currentUser.displayName}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Trust Score:</span>
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {currentUser.trustScore}%
                    </Badge>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            // Check if item is admin-only and user is not admin
            const isAdminItem = 'adminOnly' in item && item.adminOnly;
            const isUserAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
            if (isAdminItem && !isUserAdmin) return null;

            if (item.id === 'divider') {
              return (
                <div key={item.id} className="py-2">
                  <div className="border-t border-slate-700" />
                  {!collapsed && (
                    <p className="text-xs text-slate-500 uppercase mt-2 px-3">Analytics</p>
                  )}
                </div>
              );
            }
            
            const Icon = item.icon!;
            const isActive = activeTab === item.id;
            
            return (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-violet-600/20 text-violet-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-violet-400' : ''}`} />
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-8 bg-violet-500 rounded-r-full"
                      />
                    )}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActiveTab('notifications')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all relative"
              >
                <Bell className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">Notifications</span>}
                {unreadCount > 0 && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </TooltipContent>
            )}
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActiveTab('settings')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">Settings</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Settings</TooltipContent>
            )}
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">Sign Out</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Sign Out</TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}
