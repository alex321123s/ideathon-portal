'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lightbulb, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store';
import type { IdeathonEvent } from '@/types';

interface EntryGateModalProps {
  event: IdeathonEvent;
  onClose: () => void;
  onSuccess: () => void;
}

export function EntryGateModal({ event, onClose, onSuccess }: EntryGateModalProps) {
  const { registerForEvent } = useAppStore();
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim() || question.length < 20) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    registerForEvent(event.id, question);
    setSubmitted(true);
    setLoading(false);
    
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl blur-lg opacity-50" />
        
        <div className="relative bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden">
          {/* Header */}
          <div className="relative h-24 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl mb-1"
                >
                  <Lightbulb className="w-6 h-6 text-white" />
                </motion.div>
                <h2 className="text-lg font-bold text-white">Entry Gate</h2>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Unlock {event.name}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Submit your "How Might We" question to enter the sprint.
                    The top voted questions become the event projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="How might we... (e.g., reduce food waste in urban communities?)"
                      className="min-h-[120px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                      maxLength={200}
                    />
                    <span className="absolute bottom-2 right-2 text-xs text-slate-500">
                      {question.length}/200
                    </span>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-300/80">
                      <strong>Pro tip:</strong> Great questions are specific, human-centered, and challenge assumptions. 
                      They should inspire multiple creative solutions.
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={question.length < 20 || loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit & Enter
                      </>
                    )}
                  </Button>

                  {question.length > 0 && question.length < 20 && (
                    <p className="text-xs text-red-400 text-center">
                      Question must be at least 20 characters
                    </p>
                  )}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">You're In!</h3>
                <p className="text-slate-400">
                  Your question has been submitted. Redirecting to the event dashboard...
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
