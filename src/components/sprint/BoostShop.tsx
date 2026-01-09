'use client';

import { motion } from 'framer-motion';
import { X, ShoppingCart, Brain, Megaphone, Focus, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BoostShopProps {
  points: number;
  onPurchase: (boostType: string) => void;
  onClose: () => void;
}

const boosts = [
  {
    type: 'deep_focus',
    name: 'Deep Focus',
    description: 'Block all distractions for 10 minutes. Your team gets a concentration bonus.',
    cost: 30,
    icon: Focus,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    type: 'ai_ghostwriter',
    name: 'AI Ghostwriter',
    description: 'Get AI-powered suggestions for your current slide content.',
    cost: 50,
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
  },
  {
    type: 'hall_shoutout',
    name: 'Hall Shoutout',
    description: 'Broadcast a message to all teams in the hall. Great for finding collaborators!',
    cost: 20,
    icon: Megaphone,
    color: 'from-amber-500 to-orange-500',
  },
];

export function BoostShop({ points, onPurchase, onClose }: BoostShopProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-violet-400" />
                Boost Shop
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  <Zap className="w-3 h-3 mr-1" />
                  {points} pts available
                </Badge>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {boosts.map((boost) => {
              const Icon = boost.icon;
              const canAfford = points >= boost.cost;
              
              return (
                <motion.div
                  key={boost.type}
                  whileHover={{ scale: canAfford ? 1.02 : 1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    canAfford
                      ? 'border-slate-600 hover:border-violet-500/50 cursor-pointer'
                      : 'border-slate-700 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => canAfford && onPurchase(boost.type)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${boost.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white">{boost.name}</h3>
                        <Badge variant="outline" className={`${canAfford ? 'border-emerald-500/50 text-emerald-400' : 'border-red-500/50 text-red-400'}`}>
                          {boost.cost} pts
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">{boost.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <p className="text-xs text-slate-500 text-center pt-2">
              Boosts are consumed immediately upon purchase
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
