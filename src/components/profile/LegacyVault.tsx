'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, GraduationCap, Clock, Sparkles, Lock, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { PowerUp, PowerUpType } from '@/types';

interface LegacyVaultProps {
  powerUps: PowerUp[];
  onEquip?: (powerUpId: string) => void;
  equippedIds?: string[];
  canEquip?: boolean;
}

const powerUpIcons: Record<PowerUpType, React.ReactNode> = {
  roadblock_shield: <Shield className="w-6 h-6" />,
  double_spark: <Zap className="w-6 h-6" />,
  master_consultant: <GraduationCap className="w-6 h-6" />,
  time_warp: <Clock className="w-6 h-6" />,
  insight_boost: <Sparkles className="w-6 h-6" />,
  team_sync: <Zap className="w-6 h-6" />,
};

const rarityColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  common: { bg: 'bg-slate-700', border: 'border-slate-500', text: 'text-slate-300', glow: '' },
  rare: { bg: 'bg-blue-900/50', border: 'border-blue-500', text: 'text-blue-300', glow: 'shadow-blue-500/20' },
  epic: { bg: 'bg-purple-900/50', border: 'border-purple-500', text: 'text-purple-300', glow: 'shadow-purple-500/30' },
  legendary: { bg: 'bg-amber-900/50', border: 'border-amber-500', text: 'text-amber-300', glow: 'shadow-amber-500/40' },
};

export function LegacyVault({ powerUps, onEquip, equippedIds = [], canEquip = false }: LegacyVaultProps) {
  const [selectedPowerUp, setSelectedPowerUp] = useState<PowerUp | null>(null);

  const groupedByRarity = powerUps.reduce((acc, pu) => {
    if (!acc[pu.rarity]) acc[pu.rarity] = [];
    acc[pu.rarity].push(pu);
    return acc;
  }, {} as Record<string, PowerUp[]>);

  const rarityOrder = ['legendary', 'epic', 'rare', 'common'];

  return (
    <TooltipProvider>
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              Legacy Vault
            </CardTitle>
            <Badge variant="outline" className="border-amber-500/50 text-amber-400">
              {powerUps.length} Power-ups
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {powerUps.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
                <Lock className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">
                Complete sprints to earn Legacy Power-ups
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {rarityOrder.map(rarity => 
                groupedByRarity[rarity]?.map((powerUp) => {
                  const colors = rarityColors[powerUp.rarity];
                  const isEquipped = equippedIds.includes(powerUp.id);
                  const isUsed = !!powerUp.usedAt;
                  
                  return (
                    <Tooltip key={powerUp.id}>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (canEquip && !isUsed && onEquip) {
                              onEquip(powerUp.id);
                            } else {
                              setSelectedPowerUp(powerUp);
                            }
                          }}
                          className={`relative p-4 rounded-xl border-2 transition-all ${colors.bg} ${colors.border} ${
                            isUsed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'
                          } ${colors.glow ? `shadow-lg ${colors.glow}` : ''}`}
                        >
                          {isEquipped && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          
                          <div className={`${colors.text}`}>
                            {powerUpIcons[powerUp.type]}
                          </div>
                          
                          <p className="mt-2 text-xs font-medium text-white truncate">
                            {powerUp.name}
                          </p>
                          
                          <Badge 
                            className={`mt-1 text-[10px] ${colors.bg} ${colors.text} border-0`}
                          >
                            {powerUp.rarity}
                          </Badge>
                          
                          {isUsed && (
                            <div className="absolute inset-0 bg-slate-900/60 rounded-xl flex items-center justify-center">
                              <span className="text-xs text-slate-400">Used</span>
                            </div>
                          )}
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="font-semibold">{powerUp.name}</p>
                        <p className="text-xs text-slate-400">{powerUp.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })
              )}
            </div>
          )}

          {canEquip && powerUps.length > 0 && (
            <p className="text-xs text-slate-500 text-center pt-2">
              Click a power-up to equip it for the upcoming sprint
            </p>
          )}
        </CardContent>
      </Card>

      {/* Power-up Detail Modal */}
      <AnimatePresence>
        {selectedPowerUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPowerUp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-16 h-16 mx-auto rounded-xl ${rarityColors[selectedPowerUp.rarity].bg} ${rarityColors[selectedPowerUp.rarity].border} border-2 flex items-center justify-center mb-4`}>
                <span className="text-3xl">{selectedPowerUp.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-2">
                {selectedPowerUp.name}
              </h3>
              <Badge className={`mx-auto block w-fit ${rarityColors[selectedPowerUp.rarity].text} ${rarityColors[selectedPowerUp.rarity].bg}`}>
                {selectedPowerUp.rarity.toUpperCase()}
              </Badge>
              <p className="text-slate-400 text-sm text-center mt-4">
                {selectedPowerUp.description}
              </p>
              <p className="text-xs text-slate-500 text-center mt-2">
                Earned: {new Date(selectedPowerUp.earnedAt).toLocaleDateString()}
              </p>
              <Button
                onClick={() => setSelectedPowerUp(null)}
                className="w-full mt-4 bg-slate-700 hover:bg-slate-600"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
}
