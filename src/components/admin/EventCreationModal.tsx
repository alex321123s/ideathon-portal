'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Image,
  MapPin,
  Users,
  Clock,
  FileText,
  Palette,
  Upload,
  Sparkles,
  Save,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EventFormData {
  name: string;
  description: string;
  imageUrl: string;
  imageFile: File | null;
  location: string;
  maxParticipants: number;
  minTeamSize: number;
  maxTeamSize: number;
  registrationOpens: string;
  registrationCloses: string;
  teamFormationStart: string;
  sprintStart: string;
  sprintEnd: string;
  sprintDuration: number; // in minutes
  generatedTheme: string;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  consultancyTokensPerTeam: number;
  enableRoadblocks: boolean;
  enableBoostShop: boolean;
}

interface EventCreationModalProps {
  onClose: () => void;
  onSave: (data: EventFormData) => void;
  editEvent?: Partial<EventFormData>;
}

export function EventCreationModal({ onClose, onSave, editEvent }: EventCreationModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(editEvent?.imageUrl || null);
  const [formData, setFormData] = useState<EventFormData>({
    name: editEvent?.name || '',
    description: editEvent?.description || '',
    imageUrl: editEvent?.imageUrl || '',
    imageFile: null,
    location: editEvent?.location || '',
    maxParticipants: editEvent?.maxParticipants || 100,
    minTeamSize: editEvent?.minTeamSize || 3,
    maxTeamSize: editEvent?.maxTeamSize || 5,
    registrationOpens: editEvent?.registrationOpens || '',
    registrationCloses: editEvent?.registrationCloses || '',
    teamFormationStart: editEvent?.teamFormationStart || '',
    sprintStart: editEvent?.sprintStart || '',
    sprintEnd: editEvent?.sprintEnd || '',
    sprintDuration: editEvent?.sprintDuration || 120,
    generatedTheme: editEvent?.generatedTheme || '',
    themeColors: editEvent?.themeColors || {
      primary: '#8B5CF6',
      secondary: '#6366F1',
      accent: '#EC4899',
    },
    consultancyTokensPerTeam: editEvent?.consultancyTokensPerTeam || 3,
    enableRoadblocks: editEvent?.enableRoadblocks ?? true,
    enableBoostShop: editEvent?.enableBoostShop ?? true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field: keyof EventFormData, value: unknown) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  const totalSteps = 4;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-violet-400" />
                {editEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Step {step} of {totalSteps}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 py-3 bg-slate-800/50">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    s <= step ? 'bg-violet-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="p-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-violet-400" />
                    <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300">Event Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Winter Innovation Sprint"
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-slate-300">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        placeholder="A collaborative sprint focused on sustainable innovation..."
                        rows={4}
                        className="mt-1 bg-slate-800 border-slate-700 text-white resize-none"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Event Image</Label>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-1 border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-violet-500 transition-colors"
                      >
                        {imagePreview ? (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-48 mx-auto rounded-lg"
                            />
                            <Badge className="absolute top-2 right-2 bg-slate-800">
                              Click to change
                            </Badge>
                          </div>
                        ) : (
                          <div className="py-8">
                            <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                            <p className="text-slate-400">Click to upload event image</p>
                            <p className="text-slate-500 text-sm mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-slate-300">Location *</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          placeholder="Innovation Hub, Building A"
                          className="pl-10 bg-slate-800 border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Dates & Times */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-violet-400" />
                    <h3 className="text-lg font-semibold text-white">Schedule & Timing</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Registration Opens *</Label>
                      <Input
                        type="datetime-local"
                        value={formData.registrationOpens}
                        onChange={(e) => updateField('registrationOpens', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Registration Closes *</Label>
                      <Input
                        type="datetime-local"
                        value={formData.registrationCloses}
                        onChange={(e) => updateField('registrationCloses', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Team Formation Start *</Label>
                      <Input
                        type="datetime-local"
                        value={formData.teamFormationStart}
                        onChange={(e) => updateField('teamFormationStart', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Sprint Start *</Label>
                      <Input
                        type="datetime-local"
                        value={formData.sprintStart}
                        onChange={(e) => updateField('sprintStart', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300">Sprint Duration</Label>
                    <Select
                      value={formData.sprintDuration.toString()}
                      onValueChange={(v) => updateField('sprintDuration', parseInt(v))}
                    >
                      <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Participants & Teams */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-violet-400" />
                    <h3 className="text-lg font-semibold text-white">Participants & Teams</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Max Participants *</Label>
                      <Input
                        type="number"
                        min={10}
                        max={500}
                        value={formData.maxParticipants}
                        onChange={(e) => updateField('maxParticipants', parseInt(e.target.value))}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                      <p className="text-xs text-slate-500 mt-1">Maximum number of registrations allowed</p>
                    </div>
                    <div>
                      <Label className="text-slate-300">Consultancy Tokens per Team</Label>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        value={formData.consultancyTokensPerTeam}
                        onChange={(e) => updateField('consultancyTokensPerTeam', parseInt(e.target.value))}
                        className="mt-1 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Min Team Size</Label>
                      <Select
                        value={formData.minTeamSize.toString()}
                        onValueChange={(v) => updateField('minTeamSize', parseInt(v))}
                      >
                        <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {[2, 3, 4, 5].map((n) => (
                            <SelectItem key={n} value={n.toString()}>{n} members</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Max Team Size</Label>
                      <Select
                        value={formData.maxTeamSize.toString()}
                        onValueChange={(v) => updateField('maxTeamSize', parseInt(v))}
                      >
                        <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {[3, 4, 5, 6, 7, 8].map((n) => (
                            <SelectItem key={n} value={n.toString()}>{n} members</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-300">Sprint Features</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.enableRoadblocks}
                          onChange={(e) => updateField('enableRoadblocks', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-600"
                        />
                        <div>
                          <p className="text-white font-medium">Enable Roadblocks</p>
                          <p className="text-sm text-slate-400">Random challenges that teams must overcome</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.enableBoostShop}
                          onChange={(e) => updateField('enableBoostShop', e.target.checked)}
                          className="w-4 h-4 rounded border-slate-600"
                        />
                        <div>
                          <p className="text-white font-medium">Enable Boost Shop</p>
                          <p className="text-sm text-slate-400">Allow teams to purchase boosts with points</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Theme & Branding */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-violet-400" />
                    <h3 className="text-lg font-semibold text-white">Theme & Branding</h3>
                  </div>

                  <div>
                    <Label className="text-slate-300">Generated Theme (Optional)</Label>
                    <div className="relative mt-1">
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        value={formData.generatedTheme}
                        onChange={(e) => updateField('generatedTheme', e.target.value)}
                        placeholder="e.g., Sustainable Urban Living"
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Leave empty to auto-generate from participant questions</p>
                  </div>

                  <div>
                    <Label className="text-slate-300">Theme Colors</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Primary</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={formData.themeColors.primary}
                            onChange={(e) => updateField('themeColors', { ...formData.themeColors, primary: e.target.value })}
                            className="w-10 h-10 rounded cursor-pointer"
                          />
                          <Input
                            value={formData.themeColors.primary}
                            onChange={(e) => updateField('themeColors', { ...formData.themeColors, primary: e.target.value })}
                            className="flex-1 bg-slate-800 border-slate-700 text-white font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Secondary</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={formData.themeColors.secondary}
                            onChange={(e) => updateField('themeColors', { ...formData.themeColors, secondary: e.target.value })}
                            className="w-10 h-10 rounded cursor-pointer"
                          />
                          <Input
                            value={formData.themeColors.secondary}
                            onChange={(e) => updateField('themeColors', { ...formData.themeColors, secondary: e.target.value })}
                            className="flex-1 bg-slate-800 border-slate-700 text-white font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Accent</p>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={formData.themeColors.accent}
                            onChange={(e) => updateField('themeColors', { ...formData.themeColors, accent: e.target.value })}
                            className="w-10 h-10 rounded cursor-pointer"
                          />
                          <Input
                            value={formData.themeColors.accent}
                            onChange={(e) => updateField('themeColors', { ...formData.themeColors, accent: e.target.value })}
                            className="flex-1 bg-slate-800 border-slate-700 text-white font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <Label className="text-slate-300 mb-2 block">Preview</Label>
                    <div
                      className="p-6 rounded-xl border border-slate-700"
                      style={{ background: `linear-gradient(135deg, ${formData.themeColors.primary}20, ${formData.themeColors.secondary}20)` }}
                    >
                      <div className="flex items-center gap-4">
                        {imagePreview && (
                          <img src={imagePreview} alt="" className="w-16 h-16 rounded-lg object-cover" />
                        )}
                        <div>
                          <h4 className="text-xl font-bold text-white">{formData.name || 'Event Name'}</h4>
                          <p className="text-slate-400">{formData.location || 'Location'}</p>
                          {formData.generatedTheme && (
                            <Badge
                              style={{ backgroundColor: `${formData.themeColors.primary}30`, color: formData.themeColors.primary }}
                              className="mt-2"
                            >
                              {formData.generatedTheme}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-800/50">
            <Button
              variant="outline"
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {step < totalSteps ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
