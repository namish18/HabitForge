# HabitForge

**A gamified habit-building web app based on Atomic Habits' Four Laws**

Built with Next.js, TypeScript, Zustand, and CSS Modules. This is a frontend-only prototype with mock data and localStorage persistence.

---

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
# Create production build
npm run build

# Run production server
npm start
```

---

## Features & Four Laws Mapping

### 1. Make it Obvious (Cues/Visibility)

**Dashboard "Do Now" Queue**
- Top 3 uncompleted habits displayed prominently
- Large, obvious action buttons (Complete/Snooze)

**Habit Reminders**
- Time-based reminder configuration
- Custom reminder messages
- Snooze functionality

**Context Cues**
- Location-based triggers (Home/Gym/Library)
- Routine-based triggers ("After I [X], I will [Y]")
- Time-of-day cues

**Environment Design**
- Setup checklist per habit
- Visual cues and habit stacking

**For Breaking Bad Habits**
- "Make it invisible" toggle
- Hide temptation cards from dashboard

### 2. Make it Attractive (Motivation/Social)

**Gamification**
- XP and level system
- Progress bars with gradient effects
- Coins currency system

**Quests & Campaigns**
- Multi-step quest challenges
- Boss battle mode with health bars
- Legendary rewards (titles, cosmetics)

**Social Features**
- Team/guild system (mock)
- Leaderboard with seasonal rankings
- Top 3 medallions (gold/silver/bronze)
- Public commitment toggles

**Visual Design**
- Dark theme with orange accents
- Glassmorphism effects
- Smooth animations and hover states
- Gradient text and glowing effects

**For Breaking Bad Habits**
- Reflection gate before marking "gave in"
- What did it cost? journal prompt

### 3. Make it Easy (Low Friction)

**1-Tap Interactions**
- Single-click habit completion
- Quick add button in topbar
- Start/Complete task flows

**Templates & Defaults**
- Pre-seeded habit data
- Habit and task templates (mock)

**Habit Stacking**
- Link habits to existing routines
- "After [X], I will [Y]" builder (UI mock)

**2-Minute Versions**
- Each habit has a minimal version
- Example: "Take 3 deep breaths" instead of "10-minute meditation"

**For Breaking Bad Habits**
- Friction controls (cooldown timers)
- Extra confirmation steps

### 4. Make it Satisfying (Rewards/Feedback)

**XP & Progression**
- Earn XP for completing habits and tasks
- Level up system with increasing thresholds
- Visual XP progress bars

**Streaks**
- Streak counter on dashboard
- Streak badges on habit cards
- Visual fire icons

**Achievements**
- 12 total achievements (8 earned in demo)
- Rarity levels: common, rare, epic, legendary
- Locked/unlocked visual states

**Leaderboards**
- Seasonal competitions
- Friends/Team/Global tabs (Global shown)
- Rank display with top 3 medals

**Cosmetics & Rewards**
- Unlock avatars, badges, titles
- Shop-like inventory (Profile page)
- Quest completion rewards

**For Breaking Bad Habits**
- Accountability partner visibility (mock)
- Optional "loss" mechanic (deduct coins on miss)

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with product pitch and Four Laws showcase |
| `/dashboard` | Today view with stats, Do Now queue, and habit overview |
| `/habits` | Full habit list split into Build/Break categories |
| `/tasks` | Task management (To Do, In Progress, Completed) |
| `/quests` | Quest campaigns with boss battles and rewards |
| `/leaderboard` | Global rankings with seasonal competition |
| `/profile` | User stats, achievements grid, cosmetics inventory |
| `/settings` | Privacy controls, data management, reset demo |

**Note:** The following routes are defined in requirements but not yet implemented:
- `/onboarding` - Goal selection, templates, reminders setup
- `/focus` - Deep work timer with distraction blocking (mock)
- `/accountability` - Partner commitments and visibility
- `/analytics` - Completion charts, heatmaps, insights

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand with localStorage persistence
- **Styling:** CSS Modules (no Tailwind)
- **Icons:** react-icons (Feather Icons)
- **UI Components:** Custom-built with Radix UI primitives
- **Fonts:** Plus Jakarta Sans (headings), Inter (body)
- **Theme:** Dark mode with orange (#ff6b35) and white
- **Date Utilities:** date-fns

---

## Project Structure

```
src/
├── app/
│   ├── dashboard/          # Dashboard page
│   ├── habits/             # Habits list page
│   ├── tasks/              # Tasks page
│   ├── quests/             # Quests page
│   ├── leaderboard/        # Leaderboard page
│   ├── profile/            # Profile page
│   ├── settings/           # Settings page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles & CSS variables
├── components/
│   ├── layout/
│   │   └── AppShell.tsx    # Sidebar + topbar layout
│   ├── ui/
│   │   ├── Button.tsx      # Button component
│   │   ├── Card.tsx        # Card component
│   │   ├── Badge.tsx       # Badge component
│   │   └── Input.tsx       # Input/Textarea components
│   ├── HabitCard.tsx       # Habit display card
│   ├── TaskCard.tsx        # Task display card
│   ├── QuestCard.tsx       # Quest display card
│   └── StatCard.tsx        # Stat display card
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── mockData.ts         # Seed data
└── store/
    └── useAppStore.ts      # Zustand store
```

---

## Data Model

All types are defined in `src/lib/types.ts`:

- **User** - Profile, level, XP, coins, streak, titles, cosmetics
- **Habit** - Build/break type, schedule, reminders, cues, rewards, streak
- **Task** - Title, project, due date, priority, status
- **Quest** - Steps, progress, boss mode, rewards
- **Achievement** - Title, criteria, rarity, earned date
- **Team** - Members, challenges, level
- **LeaderboardEntry** - User, XP, rank, streak
- **Season** - Name, dates, theme
- **FocusSession** - Duration, mode, blocked items
- **JournalEntry** - Prompts, linked habits, mood

---

## How to Reset Demo Data

1. Go to `/settings`
2. Scroll to "Data Management"
3. Click "Reset Demo Data"
4. Confirm the prompt

This reloads the initial mock data from `src/lib/mockData.ts`.

---

## State Management

The app uses **Zustand** with localStorage persistence. All state and actions are in `src/store/useAppStore.ts`.

### Key Actions

- `completeHabit(id)` - Mark habit complete, award XP/coins
- `snoozeHabit(id, minutes)` - Snooze reminder
- `addHabit(habit)` / `updateHabit(id, updates)` / `deleteHabit(id)`
- `completeTask(id)` - Mark task done, award XP
- `updateQuestProgress(questId, stepId)` - Toggle quest step
- `completeQuest(id)` - Claim quest rewards
- `grantXp(amount)` - Add XP and handle level-ups
- `earnCoins(amount)` / `spendCoins(amount)`
- `togglePrivacySetting(key)` - Privacy controls
- `resetData()` - Reset to initial mock data

---

## Design System

### Colors

- **Primary:** #ff6b35 (orange gradient)
- **Background:** #0a0a0b → #111113 → #1a1a1d
- **Text:** #ffffff → #a8a8aa → #6b6b6d
- **Success:** #10b981
- **Warning:** #f59e0b
- **Error:** #ef4444
- **Info:** #3b82f6

### Effects

- **Glassmorphism** - Frosted glass backgrounds with blur
- **Gradients** - Linear gradients on primary elements
- **Glow** - Box shadows with primary color
- **Hover States** - Transform + shadow on interactive elements

### Typography

- **Headings:** Plus Jakarta Sans (700-800 weight)
- **Body:** Inter (400-600 weight)

---

## Browser Support

- Modern browsers with ES2017+ support
- Chrome, Firefox, Safari, Edge (latest versions)

---

## Known Limitations

This is a **UI prototype**, not a production app:

- No real backend or API
- No authentication
- No actual calendar sync, webhooks, or integrations
- Some features are visual mocks (e.g., distraction blocker)
- localStorage only (data loss on clear)

---

## Future Enhancements

To make this production-ready:

1. **Backend API** - Node.js/Express or serverless functions
2. **Database** - PostgreSQL or MongoDB for persistence
3. **Authentication** - NextAuth.js or similar
4. **Real Notifications** - Push API, email service
5. **Calendar Integration** - Google Calendar API
6. **Analytics** - Charts library (Recharts, Chart.js)
7. **Mobile App** - React Native version
8. **AI Suggestions** - Habit recommendations based on patterns

---

## License

MIT

---

## Credits

Built by following Atomic Habits principles by James Clear.
Design inspired by modern gaming UIs and productivity apps.
