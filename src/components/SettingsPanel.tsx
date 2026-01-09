'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store';

export function SettingsPanel() {
  const { currentUser, logout, updateUser } = useAppStore();
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const settingSections = [
    {
      id: 'account',
      title: 'Account',
      icon: User,
      description: 'Manage your account settings',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure notification preferences',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your privacy settings',
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize your experience',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="w-8 h-8 text-slate-400" />
          Settings
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
              >
                <Icon className="w-5 h-5" />
                <div>
                  <p className="font-medium">{section.title}</p>
                  <p className="text-xs text-slate-500">{section.description}</p>
                </div>
              </button>
            );
          })}
          
          <Separator className="my-4 bg-slate-700" />
          
          <button className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-slate-800 transition-colors text-slate-400">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>
          
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-red-500/10 transition-colors text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-violet-400" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-xs text-slate-400">Receive updates via email</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label className="text-white">Push Notifications</Label>
                  <p className="text-xs text-slate-400">Real-time browser notifications</p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label className="text-white">Sprint Reminders</Label>
                  <p className="text-xs text-slate-400">Get notified before sprints start</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-violet-400" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-3 block">Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'System', icon: Monitor },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setTheme(option.id as typeof theme)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === option.id
                            ? 'border-violet-500 bg-violet-500/10'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${
                          theme === option.id ? 'text-violet-400' : 'text-slate-400'
                        }`} />
                        <p className={`text-sm font-medium ${
                          theme === option.id ? 'text-white' : 'text-slate-400'
                        }`}>
                          {option.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-violet-400" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label className="text-white">Public Profile</Label>
                  <p className="text-xs text-slate-400">Allow others to view your profile</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label className="text-white">Show Gratitude Feed</Label>
                  <p className="text-xs text-slate-400">Display your gratitude messages publicly</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                <div>
                  <Label className="text-white">Discoverable for Teams</Label>
                  <p className="text-xs text-slate-400">Allow teams to find and invite you</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-500/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Delete Account</p>
                  <p className="text-sm text-slate-400">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
