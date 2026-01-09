'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Zap, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Challenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete?: () => void;
}

export function ChallengeCard({ challenge, onComplete }: ChallengeCardProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const total = 15 * 60 * 1000; // 15 minutes for challenges
    
    const interval = setInterval(() => {
      const remaining = Math.max(0, new Date(challenge.deadline).getTime() - Date.now());
      setTimeLeft(Math.floor(remaining / 1000));
      setProgress((remaining / total) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [challenge.deadline]);

  if (challenge.completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="bg-emerald-500/20 border-emerald-500/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-emerald-400">{challenge.title} Complete!</h3>
                <p className="text-sm text-emerald-300/80">+{challenge.reward} points earned</p>
              </div>
              <Badge className="bg-emerald-500/30 text-emerald-300">
                <Zap className="w-3 h-3 mr-1" />
                +{challenge.reward}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0"
            >
              <Target className="w-6 h-6 text-white" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-white">🎯 Challenge: {challenge.title}</h3>
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-sm">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-amber-200/80 mb-3">{challenge.description}</p>
              
              <div className="flex items-center gap-3">
                <Progress value={progress} className="flex-1 h-2 bg-amber-900/50" />
                <Badge className="bg-amber-500/30 text-amber-300 flex-shrink-0">
                  <Zap className="w-3 h-3 mr-1" />
                  {challenge.reward} pts
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 border-2 border-amber-400/50 rounded-xl pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </Card>
    </motion.div>
  );
}
