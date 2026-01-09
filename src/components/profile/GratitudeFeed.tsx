'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Star, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { GratitudeMessage } from '@/types';

interface GratitudeFeedProps {
  messages: GratitudeMessage[];
  visibility: 'public' | 'private' | 'teammates_only';
  showVisibilityBadge?: boolean;
}

export function GratitudeFeed({ messages, visibility, showVisibilityBadge = true }: GratitudeFeedProps) {
  const visibilityInfo = {
    public: { label: 'Public', icon: Eye, color: 'text-emerald-400' },
    private: { label: 'Private', icon: EyeOff, color: 'text-slate-400' },
    teammates_only: { label: 'Teammates Only', icon: MessageCircle, color: 'text-blue-400' },
  };

  const info = visibilityInfo[visibility];
  const VisibilityIcon = info.icon;

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            Gratitude Feed
          </CardTitle>
          {showVisibilityBadge && (
            <Badge variant="outline" className={`${info.color} border-current`}>
              <VisibilityIcon className="w-3 h-3 mr-1" />
              {info.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
              <MessageCircle className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm">
              No gratitude messages yet
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Collaborate with others to receive kudos!
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10 border-2 border-pink-500/30">
                      <AvatarImage src={message.fromUserAvatar} />
                      <AvatarFallback className="bg-pink-500/20 text-pink-400">
                        {message.fromUserName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white text-sm">
                          {message.fromUserName}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">
                          {format(new Date(message.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                        "{message.message}"
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">
                          <Star className="w-2.5 h-2.5 mr-1" />
                          {message.eventName}
                        </Badge>
                        {message.isPublic && (
                          <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative quote mark */}
                  <div className="absolute -left-2 top-0 text-4xl text-pink-500/10 font-serif">
                    "
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Trust Score indicator */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Trust Score</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(messages.length * 10, 100)}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                />
              </div>
              <span className="text-white font-medium">
                {Math.min(messages.length * 10 + 50, 100)}%
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Based on {messages.length} gratitude messages received
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
