import {
    User,
    Habit,
    Task,
    Quest,
    Achievement,
    Team,
    LeaderboardEntry,
    Season,
    Cosmetic,
    FocusSession,
    JournalEntry,
} from '../lib/types';

// Mock User Data
export const mockUser: User = {
    id: 'user-1',
    name: 'Alex Chen',
    avatar: '🐉',
    level: 12,
    xp: 2450,
    xpToNext: 3000,
    coins: 850,
    streakDays: 7,
    titles: ['Habit Warrior', 'Morning Person'],
    cosmeticsUnlocked: ['avatar-dragon', 'badge-streak-7'],
    privacySettings: {
        showOnLeaderboard: true,
        allowTeamInvites: true,
        shareCompletionStats: true,
    },
};

// Mock Habits Data
export const mockHabits: Habit[] = [
    {
        id: 'habit-1',
        title: 'Morning Meditation',
        description: 'Start the day with 10 minutes of mindfulness',
        type: 'build',
        schedule: {
            frequency: 'daily',
            timesPerDay: 1,
        },
        reminderConfig: {
            enabled: true,
            times: ['07:00'],
            message: 'Time for your morning meditation 🧘',
            snoozeMinutes: 10,
        },
        contextCues: [
            {
                type: 'routine',
                value: 'After waking up',
                description: 'Right after brushing teeth',
            },
            {
                type: 'location',
                value: 'Bedroom corner',
                description: 'On meditation cushion',
            },
        ],
        difficulty: 2,
        twoMinuteVersion: 'Just sit and breathe for 2 minutes',
        environmentSetupChecklist: [
            {
                id: 'env-1',
                description: 'Place meditation cushion in corner',
                completed: true,
            },
            {
                id: 'env-2',
                description: 'Keep phone in another room',
                completed: false,
            },
        ],
        rewardConfig: {
            xpPerCompletion: 25,
            coinsPerCompletion: 5,
            bonusMultiplier: 1.5,
        },
        streak: 7,
        lastCompletedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        tags: ['mindfulness', 'morning'],
        completedDates: [
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ],
    },
    {
        id: 'habit-2',
        title: 'Read for 30 Minutes',
        description: 'Read books to expand knowledge',
        type: 'build',
        schedule: {
            frequency: 'daily',
            timesPerDay: 1,
        },
        reminderConfig: {
            enabled: true,
            times: ['21:00'],
            message: 'Time for your reading session 📚',
            snoozeMinutes: 15,
        },
        contextCues: [
            {
                type: 'time',
                value: 'Before bed',
                description: 'Part of evening wind-down routine',
            },
        ],
        difficulty: 3,
        twoMinuteVersion: 'Read just one page',
        temptationBundling: {
            activity: 'Only listen to favorite podcast while reading',
            icon: '🎧',
        },
        environmentSetupChecklist: [
            {
                id: 'env-3',
                description: 'Keep book on nightstand',
                completed: true,
            },
        ],
        rewardConfig: {
            xpPerCompletion: 35,
            coinsPerCompletion: 8,
        },
        streak: 5,
        lastCompletedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        tags: ['learning', 'evening'],
        completedDates: [
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ],
    },
    {
        id: 'habit-3',
        title: 'Avoid Social Media Scrolling',
        description: 'Reduce mindless scrolling during work hours',
        type: 'break',
        schedule: {
            frequency: 'daily',
        },
        reminderConfig: {
            enabled: true,
            times: ['09:00', '14:00'],
            message: 'Stay focused! Avoid social media 🎯',
            snoozeMinutes: 30,
        },
        contextCues: [
            {
                type: 'routine',
                value: 'During work hours',
                description: 'Between 9 AM and 6 PM',
            },
        ],
        difficulty: 4,
        makeInvisible: true,
        frictionControls: {
            cooldownMinutes: 60,
            requireConfirmation: true,
        },
        environmentSetupChecklist: [
            {
                id: 'env-4',
                description: 'Delete social media apps from phone',
                completed: false,
            },
            {
                id: 'env-5',
                description: 'Use website blockers during work',
                completed: true,
            },
        ],
        rewardConfig: {
            xpPerCompletion: 50,
            coinsPerCompletion: 10,
        },
        streak: 3,
        tags: ['productivity', 'focus'],
        completedDates: [],
    },
    {
        id: 'habit-4',
        title: 'Workout',
        description: 'Exercise for at least 30 minutes',
        type: 'build',
        schedule: {
            frequency: 'weekly',
            daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
        },
        reminderConfig: {
            enabled: true,
            times: ['18:00'],
            message: 'Time to get moving! 💪',
            snoozeMinutes: 20,
        },
        contextCues: [
            {
                type: 'routine',
                value: 'After work',
                description: 'Right when you get home',
            },
        ],
        difficulty: 4,
        twoMinuteVersion: 'Do 10 jumping jacks',
        habitStacking: {
            description: 'After changing into workout clothes, immediately start warmup',
        },
        environmentSetupChecklist: [
            {
                id: 'env-6',
                description: 'Lay out workout clothes in the morning',
                completed: true,
            },
        ],
        rewardConfig: {
            xpPerCompletion: 45,
            coinsPerCompletion: 12,
            bonusMultiplier: 2,
        },
        streak: 2,
        tags: ['fitness', 'health'],
        completedDates: [
            new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ],
    },
];

// Mock Tasks Data
export const mockTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Complete project proposal',
        description: 'Finish the Q1 project proposal document',
        project: 'Work',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        estMinutes: 120,
        priority: 'high',
        status: 'in-progress',
        tags: ['work', 'urgent'],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-2',
        title: 'Call dentist for appointment',
        description: 'Schedule annual checkup',
        priority: 'medium',
        status: 'todo',
        tags: ['health', 'personal'],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-3',
        title: 'Review pull requests',
        description: 'Review team PRs on GitHub',
        project: 'Work',
        recurring: {
            frequency: 'daily',
            interval: 1,
        },
        estMinutes: 30,
        priority: 'medium',
        status: 'todo',
        tags: ['work', 'code-review'],
        createdAt: new Date().toISOString(),
    },
    {
        id: 'task-4',
        title: 'Organize digital files',
        description: 'Clean up downloads folder and organize documents',
        estMinutes: 45,
        priority: 'low',
        status: 'todo',
        tags: ['organization', 'personal'],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
];

// Mock Quests Data
export const mockQuests: Quest[] = [
    {
        id: 'quest-1',
        title: 'Morning Mastery',
        description: 'Build a powerful morning routine that sets you up for success',
        durationDays: 21,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        steps: [
            {
                id: 'step-1',
                title: 'Wake up at the same time for 7 days',
                description: 'Consistency is key to building a morning routine',
                completed: true,
            },
            {
                id: 'step-2',
                title: 'Complete morning meditation 10 times',
                description: 'Start your day with mindfulness',
                completed: false,
                relatedHabitIds: ['habit-1'],
            },
            {
                id: 'step-3',
                title: 'Journal for 5 consecutive mornings',
                description: 'Reflect on your goals and intentions',
                completed: false,
            },
        ],
        rewards: {
            xp: 500,
            coins: 100,
            unlocksCosmetic: 'badge-morning-master',
            unlocksTitle: 'Morning Master',
        },
        progress: 33,
        bossMode: {
            enabled: true,
            name: 'The Snooze Dragon',
            health: 700,
            maxHealth: 1000,
        },
        status: 'active',
    },
    {
        id: 'quest-2',
        title: 'Focus Fortress',
        description: 'Master deep work and eliminate distractions',
        durationDays: 30,
        steps: [
            {
                id: 'step-4',
                title: 'Complete 10 Pomodoro sessions',
                description: 'Use focused time blocks to boost productivity',
                completed: false,
            },
            {
                id: 'step-5',
                title: 'Avoid social media for 7 consecutive days',
                description: 'Break the scrolling habit',
                completed: false,
                relatedHabitIds: ['habit-3'],
            },
            {
                id: 'step-6',
                title: 'Read 3 books on productivity',
                description: 'Learn from the masters',
                completed: false,
                relatedHabitIds: ['habit-2'],
            },
        ],
        rewards: {
            xp: 750,
            coins: 150,
            unlocksCosmetic: 'badge-focus-master',
        },
        progress: 0,
        status: 'locked',
    },
    {
        id: 'quest-3',
        title: 'Fitness Champion',
        description: 'Transform your health through consistent exercise',
        durationDays: 60,
        steps: [
            {
                id: 'step-7',
                title: 'Complete 20 workout sessions',
                description: 'Build strength and endurance',
                completed: false,
                relatedHabitIds: ['habit-4'],
            },
            {
                id: 'step-8',
                title: 'Try 3 different types of exercise',
                description: 'Explore variety in your fitness routine',
                completed: false,
            },
        ],
        rewards: {
            xp: 1000,
            coins: 200,
            unlocksCosmetic: 'avatar-fitness-champion',
        },
        progress: 0,
        status: 'locked',
    },
];

// Mock Achievements Data
export const mockAchievements: Achievement[] = [
    {
        id: 'achievement-1',
        title: 'First Steps',
        description: 'Complete your first habit',
        criteria: 'Complete any habit once',
        icon: '🎯',
        earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'common',
    },
    {
        id: 'achievement-2',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        criteria: 'Complete habits for 7 consecutive days',
        icon: '🔥',
        earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'rare',
    },
    {
        id: 'achievement-3',
        title: 'Task Master',
        description: 'Complete 50 tasks',
        criteria: 'Complete a total of 50 tasks',
        icon: '✅',
        rarity: 'rare',
    },
    {
        id: 'achievement-4',
        title: 'Quest Conqueror',
        description: 'Complete your first quest',
        criteria: 'Finish any quest',
        icon: '⚔️',
        rarity: 'epic',
    },
    {
        id: 'achievement-5',
        title: 'Level 10 Legend',
        description: 'Reach level 10',
        criteria: 'Achieve user level 10',
        icon: '👑',
        earnedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        rarity: 'epic',
    },
    {
        id: 'achievement-6',
        title: 'Centurion',
        description: 'Complete 100 habits',
        criteria: 'Complete any habits 100 times total',
        icon: '💯',
        rarity: 'legendary',
    },
];

// Mock Team Data
export const mockTeam: Team = {
    id: 'team-1',
    name: 'Productivity Ninjas',
    description: 'A team dedicated to crushing goals together',
    avatar: '🥷',
    members: [
        {
            userId: 'user-1',
            role: 'admin',
            joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 'user-2',
            role: 'member',
            joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 'user-3',
            role: 'member',
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ],
    challenges: [
        {
            id: 'challenge-1',
            title: 'Team Meditation Marathon',
            description: 'Complete 500 collective meditation sessions',
            goal: 500,
            currentProgress: 342,
            endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ],
    totalXp: 15420,
    level: 8,
};

// Mock Leaderboard Data
export const mockLeaderboard: LeaderboardEntry[] = [
    {
        userId: 'user-5',
        userName: 'Sarah Johnson',
        userAvatar: '🌟',
        seasonId: 'season-1',
        xp: 5230,
        rank: 1,
        streakDays: 45,
    },
    {
        userId: 'user-3',
        userName: 'Mike Chen',
        userAvatar: '⚡',
        seasonId: 'season-1',
        xp: 4890,
        rank: 2,
        streakDays: 38,
    },
    {
        userId: 'user-1',
        userName: 'Alex Chen',
        userAvatar: '🐉',
        seasonId: 'season-1',
        xp: 2450,
        rank: 3,
        streakDays: 7,
    },
    {
        userId: 'user-2',
        userName: 'Emma Wilson',
        userAvatar: '🎨',
        seasonId: 'season-1',
        xp: 2100,
        rank: 4,
        streakDays: 12,
    },
    {
        userId: 'user-4',
        userName: 'David Park',
        userAvatar: '🚀',
        seasonId: 'season-1',
        xp: 1950,
        rank: 5,
        streakDays: 9,
    },
];

// Mock Season Data
export const mockSeason: Season = {
    id: 'season-1',
    name: 'Winter of Resilience',
    startAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    theme: 'Building unshakeable habits in challenging times',
};

// Mock Cosmetics Data
export const mockCosmetics: Cosmetic[] = [
    {
        id: 'avatar-dragon',
        name: 'Dragon Avatar',
        type: 'avatar',
        rarity: 'rare',
        unlockRequirement: 'Reach level 10',
        owned: true,
    },
    {
        id: 'badge-streak-7',
        name: '7-Day Streak Badge',
        type: 'badge',
        rarity: 'common',
        unlockRequirement: 'Maintain a 7-day streak',
        owned: true,
    },
    {
        id: 'badge-morning-master',
        name: 'Morning Master Badge',
        type: 'badge',
        rarity: 'epic',
        unlockRequirement: 'Complete Morning Mastery quest',
        owned: false,
    },
    {
        id: 'badge-focus-master',
        name: 'Focus Master Badge',
        type: 'badge',
        rarity: 'epic',
        unlockRequirement: 'Complete Focus Fortress quest',
        owned: false,
    },
    {
        id: 'avatar-fitness-champion',
        name: 'Fitness Champion Avatar',
        type: 'avatar',
        rarity: 'legendary',
        unlockRequirement: 'Complete Fitness Champion quest',
        owned: false,
    },
    {
        id: 'theme-dark-mode',
        name: 'Dark Mode Theme',
        type: 'theme',
        rarity: 'common',
        unlockRequirement: 'Default unlock',
        owned: true,
    },
];

// Mock Focus Sessions Data
export const mockFocusSessions: FocusSession[] = [
    {
        id: 'focus-1',
        startAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        durationMin: 25,
        mode: 'pomodoro',
        blockedItems: ['social-media', 'email'],
        notes: 'Worked on project proposal',
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000).toISOString(),
        actualDurationMin: 25,
    },
    {
        id: 'focus-2',
        startAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        durationMin: 90,
        mode: 'deep-work',
        blockedItems: ['all-notifications'],
        notes: 'Deep work session on code refactoring',
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
        actualDurationMin: 85,
    },
];

// Mock Journal Entries Data
export const mockJournalEntries: JournalEntry[] = [
    {
        id: 'journal-1',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        promptType: 'reflection',
        text: 'Today I realized that starting my morning with meditation really sets a positive tone for the entire day. I felt more focused and less reactive to stress.',
        linkedHabitId: 'habit-1',
        mood: 4,
        tags: ['mindfulness', 'growth'],
    },
    {
        id: 'journal-2',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        promptType: 'gratitude',
        text: 'Grateful for having the discipline to stick with my workout routine this week, even when I didn\'t feel like it.',
        linkedHabitId: 'habit-4',
        mood: 5,
        tags: ['gratitude', 'fitness'],
    },
    {
        id: 'journal-3',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        promptType: 'slip-trigger',
        text: 'I noticed that I tend to reach for my phone and scroll social media when I feel anxious or bored. Need to replace this with a healthier coping mechanism.',
        linkedHabitId: 'habit-3',
        mood: 3,
        tags: ['awareness', 'behavior-change'],
    },
];
