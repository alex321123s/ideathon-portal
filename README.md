# 🚀 Ideathon Portal - The Collaborative Sprint System

A high-octane, gamified platform designed to bridge the gap between online preparation and offline execution. It focuses on filtering the best ideas and incentivizing deep collaboration through real-time challenges, balanced matchmaking, and a high-stakes "Risk vs. Reward" engine with long-term legacy progression.

![Ideathon Portal](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🌐 Global Hub & Persistent Identity
- **Instant Login**: No marketing page - the dashboard IS the entry point
- **Unified Account**: Single evolving identity that matures over time
- **Event Discovery Page**: Central hub displaying upcoming events with locked/unlocked states

### 👤 Citizen Identity (User Profile)
- **Superpower Matrix**: Visual radar chart showing expertise (Design, Strategy, Storytelling, Prototyping, Research, Technical)
- **Legacy Vault**: Private inventory of earned Power-ups ready for deployment
- **Gratitude Feed**: Public/private collection of kudos from past teammates (Trust Score)
- **Trophy Case**: Rare badges for specific event behaviors
- **Personal Inclusion Profile**: Accessibility preferences that auto-configure team dashboards
- **Project History**: Links to Memory Wall entries showcasing portfolio

### 🎯 Emergent Theme System
- **Entry Gate**: Event-specific registration with "How Might We" question
- **The Cut**: 3 Community Projects + 1 Sponsor Project selection
- **Balanced Team Engine**: Reserves seats based on Superpowers
- **Milestone Contract**: Teams select 3 custom milestones
- **Legacy Deployment**: Equip earned Power-ups from vault

### 🎮 Gamified Sprint Engine (120-minute)
- **Consensus Engine**: 50%+ digital consensus for major team actions
- **Service Market**: Hire consultants from other teams using Consultancy Tokens
- **Asset-Driven Challenges**: Build pitch deck slide-by-slide with timed challenges
- **Boost Shop**: Deep Focus, AI Ghostwriter, Hall Shoutout
- **Roadblock System**: Random friction events (The Pivot, Silent Sprint, Resource Drain)

### 🏆 Grand Finale
- **Pitch Upload**: 3-slide deck auto-compiled from Asset Generators
- **Multi-Criteria Rating**: Jury and peer ratings on Originality & Execution
- **MVP Vote**: Nominate one teammate for ultimate honor
- **Loot Drop**: Reveal rare Legacy Power-ups for permanent vault

### 📜 Memory Wall
- **Project Time-Capsule**: Stores pitch, team roster, Collaboration Score
- **Pick Up the Baton**: Feature for sponsors to follow/fund project continuation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand (with persistence)
- **Charts**: Recharts

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & Tailwind config
│   ├── layout.tsx            # Root layout with fonts
│   └── page.tsx              # Main entry point
├── components/
│   ├── auth/
│   │   └── LoginModal.tsx    # Authentication modal
│   ├── events/
│   │   ├── EventDiscovery.tsx    # Event listing & discovery
│   │   └── EntryGateModal.tsx    # Event registration gate
│   ├── finale/
│   │   ├── RatingPanel.tsx       # Teammate rating system
│   │   └── LootDropReveal.tsx    # Power-up reveal animation
│   ├── layout/
│   │   └── Sidebar.tsx           # Main navigation sidebar
│   ├── memory/
│   │   └── MemoryWall.tsx        # Project history & time capsules
│   ├── profile/
│   │   ├── ProfilePage.tsx       # Full profile view
│   │   ├── SuperpowerMatrix.tsx  # Radar chart visualization
│   │   ├── LegacyVault.tsx       # Power-up inventory
│   │   ├── GratitudeFeed.tsx     # Kudos & messages
│   │   └── TrophyCase.tsx        # Badge collection
│   ├── sprint/
│   │   ├── SprintEngine.tsx      # Main sprint dashboard
│   │   ├── ConsensusVotePanel.tsx # Team voting system
│   │   ├── BoostShop.tsx         # Purchase boosts
│   │   ├── RoadblockAlert.tsx    # Friction events
│   │   ├── ChallengeCard.tsx     # Timed challenges
│   │   └── ServiceMarket.tsx     # Consultant hiring
│   ├── team/
│   │   └── TeamDashboard.tsx     # Team management
│   ├── Dashboard.tsx             # Main dashboard controller
│   ├── NotificationsPanel.tsx    # Notification center
│   └── SettingsPanel.tsx         # User settings
├── store/
│   └── index.ts              # Zustand store with all state
├── types/
│   └── index.ts              # TypeScript type definitions
└── lib/
    └── utils.ts              # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
cd ideathon-portal

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Demo Login
Click "Enter the Portal" and use any email/password to log in with the demo account.

## 🎯 Sprint Timeline (2-Hour Window)

| Time | Platform State | Activity |
|------|----------------|----------|
| 00:00 | Sprint Start | Timer activates; Consultancy Tokens issued |
| 00:20 | Milestone 1 Due | Consensus Vote to unlock points; Boost Shop opens |
| 00:30 | Challenge #1 | User Persona (Builds Slide 1) - 50 pts |
| 00:45 | Roadblock #1 | Event triggered via platform alert |
| 01:00 | Challenge #2 | Solution Sketch (Builds Slide 2) - 50 pts |
| 01:15 | Milestone 2 Due | Points awarded; Consensus Vote to buy AI Boost |
| 01:30 | Challenge #3 | Inclusion Audit (Builds Slide 3) - 50 pts |
| 01:50 | Lockdown | Submissions closed; Teammate Rating UI opens |
| 02:00 | Loot Drop | Final results published; Legacy Power-ups awarded |

## 🎁 Power-ups (Legacy Vault)

| Power-up | Rarity | Effect |
|----------|--------|--------|
| 🛡️ Roadblock Shield | Rare | Protect your team from one roadblock |
| ⚡ Double Spark | Epic | Start online phase with extra votes |
| 🎓 Master Consultant | Legendary | Earn double points when hired |
| ⏰ Time Warp | Epic | Extend challenge deadline |
| 💡 Insight Boost | Rare | Get AI-powered suggestions |
| 🔗 Team Sync | Rare | Bonus for unanimous consensus |

## 🏅 Badges (Trophy Case)

- **🌉 Bridge Builder**: High consultancy activity across teams
- **🏆 MVP**: Peer-voted Most Valuable Participant
- **⚡ Consensus Champion**: Perfect voting record
- **💡 Rapid Responder**: Quick challenge completion
- **❤️ Inclusion Advocate**: Outstanding accessibility focus
- **✨ Spark Igniter**: Top question votes in Entry Gate
- **📚 Mentor**: Helping multiple teams succeed
- **🚀 Innovator**: Most creative solution approach

## 📄 License

MIT License - feel free to use this project for your own ideathons!

---

Built with ❤️ for collaborative innovation
