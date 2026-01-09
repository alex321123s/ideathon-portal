'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoginModal } from '@/components/auth/LoginModal';
import { EventDiscovery } from '@/components/events/EventDiscovery';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { TeamDashboard } from '@/components/team/TeamDashboard';
import { SprintEngine } from '@/components/sprint/SprintEngine';
import { MemoryWall } from '@/components/memory/MemoryWall';
import { TrophyCase } from '@/components/profile/TrophyCase';
import { NotificationsPanel } from './NotificationsPanel';
import { SettingsPanel } from './SettingsPanel';
import { SeasonsLeagues } from '@/components/analytics/SeasonsLeagues';
import { PersonalGrowthDashboard } from '@/components/analytics/PersonalGrowthDashboard';
import { TeamAnalytics } from '@/components/analytics/TeamAnalytics';
import { CollaborationHeatmap } from '@/components/analytics/CollaborationHeatmap';

export function Dashboard() {
  const { isAuthenticated, activeTab, setShowLoginModal, currentUser } = useAppStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated, setShowLoginModal]);

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventDiscovery />;
      case 'profile':
        return <ProfilePage />;
      case 'team':
        return <TeamDashboard />;
      case 'sprint':
        return <SprintEngine />;
      case 'memory':
        return <MemoryWall />;
      case 'trophies':
        return currentUser ? <TrophyCase badges={currentUser.badges} /> : null;
      case 'notifications':
        return <NotificationsPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'seasons':
        return <SeasonsLeagues />;
      case 'growth':
        return <PersonalGrowthDashboard />;
      case 'team-analytics':
        return <TeamAnalytics />;
      case 'network':
        return <CollaborationHeatmap />;
      default:
        return <EventDiscovery />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Login Modal */}
      <LoginModal />

      {isAuthenticated && (
        <>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="ml-[280px] min-h-screen p-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}

      {/* Unauthenticated state */}
      {!isAuthenticated && (
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Ideathon Portal</h1>
            <p className="text-slate-400 mb-8">The Collaborative Sprint System</p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/25"
            >
              Enter the Portal
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
