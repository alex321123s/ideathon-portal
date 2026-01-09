'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, Heart, Send, CheckCircle, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store';
import type { TeamMember } from '@/types';

export function RatingPanel() {
  const { currentTeam, currentUser, rateTeammate, sendGratitude } = useAppStore();
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<string, { rating: number; feedback: string; isMvp: boolean }>>({});
  const [mvpVote, setMvpVote] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  if (!currentTeam || !currentUser) {
    return null;
  }

  const otherMembers = currentTeam.members.filter(m => m.userId !== currentUser.id);
  const currentMember = otherMembers[currentMemberIndex];

  const handleRatingChange = (rating: number) => {
    setRatings(prev => ({
      ...prev,
      [currentMember.userId]: {
        ...prev[currentMember.userId],
        rating,
      },
    }));
  };

  const handleFeedbackChange = (feedback: string) => {
    setRatings(prev => ({
      ...prev,
      [currentMember.userId]: {
        ...prev[currentMember.userId],
        feedback,
      },
    }));
  };

  const handleNext = () => {
    if (currentMemberIndex < otherMembers.length - 1) {
      setCurrentMemberIndex(prev => prev + 1);
    }
  };

  const handleSubmitAll = () => {
    Object.entries(ratings).forEach(([userId, data]) => {
      rateTeammate(userId, data.rating, data.feedback, userId === mvpVote);
      if (data.feedback) {
        sendGratitude(userId, data.feedback, true);
      }
    });
    setCompleted(true);
  };

  const currentRating = ratings[currentMember?.userId]?.rating || 0;
  const currentFeedback = ratings[currentMember?.userId]?.feedback || '';
  const allRated = otherMembers.every(m => ratings[m.userId]?.rating > 0);

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Ratings Submitted!</h2>
        <p className="text-slate-400">Thank you for rating your teammates. Your feedback helps build trust.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Star className="w-8 h-8 text-amber-400" />
            Rate Your Teammates
          </h1>
          <p className="text-slate-400 mt-1">
            Share feedback and vote for the MVP
          </p>
        </div>
        <Badge variant="outline" className="border-violet-500/50 text-violet-400">
          {currentMemberIndex + 1} of {otherMembers.length}
        </Badge>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {otherMembers.map((member, i) => (
          <div
            key={member.userId}
            className={`flex-1 h-2 rounded-full transition-all ${
              i < currentMemberIndex
                ? 'bg-emerald-500'
                : i === currentMemberIndex
                ? 'bg-violet-500'
                : 'bg-slate-700'
            }`}
          />
        ))}
      </div>

      {/* Current Member Rating */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMember?.userId}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-20 h-20 border-4 border-violet-500/30 mb-4">
                  <AvatarFallback className="bg-violet-500/20 text-violet-400 text-2xl">
                    {currentMember?.user.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-white">
                  {currentMember?.user.displayName}
                </h3>
                <p className="text-slate-400 capitalize">
                  {currentMember?.superpowerFocus} Focus
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= currentRating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Feedback */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message of Gratitude (Optional)
                </label>
                <Textarea
                  value={currentFeedback}
                  onChange={(e) => handleFeedbackChange(e.target.value)}
                  placeholder="Share what you appreciated about working with this teammate..."
                  className="bg-slate-700 border-slate-600 text-white resize-none"
                  rows={3}
                />
              </div>

              {/* MVP Vote */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <div>
                      <p className="font-medium text-white">Nominate as MVP?</p>
                      <p className="text-xs text-amber-400/80">
                        You can only nominate one teammate
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={mvpVote === currentMember?.userId ? 'default' : 'outline'}
                    onClick={() => setMvpVote(
                      mvpVote === currentMember?.userId ? null : currentMember?.userId
                    )}
                    className={
                      mvpVote === currentMember?.userId
                        ? 'bg-amber-500 hover:bg-amber-600 text-black'
                        : 'border-amber-500/50 text-amber-400'
                    }
                  >
                    {mvpVote === currentMember?.userId ? '🏆 Nominated' : 'Nominate'}
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3">
                {currentMemberIndex > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentMemberIndex(prev => prev - 1)}
                    className="border-slate-600"
                  >
                    Previous
                  </Button>
                )}
                <div className="flex-1" />
                {currentMemberIndex < otherMembers.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!currentRating}
                    className="bg-violet-600 hover:bg-violet-700"
                  >
                    Next Teammate
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitAll}
                    disabled={!allRated}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit All Ratings
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
