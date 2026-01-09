'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Star, Users, Lightbulb, Heart, Zap, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Badge as BadgeType, BadgeType as BadgeTypeEnum } from '@/types';

interface TrophyCaseProps {
  badges: BadgeType[];
}

const badgeIcons: Record<BadgeTypeEnum, React.ReactNode> = {
  bridge_builder: <Users className="w-8 h-8" />,
  mvp: <Trophy className="w-8 h-8" />,
  consensus_champion: <Zap className="w-8 h-8" />,
  rapid_responder: <Lightbulb className="w-8 h-8" />,
  inclusion_advocate: <Heart className="w-8 h-8" />,
  spark_igniter: <Star className="w-8 h-8" />,
  mentor: <BookOpen className="w-8 h-8" />,
  innovator: <Award className="w-8 h-8" />,
};

const rarityStyles: Record<string, { bg: string; border: string; shadow: string; text: string }> = {
  bronze: { 
    bg: 'bg-gradient-to-br from-amber-700/40 to-orange-800/40', 
    border: 'border-amber-600/50',
    shadow: 'shadow-amber-600/20',
    text: 'text-amber-400'
  },
  silver: { 
    bg: 'bg-gradient-to-br from-slate-400/30 to-slate-500/30', 
    border: 'border-slate-400/50',
    shadow: 'shadow-slate-400/20',
    text: 'text-slate-300'
  },
  gold: { 
    bg: 'bg-gradient-to-br from-yellow-500/40 to-amber-500/40', 
    border: 'border-yellow-500/50',
    shadow: 'shadow-yellow-500/30',
    text: 'text-yellow-400'
  },
  platinum: { 
    bg: 'bg-gradient-to-br from-cyan-400/30 to-blue-400/30', 
    border: 'border-cyan-400/50',
    shadow: 'shadow-cyan-400/30',
    text: 'text-cyan-300'
  },
};

export function TrophyCase({ badges }: TrophyCaseProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);

  const sortedBadges = [...badges].sort((a, b) => {
    const order = ['platinum', 'gold', 'silver', 'bronze'];
    return order.indexOf(a.rarity) - order.indexOf(b.rarity);
  });

  return (
    <>
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              Trophy Case
            </CardTitle>
            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
              {badges.length} Badges
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {badges.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">
                No badges earned yet
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Participate in sprints to unlock achievements!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {sortedBadges.map((badge, index) => {
                const styles = rarityStyles[badge.rarity];
                
                return (
                  <motion.button
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedBadge(badge)}
                    className={`relative aspect-square rounded-xl border-2 ${styles.bg} ${styles.border} ${styles.shadow} shadow-lg flex flex-col items-center justify-center p-2 cursor-pointer transition-all hover:shadow-xl`}
                  >
                    <div className={`${styles.text}`}>
                      {badgeIcons[badge.type]}
                    </div>
                    <span className="text-[10px] font-medium text-white mt-1 text-center line-clamp-1">
                      {badge.name}
                    </span>
                    
                    {/* Shine effect for gold and platinum */}
                    {(badge.rarity === 'gold' || badge.rarity === 'platinum') && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Rarity Legend */}
          {badges.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700">
              {['bronze', 'silver', 'gold', 'platinum'].map((rarity) => {
                const styles = rarityStyles[rarity];
                const count = badges.filter(b => b.rarity === rarity).length;
                return (
                  <div key={rarity} className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${styles.bg} ${styles.border} border`} />
                    <span className={`text-xs ${styles.text}`}>
                      {rarity.charAt(0).toUpperCase() + rarity.slice(1)} ({count})
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
              className="bg-slate-800 rounded-2xl border border-slate-700 p-8 max-w-sm mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Badge showcase */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className={`w-24 h-24 mx-auto rounded-2xl ${rarityStyles[selectedBadge.rarity].bg} ${rarityStyles[selectedBadge.rarity].border} border-2 flex items-center justify-center mb-4 ${rarityStyles[selectedBadge.rarity].shadow} shadow-xl`}
              >
                <span className="text-4xl">{selectedBadge.icon}</span>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedBadge.name}
              </h3>
              
              <Badge className={`${rarityStyles[selectedBadge.rarity].text} ${rarityStyles[selectedBadge.rarity].bg} border-0 text-sm`}>
                {selectedBadge.rarity.toUpperCase()}
              </Badge>
              
              <p className="text-slate-400 mt-4 leading-relaxed">
                {selectedBadge.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-700 text-sm text-slate-500">
                Earned on {format(new Date(selectedBadge.earnedAt), 'MMMM d, yyyy')}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
