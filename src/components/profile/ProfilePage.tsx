'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  Shield,
  Eye,
  EyeOff,
  Accessibility,
  BarChart3,
  History,
} from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SuperpowerMatrix } from './SuperpowerMatrix';
import { LegacyVault } from './LegacyVault';
import { GratitudeFeed } from './GratitudeFeed';
import { TrophyCase } from './TrophyCase';
import { useAppStore } from '@/store';

export function ProfilePage() {
  const { currentUser, updateUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentUser?.displayName || '');
  const [editedBio, setEditedBio] = useState(currentUser?.bio || '');

  if (!currentUser) return null;

  const handleSave = () => {
    updateUser({ displayName: editedName, bio: editedBio });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Events', value: currentUser.eventsParticipated, icon: Calendar },
    { label: 'Projects', value: currentUser.projectsCompleted, icon: History },
    { label: 'Consultancies', value: currentUser.consultanciesProvided, icon: Shield },
    { label: 'MVP Wins', value: currentUser.mvpWins, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <User className="w-8 h-8 text-violet-400" />
            Citizen Identity
          </h1>
          <p className="text-slate-400 mt-1">
            Your digital resume of collaborative value
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
        {/* Cover gradient */}
        <div className="h-32 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        
        <CardContent className="relative pt-0">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <Avatar className="w-32 h-32 border-4 border-slate-800 shadow-xl">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-violet-600 text-white text-4xl">
                {currentUser.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Edit button */}
          <div className="flex justify-end pt-4">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-slate-600 text-slate-300"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* User info */}
          <div className="mt-8 space-y-4">
            {isEditing ? (
              <div className="space-y-4 max-w-md">
                <div>
                  <Label className="text-slate-400">Display Name</Label>
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-400">Bio</Label>
                  <Textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="mt-1 bg-slate-700 border-slate-600 text-white resize-none"
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentUser.displayName}</h2>
                  <p className="text-slate-400">@{currentUser.username}</p>
                </div>
                <p className="text-slate-300 max-w-2xl">{currentUser.bio}</p>
              </>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {currentUser.email}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {format(new Date(currentUser.joinedAt), 'MMMM yyyy')}
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                Trust Score: {currentUser.trustScore}%
              </Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-700/50 rounded-lg p-4 text-center"
                  >
                    <Icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="superpowers" className="space-y-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="superpowers" className="data-[state=active]:bg-violet-600">
            Superpower Matrix
          </TabsTrigger>
          <TabsTrigger value="vault" className="data-[state=active]:bg-violet-600">
            Legacy Vault
          </TabsTrigger>
          <TabsTrigger value="gratitude" className="data-[state=active]:bg-violet-600">
            Gratitude Feed
          </TabsTrigger>
          <TabsTrigger value="trophies" className="data-[state=active]:bg-violet-600">
            Trophy Case
          </TabsTrigger>
          <TabsTrigger value="inclusion" className="data-[state=active]:bg-violet-600">
            Inclusion Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="superpowers">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-400" />
                Superpower Matrix
              </CardTitle>
              <p className="text-sm text-slate-400">
                Your expertise based on self-selection and verified peer ratings
              </p>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <SuperpowerMatrix superpowers={currentUser.superpowers} size={320} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vault">
          <LegacyVault powerUps={currentUser.powerUps} />
        </TabsContent>

        <TabsContent value="gratitude">
          <GratitudeFeed 
            messages={currentUser.gratitudeMessages} 
            visibility={currentUser.gratitudeVisibility}
          />
        </TabsContent>

        <TabsContent value="trophies">
          <TrophyCase badges={currentUser.badges} />
        </TabsContent>

        <TabsContent value="inclusion">
          <InclusionProfileSettings 
            profile={currentUser.inclusionProfile}
            onUpdate={(updates) => updateUser({ inclusionProfile: { ...currentUser.inclusionProfile, ...updates } })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Inclusion Profile Settings Component
function InclusionProfileSettings({ 
  profile, 
  onUpdate 
}: { 
  profile: any; 
  onUpdate: (updates: any) => void;
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-violet-400" />
          Personal Inclusion Profile
        </CardTitle>
        <p className="text-sm text-slate-400">
          Configure your accessibility preferences. When you join a team, the dashboard will automatically adapt.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-white">Screen Reader Friendly</Label>
              <p className="text-xs text-slate-400">Optimize content for screen readers</p>
            </div>
            <Switch
              checked={profile.screenReaderFriendly}
              onCheckedChange={(checked) => onUpdate({ screenReaderFriendly: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-white">Prefer Written Communication</Label>
              <p className="text-xs text-slate-400">Default to text-based interactions</p>
            </div>
            <Switch
              checked={profile.prefersWrittenCommunication}
              onCheckedChange={(checked) => onUpdate({ prefersWrittenCommunication: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-white">Reduced Motion</Label>
              <p className="text-xs text-slate-400">Minimize animations and transitions</p>
            </div>
            <Switch
              checked={profile.reducedMotion}
              onCheckedChange={(checked) => onUpdate({ reducedMotion: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-white">Large Text</Label>
              <p className="text-xs text-slate-400">Increase default font sizes</p>
            </div>
            <Switch
              checked={profile.largeText}
              onCheckedChange={(checked) => onUpdate({ largeText: checked })}
            />
          </div>
        </div>

        <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-violet-300 font-medium">Privacy Protected</p>
              <p className="text-xs text-violet-400/80 mt-1">
                Your inclusion preferences are private. Team dashboards adapt automatically without revealing specific settings to teammates.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
