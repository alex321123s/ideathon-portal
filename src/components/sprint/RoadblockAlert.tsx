'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Roadblock } from '@/types';

interface RoadblockAlertProps {
  roadblock: Roadblock;
  onShield: () => void;
  onDismiss: () => void;
}

export function RoadblockAlert({ roadblock, onShield, onDismiss }: RoadblockAlertProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const total = new Date(roadblock.endsAt).getTime() - new Date(roadblock.startedAt).getTime();
    
    const interval = setInterval(() => {
      const remaining = Math.max(0, new Date(roadblock.endsAt).getTime() - Date.now());
      setTimeLeft(Math.floor(remaining / 1000));
      setProgress((remaining / total) * 100);
      
      if (remaining <= 0) {
        onDismiss();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [roadblock, onDismiss]);

  if (roadblock.isShielded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="p-4 rounded-xl bg-emerald-500/20 border-2 border-emerald-500/50"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-400">Roadblock Shielded!</h3>
            <p className="text-sm text-emerald-300/80">Your team was protected from the roadblock.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0)', '0 0 30px 10px rgba(239, 68, 68, 0.3)', '0 0 0 0 rgba(239, 68, 68, 0)']
      }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        boxShadow: { duration: 1.5, repeat: Infinity }
      }}
      className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50"
    >
      <div className="flex items-start gap-4">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          className="w-14 h-14 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0"
        >
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-red-400 text-lg">⚠️ ROADBLOCK: {roadblock.name}</h3>
            <div className="flex items-center gap-2 text-red-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-red-300/80 mb-3">{roadblock.description}</p>
          
          <Progress value={progress} className="h-2 bg-red-900/50 mb-3" />
          
          <div className="flex items-center gap-3">
            {roadblock.canBeShielded && (
              <Button
                onClick={onShield}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                <Shield className="w-4 h-4 mr-2" />
                Use Shield Power-up
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={onDismiss}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Accept Penalty
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
