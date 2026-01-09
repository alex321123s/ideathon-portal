'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Shield, Zap, GraduationCap, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PowerUp, PowerUpType } from '@/types';

interface LootDropRevealProps {
  onComplete: () => void;
}

const possibleLoot: PowerUp[] = [
  {
    id: 'loot-1',
    type: 'roadblock_shield',
    name: 'Roadblock Shield',
    description: 'Protect your team from one roadblock event in the next sprint',
    icon: '🛡️',
    rarity: 'rare',
    earnedAt: new Date(),
  },
  {
    id: 'loot-2',
    type: 'double_spark',
    name: 'Double Spark',
    description: 'Start the next online phase with extra votes',
    icon: '⚡',
    rarity: 'epic',
    earnedAt: new Date(),
  },
  {
    id: 'loot-3',
    type: 'master_consultant',
    name: 'Master Consultant',
    description: 'Earn double points when hired as a consultant',
    icon: '🎓',
    rarity: 'legendary',
    earnedAt: new Date(),
  },
];

const rarityColors = {
  common: { bg: 'from-slate-500 to-slate-600', glow: 'rgba(100, 116, 139, 0.5)' },
  rare: { bg: 'from-blue-500 to-cyan-500', glow: 'rgba(59, 130, 246, 0.5)' },
  epic: { bg: 'from-purple-500 to-pink-500', glow: 'rgba(168, 85, 247, 0.5)' },
  legendary: { bg: 'from-amber-400 to-orange-500', glow: 'rgba(251, 191, 36, 0.6)' },
};

export function LootDropReveal({ onComplete }: LootDropRevealProps) {
  const [phase, setPhase] = useState<'intro' | 'opening' | 'revealed'>('intro');
  const [revealedLoot, setRevealedLoot] = useState<PowerUp | null>(null);

  const handleOpenLoot = () => {
    setPhase('opening');
    
    // Simulate random loot selection
    setTimeout(() => {
      const randomLoot = possibleLoot[Math.floor(Math.random() * possibleLoot.length)];
      setRevealedLoot(randomLoot);
      setPhase('revealed');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Gift className="w-16 h-16 text-white" />
              </div>
              {/* Sparkle effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-300 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * Math.PI) / 4) * 60],
                    y: [0, Math.sin((i * Math.PI) / 4) * 60],
                    opacity: [1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Loot Drop!</h2>
            <p className="text-slate-400 mb-6">
              You've earned a Legacy Power-up for completing the sprint!
            </p>
            
            <Button
              onClick={handleOpenLoot}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-6"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Open Loot Box
            </Button>
          </motion.div>
        )}

        {phase === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.5, repeat: Infinity },
              }}
              className="w-32 h-32 mx-auto mb-6"
            >
              <div className="w-full h-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
                <Gift className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-xl text-violet-300"
            >
              Revealing your loot...
            </motion.p>
          </motion.div>
        )}

        {phase === 'revealed' && revealedLoot && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="text-center"
          >
            {/* Glow effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${rarityColors[revealedLoot.rarity].glow} 0%, transparent 70%)`,
              }}
            />
            
            <Card className={`relative bg-gradient-to-br ${rarityColors[revealedLoot.rarity].bg} border-0 overflow-hidden`}>
              <CardContent className="p-8">
                {/* Rarity badge */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white uppercase tracking-wider">
                    {revealedLoot.rarity}
                  </span>
                </motion.div>
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                  className="text-8xl mb-4"
                >
                  {revealedLoot.icon}
                </motion.div>
                
                {/* Name */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {revealedLoot.name}
                </motion.h2>
                
                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/80 max-w-xs mx-auto mb-6"
                >
                  {revealedLoot.description}
                </motion.p>
                
                {/* Claim button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={onComplete}
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8"
                  >
                    Add to Legacy Vault
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Confetti particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ['#fbbf24', '#a855f7', '#3b82f6', '#10b981', '#ec4899'][i % 5],
                  top: '50%',
                  left: '50%',
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
