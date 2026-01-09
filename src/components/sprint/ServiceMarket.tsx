'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Users, Search, Star, Zap, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { SuperpowerCategory } from '@/types';

interface ServiceMarketProps {
  tokens: number;
  onHire: (userId: string, superpower: SuperpowerCategory) => void;
  onClose: () => void;
}

const mockConsultants = [
  {
    id: 'user-10',
    name: 'Maya Design',
    teamName: 'Team Alpha',
    superpowers: ['design', 'prototyping'] as SuperpowerCategory[],
    rating: 4.8,
    consultancies: 15,
    isMasterConsultant: true,
  },
  {
    id: 'user-11',
    name: 'Alex Strategy',
    teamName: 'Team Beta',
    superpowers: ['strategy', 'research'] as SuperpowerCategory[],
    rating: 4.5,
    consultancies: 8,
    isMasterConsultant: false,
  },
  {
    id: 'user-12',
    name: 'Sam Story',
    teamName: 'Team Gamma',
    superpowers: ['storytelling', 'design'] as SuperpowerCategory[],
    rating: 4.9,
    consultancies: 22,
    isMasterConsultant: true,
  },
];

const superpowerColors: Record<SuperpowerCategory, string> = {
  design: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  strategy: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  storytelling: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  prototyping: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  research: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  technical: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
};

export function ServiceMarket({ tokens, onHire, onClose }: ServiceMarketProps) {
  const [selectedConsultant, setSelectedConsultant] = useState<typeof mockConsultants[0] | null>(null);
  const [selectedSuperpower, setSelectedSuperpower] = useState<SuperpowerCategory | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConsultants = mockConsultants.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.superpowers.some(s => s.includes(searchQuery.toLowerCase()))
  );

  const handleHire = () => {
    if (selectedConsultant && selectedSuperpower) {
      onHire(selectedConsultant.id, selectedSuperpower);
    }
  };

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
        className="w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Service Market
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge className={`${tokens > 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                  <Zap className="w-3 h-3 mr-1" />
                  {tokens} Token{tokens !== 1 ? 's' : ''} Available
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
          
          <CardContent className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {!selectedConsultant ? (
              <>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or superpower..."
                    className="pl-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                {/* Consultants List */}
                <div className="space-y-3">
                  {filteredConsultants.map((consultant) => (
                    <motion.button
                      key={consultant.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => tokens > 0 && setSelectedConsultant(consultant)}
                      disabled={tokens === 0}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        tokens > 0
                          ? 'border-slate-600 hover:border-blue-500/50 cursor-pointer'
                          : 'border-slate-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border-2 border-blue-500/30">
                          <AvatarFallback className="bg-blue-500/20 text-blue-400">
                            {consultant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{consultant.name}</h3>
                            {consultant.isMasterConsultant && (
                              <Badge className="bg-amber-500/20 text-amber-400 text-[10px]">
                                🎓 Master
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2">From {consultant.teamName}</p>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            {consultant.superpowers.map((sp) => (
                              <Badge
                                key={sp}
                                variant="outline"
                                className={`text-xs ${superpowerColors[sp]}`}
                              >
                                {sp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-amber-400 mb-1">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-medium">{consultant.rating}</span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {consultant.consultancies} sessions
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {tokens === 0 && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                    <p className="text-red-400 text-sm">
                      You have no consultancy tokens remaining for this sprint.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Hire Form */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                    <Avatar className="w-14 h-14 border-2 border-blue-500/30">
                      <AvatarFallback className="bg-blue-500/20 text-blue-400 text-lg">
                        {selectedConsultant.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{selectedConsultant.name}</h3>
                      <p className="text-sm text-slate-400">{selectedConsultant.teamName}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Select Superpower Needed
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedConsultant.superpowers.map((sp) => (
                        <Button
                          key={sp}
                          variant="outline"
                          onClick={() => setSelectedSuperpower(sp)}
                          className={`capitalize ${
                            selectedSuperpower === sp
                              ? superpowerColors[sp]
                              : 'border-slate-600 text-slate-400'
                          }`}
                        >
                          {sp}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Brief Description of Help Needed
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What do you need help with?"
                      className="bg-slate-800 border-slate-700 text-white resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedConsultant(null)}
                      className="flex-1 border-slate-600"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleHire}
                      disabled={!selectedSuperpower}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Request (1 Token)
                    </Button>
                  </div>
                </div>
              </>
            )}

            <p className="text-xs text-slate-500 text-center pt-2">
              Consultants earn points for their team and "Bridge Builder" badges
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
