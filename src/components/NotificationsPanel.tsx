'use client';

import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Zap, Users, Target, Gift, Heart, AlertTriangle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/store';
import type { Notification } from '@/types';

const notificationIcons: Record<string, React.ReactNode> = {
  challenge: <Target className="w-5 h-5 text-amber-400" />,
  roadblock: <AlertTriangle className="w-5 h-5 text-red-400" />,
  consensus: <Users className="w-5 h-5 text-blue-400" />,
  consultancy: <Users className="w-5 h-5 text-purple-400" />,
  milestone: <Zap className="w-5 h-5 text-emerald-400" />,
  loot: <Gift className="w-5 h-5 text-amber-400" />,
  kudos: <Heart className="w-5 h-5 text-pink-400" />,
};

export function NotificationsPanel() {
  const { notifications, markNotificationRead, clearNotifications } = useAppStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Bell className="w-8 h-8 text-violet-400" />
            Notifications
          </h1>
          <p className="text-slate-400 mt-1">
            Stay updated on sprint activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge className="bg-red-500/20 text-red-400">
              {unreadCount} unread
            </Badge>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearNotifications}
              className="border-slate-600 text-slate-400"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-400">All Caught Up!</h3>
              <p className="text-slate-500 mt-1">No notifications at the moment</p>
            </div>
          ) : (
            <ScrollArea className="max-h-[600px]">
              <div className="divide-y divide-slate-700">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 flex items-start gap-4 hover:bg-slate-700/30 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-violet-500/5' : ''
                    }`}
                    onClick={() => markNotificationRead(notification.id)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      !notification.read ? 'bg-violet-500/20' : 'bg-slate-700/50'
                    }`}>
                      {notificationIcons[notification.type] || <Bell className="w-5 h-5 text-slate-400" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`font-medium ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-slate-400 mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
