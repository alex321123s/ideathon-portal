'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  AlertTriangle,
  CheckCircle,
  Users,
  Zap,
  ShoppingCart,
  MessageSquare,
  FileImage,
  Send,
  Shield,
  Brain,
  Megaphone,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store';
import { ConsensusVotePanel } from './ConsensusVotePanel';
import { BoostShop } from './BoostShop';
import { RoadblockAlert } from './RoadblockAlert';
import { ChallengeCard } from './ChallengeCard';
import { ServiceMarket } from './ServiceMarket';

interface SprintPhase {
  id: string;
  name: string;
  minute: number;
  type: 'milestone' | 'roadblock' | 'challenge' | 'lockdown' | 'loot';
}

const sprintPhases: SprintPhase[] = [
  { id: 'start', name: 'Sprint Start', minute: 0, type: 'milestone' },
  { id: 'milestone1', name: 'Milestone 1', minute: 20, type: 'milestone' },
  { id: 'challenge1', name: 'User Persona', minute: 30, type: 'challenge' },
  { id: 'roadblock1', name: 'Roadblock #1', minute: 45, type: 'roadblock' },
  { id: 'challenge2', name: 'Solution Sketch', minute: 60, type: 'challenge' },
  { id: 'milestone2', name: 'Milestone 2', minute: 75, type: 'milestone' },
  { id: 'challenge3', name: 'Inclusion Audit', minute: 90, type: 'challenge' },
  { id: 'lockdown', name: 'Lockdown', minute: 110, type: 'lockdown' },
  { id: 'loot', name: 'Loot Drop', minute: 120, type: 'loot' },
];

export function SprintEngine() {
  const { currentTeam, activeEvent } = useAppStore();
  const [currentMinute, setCurrentMinute] = useState(35);
  const [showBoostShop, setShowBoostShop] = useState(false);
  const [showServiceMarket, setShowServiceMarket] = useState(false);
  const [activeConsensusVote, setActiveConsensusVote] = useState<any>(null);
  const [activeRoadblock, setActiveRoadblock] = useState<any>(null);
  const [activeChallenge, setActiveChallenge] = useState<any>(null);

  // Simulate sprint timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute(prev => {
        if (prev >= 120) return 120;
        return prev + 1;
      });
    }, 60000); // Real-time: 1 minute = 1 minute

    return () => clearInterval(interval);
  }, []);

  // Check for phase triggers
  useEffect(() => {
    const currentPhase = sprintPhases.find(p => p.minute === currentMinute);
    if (currentPhase) {
      if (currentPhase.type === 'roadblock' && !activeRoadblock) {
        setActiveRoadblock({
          id: currentPhase.id,
          type: 'resource_drain',
          name: 'Resource Drain',
          description: 'Your team loses 20 points! Quick, use a Shield or work together to recover.',
          duration: 5,
          startedAt: new Date(),
          endsAt: new Date(Date.now() + 5 * 60 * 1000),
          canBeShielded: true,
          isShielded: false,
        });
      }
      if (currentPhase.type === 'challenge') {
        const slideNum = currentPhase.id === 'challenge1' ? 1 : currentPhase.id === 'challenge2' ? 2 : 3;
        setActiveChallenge({
          id: currentPhase.id,
          minute: currentPhase.minute,
          slideNumber: slideNum,
          type: slideNum === 1 ? 'user_persona' : slideNum === 2 ? 'solution_sketch' : 'inclusion_audit',
          title: currentPhase.name,
          description: `Complete Slide ${slideNum} to earn 50 points!`,
          reward: 50,
          deadline: new Date(Date.now() + 15 * 60 * 1000),
          completed: false,
        });
      }
    }
  }, [currentMinute, activeRoadblock]);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const getPhaseProgress = () => {
    return (currentMinute / 120) * 100;
  };

  const getCurrentPhase = () => {
    for (let i = sprintPhases.length - 1; i >= 0; i--) {
      if (currentMinute >= sprintPhases[i].minute) {
        return sprintPhases[i];
      }
    }
    return sprintPhases[0];
  };

  const getNextPhase = () => {
    const currentIndex = sprintPhases.findIndex(p => p.minute > currentMinute);
    return currentIndex >= 0 ? sprintPhases[currentIndex] : null;
  };

  if (!currentTeam || !activeEvent) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Timer className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-400">No Active Sprint</h2>
          <p className="text-slate-500 mt-2">Join a team and wait for the sprint to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sprint Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Timer className="w-8 h-8 text-orange-400" />
            Sprint Active
          </h1>
          <p className="text-slate-400 mt-1">{activeEvent.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-emerald-500/20 text-emerald-400 text-lg px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            {currentTeam.points} pts
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 px-3 py-2">
            <Users className="w-4 h-4 mr-1" />
            {currentTeam.consultancyTokens} Tokens
          </Badge>
        </div>
      </div>

      {/* Timer Bar */}
      <Card className="bg-slate-800/80 border-slate-700 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Time Elapsed</p>
                <p className="text-3xl font-bold text-white font-mono">{formatTime(currentMinute)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Current Phase</p>
              <p className="text-lg font-semibold text-orange-400">{getCurrentPhase().name}</p>
            </div>
          </div>

          {/* Phase Progress */}
          <div className="relative">
            <Progress value={getPhaseProgress()} className="h-3 bg-slate-700" />
            
            {/* Phase markers */}
            <div className="absolute top-0 left-0 right-0 h-3 flex">
              {sprintPhases.map((phase) => {
                const position = (phase.minute / 120) * 100;
                const isPast = currentMinute >= phase.minute;
                const isCurrent = getCurrentPhase().id === phase.id;
                
                return (
                  <div
                    key={phase.id}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        isPast
                          ? phase.type === 'roadblock'
                            ? 'bg-red-500 border-red-400'
                            : phase.type === 'challenge'
                            ? 'bg-amber-500 border-amber-400'
                            : 'bg-emerald-500 border-emerald-400'
                          : 'bg-slate-600 border-slate-500'
                      } ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase labels */}
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            <span>00:00</span>
            {getNextPhase() && (
              <span className="text-orange-400">
                Next: {getNextPhase()?.name} in {getNextPhase()!.minute - currentMinute} min
              </span>
            )}
            <span>02:00</span>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <AnimatePresence>
        {activeRoadblock && (
          <RoadblockAlert
            roadblock={activeRoadblock}
            onShield={() => {
              setActiveRoadblock({ ...activeRoadblock, isShielded: true });
              setTimeout(() => setActiveRoadblock(null), 2000);
            }}
            onDismiss={() => setActiveRoadblock(null)}
          />
        )}
      </AnimatePresence>

      {/* Main Sprint Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Slides/Challenges */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileImage className="w-5 h-5 text-violet-400" />
                  Asset Generators
                </CardTitle>
                <Badge variant="outline" className="border-violet-500/50 text-violet-400">
                  {currentTeam.slides.filter(s => s.completed).length}/3 Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentTeam.slides.map((slide, index) => (
                <SlideEditor
                  key={slide.id}
                  slide={slide}
                  isActive={activeChallenge?.slideNumber === slide.slideNumber}
                  challenge={activeChallenge?.slideNumber === slide.slideNumber ? activeChallenge : null}
                />
              ))}
            </CardContent>
          </Card>

          {/* Consensus Vote Panel */}
          {activeConsensusVote && (
            <ConsensusVotePanel
              vote={activeConsensusVote}
              onVote={(option: string) => {
                console.log('Voted:', option);
                setActiveConsensusVote(null);
              }}
            />
          )}
        </div>

        {/* Right: Actions & Team */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-500/50"
                onClick={() => setShowBoostShop(true)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Boost Shop
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/50"
                onClick={() => setShowServiceMarket(true)}
              >
                <Users className="w-4 h-4 mr-2" />
                Hire Expert
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/50"
                onClick={() => setActiveConsensusVote({
                  id: 'vote-' + Date.now(),
                  teamId: currentTeam.id,
                  question: 'Should we pivot our solution approach?',
                  options: ['Yes, pivot now', 'No, stay the course'],
                  votes: {},
                  requiredPercentage: 50,
                  expiresAt: new Date(Date.now() + 2 * 60 * 1000),
                  resolved: false,
                })}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Vote
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/50"
              >
                <Megaphone className="w-4 h-4 mr-2" />
                Shoutout
              </Button>
            </CardContent>
          </Card>

          {/* Team Status */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Team: {currentTeam.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentTeam.members.map((member) => (
                <div key={member.userId} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-sm font-medium text-violet-400">
                    {member.user.displayName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {member.user.displayName}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {member.superpowerFocus}
                    </p>
                  </div>
                  {member.role === 'leader' && (
                    <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">
                      Leader
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Boosts */}
          {currentTeam.activeBoosts.length > 0 && (
            <Card className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-400" />
                  Active Boosts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentTeam.activeBoosts.map((ab, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                    <span className="text-sm text-violet-300">{ab.boost.name}</span>
                    <Badge className="bg-violet-500/30 text-violet-300 text-[10px]">
                      Active
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Equipped Power-ups */}
          {currentTeam.equippedPowerUps.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Equipped Power-ups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentTeam.equippedPowerUps.map((pu) => (
                  <div key={pu.id} className="flex items-center gap-2 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <span className="text-lg">{pu.icon}</span>
                    <span className="text-sm text-amber-300">{pu.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showBoostShop && (
          <BoostShop
            points={currentTeam.points}
            onPurchase={(boostType: string) => {
              console.log('Purchased:', boostType);
              setShowBoostShop(false);
            }}
            onClose={() => setShowBoostShop(false)}
          />
        )}
        {showServiceMarket && (
          <ServiceMarket
            tokens={currentTeam.consultancyTokens}
            onHire={(userId: string, superpower: string) => {
              console.log('Hired:', userId, superpower);
              setShowServiceMarket(false);
            }}
            onClose={() => setShowServiceMarket(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Slide Editor Component
function SlideEditor({ slide, isActive, challenge }: { slide: any; isActive: boolean; challenge: any }) {
  const { submitSlide } = useAppStore();
  const [content, setContent] = useState(slide.content);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    submitSlide(slide.slideNumber, content);
    setSubmitting(false);
  };

  const slideTypes = {
    user_persona: { icon: Users, label: 'User Persona', color: 'text-blue-400' },
    solution_sketch: { icon: Brain, label: 'Solution Sketch', color: 'text-emerald-400' },
    inclusion_audit: { icon: Shield, label: 'Inclusion Audit', color: 'text-purple-400' },
  };

  const typeInfo = slideTypes[slide.type as keyof typeof slideTypes];
  const Icon = typeInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border-2 transition-all ${
        slide.completed
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : isActive
          ? 'bg-amber-500/10 border-amber-500/50 ring-2 ring-amber-500/20'
          : 'bg-slate-700/50 border-slate-600'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${typeInfo.color}`} />
          </div>
          <div>
            <p className="font-medium text-white">Slide {slide.slideNumber}: {typeInfo.label}</p>
            {isActive && challenge && (
              <p className="text-xs text-amber-400">🔥 Challenge Active! +{challenge.reward} pts</p>
            )}
          </div>
        </div>
        {slide.completed ? (
          <Badge className="bg-emerald-500/20 text-emerald-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            +{slide.points} pts
          </Badge>
        ) : (
          <Badge variant="outline" className="border-slate-500 text-slate-400">
            {slide.points} pts
          </Badge>
        )}
      </div>

      {!slide.completed && (
        <div className="space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Describe your ${typeInfo.label.toLowerCase()}...`}
            className="bg-slate-800 border-slate-600 text-white min-h-[100px] resize-none"
          />
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || submitting}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
          >
            {submitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Slide
              </>
            )}
          </Button>
        </div>
      )}

      {slide.completed && (
        <div className="mt-2 p-3 bg-slate-800/50 rounded-lg">
          <p className="text-sm text-slate-300">{slide.content}</p>
        </div>
      )}
    </motion.div>
  );
}
