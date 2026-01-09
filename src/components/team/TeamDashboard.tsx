'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Shield,
  Zap,
  UserPlus,
  Crown,
  CheckCircle,
  Circle,
  Settings,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAppStore } from '@/store';
import { LegacyVault } from '@/components/profile/LegacyVault';
import type { MilestoneType } from '@/types';

const availableMilestones: { type: MilestoneType; name: string; description: string; dueMinute: number; points: number }[] = [
  { type: 'user_research', name: 'User Research', description: 'Complete initial user persona', dueMinute: 20, points: 30 },
  { type: 'prototype_draft', name: 'Prototype Draft', description: 'Create first solution sketch', dueMinute: 45, points: 40 },
  { type: 'inclusion_audit', name: 'Inclusion Audit', description: 'Review accessibility needs', dueMinute: 75, points: 35 },
  { type: 'business_model', name: 'Business Model', description: 'Define value proposition', dueMinute: 60, points: 30 },
  { type: 'technical_spec', name: 'Technical Spec', description: 'Outline technical approach', dueMinute: 50, points: 35 },
  { type: 'presentation_outline', name: 'Presentation Outline', description: 'Structure final pitch', dueMinute: 90, points: 25 },
];

export function TeamDashboard() {
  const { currentTeam, activeEvent, currentUser, equipPowerUp } = useAppStore();
  const [selectedMilestones, setSelectedMilestones] = useState<MilestoneType[]>([]);
  const [showMilestoneSelection, setShowMilestoneSelection] = useState(true);

  if (!activeEvent) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-400">No Active Event</h2>
          <p className="text-slate-500 mt-2">Join an event to access your team dashboard</p>
        </div>
      </div>
    );
  }

  if (!currentTeam) {
    return <TeamFormation />;
  }

  const toggleMilestone = (type: MilestoneType) => {
    if (selectedMilestones.includes(type)) {
      setSelectedMilestones(prev => prev.filter(m => m !== type));
    } else if (selectedMilestones.length < 3) {
      setSelectedMilestones(prev => [...prev, type]);
    }
  };

  const confirmMilestones = () => {
    setShowMilestoneSelection(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            Team: {currentTeam.name}
          </h1>
          <p className="text-slate-400 mt-1">{activeEvent.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-500/20 text-emerald-400 px-3 py-1">
            <Zap className="w-4 h-4 mr-1" />
            {currentTeam.points} pts
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 px-3 py-1">
            <Users className="w-4 h-4 mr-1" />
            {currentTeam.consultancyTokens} Tokens
          </Badge>
        </div>
      </div>

      {/* Project Question */}
      <Card className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border-violet-500/30">
        <CardContent className="p-6">
          <p className="text-sm text-violet-400 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Your Challenge
          </p>
          <h2 className="text-2xl font-bold text-white">
            "{currentTeam.projectQuestion}"
          </h2>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Team & Milestones */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Members */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Team Members
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Invite
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentTeam.members.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl"
                  >
                    <Avatar className="w-12 h-12 border-2 border-blue-500/30">
                      <AvatarFallback className="bg-blue-500/20 text-blue-400">
                        {member.user.displayName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white truncate">
                          {member.user.displayName}
                        </p>
                        {member.role === 'leader' && (
                          <Crown className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400 capitalize">
                        {member.superpowerFocus} Focus
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-600 text-slate-400 text-xs"
                    >
                      {member.user.trustScore || 85}% Trust
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Milestone Selection */}
          {showMilestoneSelection ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  Milestone Contract
                </CardTitle>
                <p className="text-sm text-slate-400">
                  Select 3 custom milestones for your sprint
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableMilestones.map((milestone) => {
                  const isSelected = selectedMilestones.includes(milestone.type);
                  const isDisabled = !isSelected && selectedMilestones.length >= 3;
                  
                  return (
                    <motion.button
                      key={milestone.type}
                      whileHover={{ scale: isDisabled ? 1 : 1.01 }}
                      onClick={() => !isDisabled && toggleMilestone(milestone.type)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10'
                          : isDisabled
                          ? 'border-slate-700 opacity-50 cursor-not-allowed'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isSelected ? (
                            <CheckCircle className="w-5 h-5 text-amber-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-500" />
                          )}
                          <div>
                            <p className="font-medium text-white">{milestone.name}</p>
                            <p className="text-sm text-slate-400">{milestone.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                            +{milestone.points} pts
                          </Badge>
                          <p className="text-xs text-slate-500 mt-1">
                            Due: {milestone.dueMinute} min
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-slate-400">
                    {selectedMilestones.length}/3 milestones selected
                  </p>
                  <Button
                    onClick={confirmMilestones}
                    disabled={selectedMilestones.length !== 3}
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    Confirm Contract
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    Sprint Milestones
                  </CardTitle>
                  <Badge className="bg-emerald-500/20 text-emerald-400">
                    Contract Signed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableMilestones
                  .filter(m => selectedMilestones.includes(m.type))
                  .map((milestone, i) => (
                    <div
                      key={milestone.type}
                      className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{milestone.name}</p>
                        <p className="text-sm text-slate-400">Due: {milestone.dueMinute} min</p>
                      </div>
                      <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                        +{milestone.points} pts
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Power-ups & Equipment */}
        <div className="space-y-6">
          {/* Legacy Power-ups */}
          {currentUser && (
            <LegacyVault
              powerUps={currentUser.powerUps}
              onEquip={equipPowerUp}
              equippedIds={currentTeam.equippedPowerUps.map(p => p.id)}
              canEquip={true}
            />
          )}

          {/* Team Readiness */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-400" />
                Sprint Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Team Size</span>
                  <span className="text-white">{currentTeam.members.length}/4</span>
                </div>
                <Progress value={(currentTeam.members.length / 4) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Milestones Set</span>
                  <span className="text-white">{selectedMilestones.length}/3</span>
                </div>
                <Progress value={(selectedMilestones.length / 3) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Power-ups Equipped</span>
                  <span className="text-white">{currentTeam.equippedPowerUps.length}</span>
                </div>
                <Progress value={currentTeam.equippedPowerUps.length * 33} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Team Chat Preview */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                Team Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-slate-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Chat available during sprint</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Team Formation Component (when no team exists)
function TeamFormation() {
  const { activeEvent, createTeam, currentUser } = useAppStore();
  const [teamName, setTeamName] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (!activeEvent) return null;

  const handleCreateTeam = () => {
    if (teamName && selectedProject) {
      createTeam(teamName, selectedProject);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-400" />
          Team Formation
        </h1>
        <p className="text-slate-400 mt-1">
          Create or join a team for {activeEvent.name}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create Team */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Create New Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Select Project Challenge
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activeEvent.projects.filter(p => p.selected).map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      selectedProject === project.id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <p className="text-sm text-white line-clamp-2">{project.question}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        {project.votes} votes
                      </Badge>
                      {project.isSponsored && (
                        <Badge className="text-xs bg-amber-500/20 text-amber-400">
                          Sponsored
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleCreateTeam}
              disabled={!teamName || !selectedProject}
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              Create Team
            </Button>
          </CardContent>
        </Card>

        {/* Join Team */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Join Existing Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No open teams available</p>
              <p className="text-sm mt-1">Create your own or wait for invites</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
