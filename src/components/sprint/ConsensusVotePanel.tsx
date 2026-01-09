'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Vote, Clock, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { ConsensusVote } from '@/types';

interface ConsensusVotePanelProps {
  vote: ConsensusVote;
  onVote: (option: string) => void;
}

export function ConsensusVotePanel({ vote, onVote }: ConsensusVotePanelProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, new Date(vote.expiresAt).getTime() - Date.now());
      setTimeLeft(Math.floor(remaining / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [vote.expiresAt]);

  const handleVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
      setHasVoted(true);
    }
  };

  const totalVotes = Object.keys(vote.votes).length;
  const getOptionVotes = (option: string) => 
    Object.values(vote.votes).filter(v => v === option).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
    >
      <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Vote className="w-5 h-5 text-amber-400" />
              Consensus Vote Required
            </CardTitle>
            <div className="flex items-center gap-2 text-amber-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium text-white">{vote.question}</p>
          
          <div className="space-y-2">
            {vote.options.map((option) => {
              const optionVotes = getOptionVotes(option);
              const percentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;
              
              return (
                <motion.button
                  key={option}
                  whileHover={{ scale: hasVoted ? 1 : 1.02 }}
                  whileTap={{ scale: hasVoted ? 1 : 0.98 }}
                  onClick={() => !hasVoted && setSelectedOption(option)}
                  disabled={hasVoted}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedOption === option
                      ? 'border-amber-400 bg-amber-500/20'
                      : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                  } ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{option}</span>
                    {hasVoted && (
                      <span className="text-sm text-slate-400">
                        {optionVotes} vote{optionVotes !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  {hasVoted && (
                    <Progress value={percentage} className="h-2 bg-slate-700" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {!hasVoted ? (
            <Button
              onClick={handleVote}
              disabled={!selectedOption}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Cast Your Vote
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 bg-emerald-500/20 rounded-lg text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span>Vote submitted! Waiting for team consensus...</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {totalVotes} of 4 voted
            </div>
            <span>Requires {vote.requiredPercentage}% agreement</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
