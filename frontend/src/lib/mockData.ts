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
} from './types';

// Current User
export const mockUser: User = {
    id: 'user-1',
    name: 'Alex Rivera',
    avatar: 'AR',
    level: 12,
    xp: 2840,
    xpToNext: 3500,
    coins: 1250,
    streakDays: 23,
    titles: ['Habit Master', 'Early Adopter', 'Streak Legend'],
    cosmeticsUnlocked: ['avatar-fire', 'badge-champion', 'theme-midnight'],
    privacySettings: {
        showOnLeaderboard: true,
        allowTeamInvites: true,
        shareCompletionStats: true,
    },
};

// Mock Habits
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
            message: 'Time to center yourself',
            snoozeMinutes: 10,
        },
        contextCues: [
            {
                type: 'routine',
                value: 'wake-up',
                description: 'After waking up and brushing teeth',
            },
            {
                type: 'location',
                value: 'Home',
                description: 'Meditation corner',
            },
        ],
        difficulty: 2,
        twoMinuteVersion: 'Take 3 deep breaths',
        habitStacking: {
            description: 'After I brush my teeth, I will meditate for 10 minutes',
        },
        environmentSetupChecklist: [
            { id: 'env-1-1', description: 'Set up meditation cushion', completed: true },
            { id: 'env-1-2', description: 'Download meditation app', completed: true },
            { id: 'env-1-3', description: 'Set phone to Do Not Disturb', completed: false },
        ],
        rewardConfig: {
            xpPerCompletion: 50,
            coinsPerCompletion: 10,
        },
        streak: 23,
        lastCompletedAt: new Date().toISOString(),
        tags: ['wellness', 'mindfulness'],
        temptationBundling: {
            activity: 'Listen to calming music',
            icon: 'music',
        },
        completedDates: generateCompletedDates(23),
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
            times: ['20:00'],
            message: 'Reading time before bed',
            snoozeMinutes: 15,
        },
        contextCues: [
            {
                type: 'time',
                value: '20:00',
                description: 'Evening wind-down',
            },
        ],
        difficulty: 3,
        twoMinuteVersion: 'Read one page',
        environmentSetupChecklist: [
            { id: 'env-2-1', description: 'Keep book on nightstand', completed: true },
            { id: 'env-2-2', description: 'Good reading light', completed: true },
        ],
        rewardConfig: {
            xpPerCompletion: 75,
            coinsPerCompletion: 15,
        },
        streak: 18,
        lastCompletedAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ['learning', 'self-improvement'],
        completedDates: generateCompletedDates(18),
    },
    {
        id: 'habit-3',
        title: 'Exercise',
        description: '30 minutes of physical activity',
        type: 'build',
        schedule: {
            frequency: 'weekly',
            daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
        },
        reminderConfig: {
            enabled: true,
            times: ['06:30'],
            message: 'Time to get moving',
            snoozeMinutes: 10,
        },
        contextCues: [
            {
                type: 'location',
                value: 'Gym',
                description: 'Morning workout',
            },
        ],
        difficulty: 4,
        twoMinuteVersion: 'Do 10 jumping jacks',
        environmentSetupChecklist: [
            { id: 'env-3-1', description: 'Pack gym bag night before', completed: true },
            { id: 'env-3-2', description: 'Lay out workout clothes', completed: true },
        ],
        rewardConfig: {
            xpPerCompletion: 100,
            coinsPerCompletion: 20,
        },
        streak: 12,
        lastCompletedAt: new Date(Date.now() - 172800000).toISOString(),
        tags: ['fitness', 'health'],
        temptationBundling: {
            activity: 'Listen to favorite podcast',
            icon: 'headphones',
        },
        completedDates: generateCompletedDates(12, 3),
    },
    {
        id: 'habit-4',
        title: 'Limit Social Media',
        description: 'No social media after 9 PM',
        type: 'break',
        schedule: {
            frequency: 'daily',
        },
        reminderConfig: {
            enabled: true,
            times: ['21:00'],
            message: 'Time to disconnect',
            snoozeMinutes: 0,
        },
        contextCues: [
            {
                type: 'time',
                value: '21:00',
                description: 'Evening boundary',
            },
        ],
        difficulty: 4,
        twoMinuteVersion: 'Put phone in another room',
        environmentSetupChecklist: [
            { id: 'env-4-1', description: 'Enable app time limits', completed: true },
            { id: 'env-4-2', description: 'Create phone-free zone', completed: false },
        ],
        rewardConfig: {
            xpPerCompletion: 80,
            coinsPerCompletion: 16,
        },
        streak: 8,
        lastCompletedAt: new Date().toISOString(),
        tags: ['digital-wellness', 'productivity'],
        makeInvisible: false,
        frictionControls: {
            cooldownMinutes: 30,
            requireConfirmation: true,
        },
        completedDates: generateCompletedDates(8),
    },
    {
        id: 'habit-5',
        title: 'Practice Guitar',
        description: 'Practice guitar for 20 minutes',
        type: 'build',
        schedule: {
            frequency: 'daily',
        },
        reminderConfig: {
            enabled: true,
            times: ['18:00'],
            message: 'Time to jam',
            snoozeMinutes: 15,
        },
        contextCues: [
            {
                type: 'routine',
                value: 'after-work',
                description: 'After finishing work',
            },
        ],
        difficulty: 3,
        twoMinuteVersion: 'Play one chord progression',
        habitStacking: {
            description: 'After I finish work, I will practice guitar',
        },
        environmentSetupChecklist: [
            { id: 'env-5-1', description: 'Keep guitar on stand (visible)', completed: true },
            { id: 'env-5-2', description: 'Music sheets ready', completed: true },
        ],
        rewardConfig: {
            xpPerCompletion: 70,
            coinsPerCompletion: 14,
        },
        streak: 15,
        lastCompletedAt: new Date().toISOString(),
        tags: ['creativity', 'skills'],
        completedDates: generateCompletedDates(15),
    },
    {
        id: 'habit-6',
        title: 'Drink Water',
        description: 'Drink 8 glasses of water daily',
        type: 'build',
        schedule: {
            frequency: 'daily',
            timesPerDay: 8,
        },
        reminderConfig: {
            enabled: true,
            times: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
            message: 'Stay hydrated',
            snoozeMinutes: 30,
        },
        contextCues: [
            {
                type: 'location',
                value: 'Desk',
                description: 'Keep water bottle visible',
            },
        ],
        difficulty: 1,
        twoMinuteVersion: 'Drink one glass',
        environmentSetupChecklist: [
            { id: 'env-6-1', description: 'Fill large water bottle', completed: true },
            { id: 'env-6-2', description: 'Place at desk', completed: true },
        ],
        rewardConfig: {
            xpPerCompletion: 30,
            coinsPerCompletion: 6,
        },
        streak: 30,
        lastCompletedAt: new Date().toISOString(),
        tags: ['health', 'wellness'],
        completedDates: generateCompletedDates(30),
    },
    {
        id: 'habit-7',
        title: 'Journal',
        description: 'Write 3 gratitudes and reflections',
        type: 'build',
        schedule: {
            frequency: 'daily',
        },
        reminderConfig: {
            enabled: true,
            times: ['22:00'],
            message: 'Reflect on your day',
            snoozeMinutes: 10,
        },
        contextCues: [
            {
                type: 'routine',
                value: 'before-bed',
                description: 'Before going to sleep',
            },
        ],
        difficulty: 2,
        twoMinuteVersion: 'Write one thing you are grateful for',
        environmentSetupChecklist: [
            { id: 'env-7-1', description: 'Journal on nightstand', completed: true },
            { id: 'env-7-2', description: 'Pen ready', completed: true },
        ],
        rewardConfig: {
            xpPerCompletion: 60,
            coinsPerCompletion: 12,
        },
        streak: 21,
        lastCompletedAt: new Date().toISOString(),
        tags: ['mindfulness', 'gratitude'],
        completedDates: generateCompletedDates(21),
    },
    {
        id: 'habit-8',
        title: 'Avoid Junk Food',
        description: 'Say no to processed snacks',
        type: 'break',
        schedule: {
            frequency: 'daily',
        },
        reminderConfig: {
            enabled: false,
            times: [],
            snoozeMinutes: 0,
        },
        contextCues: [
            {
                type: 'location',
                value: 'Kitchen',
                description: 'Remove temptations',
            },
        ],
        difficulty: 5,
        twoMinuteVersion: 'Replace with one piece of fruit',
        environmentSetupChecklist: [
            { id: 'env-8-1', description: 'Remove junk food from house', completed: false },
            { id: 'env-8-2', description: 'Stock healthy snacks', completed: true },
            { id: 'env-8-3', description: 'Prepare fruit bowl', completed: true },
        ],
        rewardConfig: {
            xpPerCompletion: 90,
            coinsPerCompletion: 18,
        },
        streak: 5,
        lastCompletedAt: new Date().toISOString(),
        tags: ['health', 'nutrition'],
        makeInvisible: false,
        frictionControls: {
            cooldownMinutes: 60,
            requireConfirmation: true,
        },
        completedDates: generateCompletedDates(5),
    },
];

// Mock Tasks
export const mockTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Review project proposal',
        description: 'Go through the Q1 project proposal and provide feedback',
        project: 'Work',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        estMinutes: 45,
        priority: 'high',
        status: 'todo',
        tags: ['work', 'review'],
        createdAt: new Date().toISOString(),
    },
    {
        id: 'task-2',
        title: 'Buy groceries',
        project: 'Personal',
        estMinutes: 60,
        priority: 'medium',
        status: 'todo',
        tags: ['errands'],
        createdAt: new Date().toISOString(),
    },
    {
        id: 'task-3',
        title: 'Call dentist for appointment',
        project: 'Personal',
        priority: 'medium',
        status: 'todo',
        tags: ['health'],
        createdAt: new Date().toISOString(),
    },
    {
        id: 'task-4',
        title: 'Finish homepage redesign',
        description: 'Complete the new landing page mockups',
        project: 'Work',
        dueDate: new Date(Date.now() + 259200000).toISOString(),
        estMinutes: 180,
        priority: 'high',
        status: 'in-progress',
        tags: ['design', 'work'],
        createdAt: new Date(Date.now() - 432000000).toISOString(),
    },
    {
        id: 'task-5',
        title: 'Water plants',
        recurring: {
            frequency: 'weekly',
            interval: 1,
        },
        estMinutes: 15,
        priority: 'low',
        status: 'todo',
        tags: ['home'],
        createdAt: new Date().toISOString(),
    },
    {
        id: 'task-6',
        title: 'Prepare presentation slides',
        description: 'Create slides for team meeting',
        project: 'Work',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        estMinutes: 90,
        priority: 'high',
        status: 'todo',
        tags: ['work', 'presentation'],
        createdAt: new Date().toISOString(),
    },
];

// Mock Quests
export const mockQuests: Quest[] = [
    {
        id: 'quest-1',
        title: '30-Day Meditation Master',
        description: 'Complete 30 consecutive days of meditation',
        durationDays: 30,
        startDate: new Date(Date.now() - 1987200000).toISOString(),
        steps: [
            { id: 'q1-s1', title: 'Meditate for 7 days', description: 'Build the foundation', completed: true, relatedHabitIds: ['habit-1'] },
            { id: 'q1-s2', title: 'Meditate for 14 days', description: 'Keep the momentum', completed: true, relatedHabitIds: ['habit-1'] },
            { id: 'q1-s3', title: 'Meditate for 21 days', description: 'Form the habit', completed: true, relatedHabitIds: ['habit-1'] },
            { id: 'q1-s4', title: 'Meditate for 30 days', description: 'Become a master', completed: false, relatedHabitIds: ['habit-1'] },
        ],
        rewards: {
            xp: 500,
            coins: 200,
            unlocksTitle: 'Zen Master',
        },
        progress: 76,
        status: 'active',
    },
    {
        id: 'quest-2',
        title: 'Fitness Warrior Challenge',
        description: 'Complete 20 workout sessions',
        durationDays: 45,
        startDate: new Date(Date.now() - 1036800000).toISOString(),
        steps: [
            { id: 'q2-s1', title: '5 workouts', description: 'Start strong', completed: true, relatedHabitIds: ['habit-3'] },
            { id: 'q2-s2', title: '10 workouts', description: 'Build endurance', completed: true, relatedHabitIds: ['habit-3'] },
            { id: 'q2-s3', title: '15 workouts', description: 'Push through', completed: false, relatedHabitIds: ['habit-3'] },
            { id: 'q2-s4', title: '20 workouts', description: 'Become a warrior', completed: false, relatedHabitIds: ['habit-3'] },
        ],
        rewards: {
            xp: 800,
            coins: 300,
            unlocksCosmetic: 'avatar-warrior',
        },
        progress: 60,
        bossMode: {
            enabled: true,
            name: 'The Iron Giant',
            health: 6000,
            maxHealth: 10000,
        },
        status: 'active',
    },
    {
        id: 'quest-3',
        title: 'Digital Detox Master',
        description: 'Limit social media for 14 days',
        durationDays: 14,
        steps: [
            { id: 'q3-s1', title: '3 days detox', description: 'Start the journey', completed: true, relatedHabitIds: ['habit-4'] },
            { id: 'q3-s2', title: '7 days detox', description: 'Halfway there', completed: false, relatedHabitIds: ['habit-4'] },
            { id: 'q3-s3', title: '14 days detox', description: 'Master your time', completed: false, relatedHabitIds: ['habit-4'] },
        ],
        rewards: {
            xp: 400,
            coins: 150,
            unlocksTitle: 'Digital Nomad',
        },
        progress: 57,
        status: 'active',
    },
    {
        id: 'quest-4',
        title: 'Book Worm Adventure',
        description: 'Read for 30 minutes daily for a month',
        durationDays: 30,
        steps: [
            { id: 'q4-s1', title: 'Read 1 book', description: 'Pick a good one', completed: false },
            { id: 'q4-s2', title: 'Read 2 books', description: 'Keep going', completed: false },
            { id: 'q4-s3', title: 'Read 3 books', description: 'You are a reader', completed: false },
        ],
        rewards: {
            xp: 600,
            coins: 250,
            unlocksCosmetic: 'badge-bookworm',
        },
        progress: 12,
        status: 'locked',
    },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
    {
        id: 'ach-1',
        title: 'First Steps',
        description: 'Complete your first habit',
        criteria: 'Complete 1 habit',
        icon: 'footprints',
        earnedAt: new Date(Date.now() - 2000000000).toISOString(),
        rarity: 'common',
    },
    {
        id: 'ach-2',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        criteria: 'Achieve 7-day streak',
        icon: 'calendar-check',
        earnedAt: new Date(Date.now() - 1400000000).toISOString(),
        rarity: 'common',
    },
    {
        id: 'ach-3',
        title: 'Habit Stacker',
        description: 'Create your first habit stack',
        criteria: 'Stack 2 habits',
        icon: 'layers',
        earnedAt: new Date(Date.now() - 1800000000).toISOString(),
        rarity: 'rare',
    },
    {
        id: 'ach-4',
        title: 'Streak Legend',
        description: 'Maintain a 21-day streak',
        criteria: 'Achieve 21-day streak',
        icon: 'fire',
        earnedAt: new Date(Date.now() - 100000000).toISOString(),
        rarity: 'epic',
    },
    {
        id: 'ach-5',
        title: 'Quest Conqueror',
        description: 'Complete your first quest',
        criteria: 'Complete 1 quest',
        icon: 'trophy',
        rarity: 'rare',
    },
    {
        id: 'ach-6',
        title: 'Social Butterfly',
        description: 'Join a team',
        criteria: 'Join 1 team',
        icon: 'users',
        earnedAt: new Date(Date.now() - 500000000).toISOString(),
        rarity: 'common',
    },
    {
        id: 'ach-7',
        title: 'Focus Master',
        description: 'Complete 10 focus sessions',
        criteria: 'Complete 10 focus sessions',
        icon: 'target',
        rarity: 'epic',
    },
    {
        id: 'ach-8',
        title: 'Level 10',
        description: 'Reach level 10',
        criteria: 'Reach level 10',
        icon: 'star',
        earnedAt: new Date(Date.now() - 200000000).toISOString(),
        rarity: 'rare',
    },
    {
        id: 'ach-9',
        title: 'Consistency King',
        description: 'Complete all habits for 30 days',
        criteria: 'Perfect month',
        icon: 'crown',
        rarity: 'legendary',
    },
    {
        id: 'ach-10',
        title: 'Early Bird',
        description: 'Complete 5 morning habits',
        criteria: 'Morning routine',
        icon: 'sunrise',
        earnedAt: new Date(Date.now() - 1000000000).toISOString(),
        rarity: 'common',
    },
];

// Mock Team
export const mockTeam: Team = {
    id: 'team-1',
    name: 'The Habit Heroes',
    description: 'Building better habits together',
    avatar: 'HH',
    members: [
        { userId: 'user-1', role: 'admin', joinedAt: new Date(Date.now() - 5000000000).toISOString() },
        { userId: 'user-2', role: 'member', joinedAt: new Date(Date.now() - 4000000000).toISOString() },
        { userId: 'user-3', role: 'member', joinedAt: new Date(Date.now() - 3000000000).toISOString() },
    ],
    challenges: [
        {
            id: 'challenge-1',
            title: 'Team Meditation Marathon',
            description: 'Complete 100 team meditation sessions',
            goal: 100,
            currentProgress: 67,
            endsAt: new Date(Date.now() + 604800000).toISOString(),
        },
    ],
    totalXp: 8450,
    level: 5,
};

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
    {
        userId: 'user-5',
        userName: 'Jordan Chen',
        userAvatar: 'JC',
        seasonId: 'season-1',
        xp: 4200,
        rank: 1,
        streakDays: 45,
    },
    {
        userId: 'user-1',
        userName: 'Alex Rivera',
        userAvatar: 'AR',
        seasonId: 'season-1',
        xp: 2840,
        rank: 2,
        streakDays: 23,
    },
    {
        userId: 'user-6',
        userName: 'Sam Taylor',
        userAvatar: 'ST',
        seasonId: 'season-1',
        xp: 2650,
        rank: 3,
        streakDays: 31,
    },
    {
        userId: 'user-7',
        userName: 'Morgan Lee',
        userAvatar: 'ML',
        seasonId: 'season-1',
        xp: 2100,
        rank: 4,
        streakDays: 18,
    },
    {
        userId: 'user-8',
        userName: 'Casey Park',
        userAvatar: 'CP',
        seasonId: 'season-1',
        xp: 1890,
        rank: 5,
        streakDays: 12,
    },
];

// Current Season
export const mockSeason: Season = {
    id: 'season-1',
    name: 'Winter Warriors',
    startAt: new Date('2024-12-01').toISOString(),
    endAt: new Date('2025-02-28').toISOString(),
    theme: 'Resilience and Growth',
};

// Mock Cosmetics
export const mockCosmetics: Cosmetic[] = [
    {
        id: 'cosmetic-1',
        name: 'Fire Avatar',
        type: 'avatar',
        rarity: 'rare',
        unlockRequirement: '20-day streak',
        owned: true,
    },
    {
        id: 'cosmetic-2',
        name: 'Champion Badge',
        type: 'badge',
        rarity: 'epic',
        unlockRequirement: 'Complete 5 quests',
        owned: true,
    },
    {
        id: 'cosmetic-3',
        name: 'Midnight Theme',
        type: 'theme',
        rarity: 'common',
        unlockRequirement: 'Reach level 5',
        owned: true,
    },
    {
        id: 'cosmetic-4',
        name: 'Legendary Title',
        type: 'title',
        rarity: 'legendary',
        unlockRequirement: '100-day streak',
        owned: false,
    },
    {
        id: 'cosmetic-5',
        name: 'Warrior Avatar',
        type: 'avatar',
        rarity: 'epic',
        unlockRequirement: 'Complete Fitness Quest',
        owned: false,
    },
];

// Helper function to generate completed dates
function generateCompletedDates(count: number, frequency: number = 1): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < count; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * frequency));
        dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
}

// Mock Focus Sessions
export const mockFocusSessions: FocusSession[] = [
    {
        id: 'focus-1',
        startAt: new Date(Date.now() - 7200000).toISOString(),
        durationMin: 25,
        mode: 'pomodoro',
        blockedItems: ['social-media', 'email'],
        completedAt: new Date(Date.now() - 5700000).toISOString(),
        actualDurationMin: 25,
    },
    {
        id: 'focus-2',
        startAt: new Date(Date.now() - 172800000).toISOString(),
        durationMin: 90,
        mode: 'deep-work',
        blockedItems: ['all-apps'],
        notes: 'Worked on project proposal',
        completedAt: new Date(Date.now() - 167400000).toISOString(),
        actualDurationMin: 90,
    },
];

// Mock Journal Entries
export const mockJournalEntries: JournalEntry[] = [
    {
        id: 'journal-1',
        createdAt: new Date().toISOString(),
        promptType: 'gratitude',
        text: 'Grateful for my health, supportive friends, and the opportunity to learn new skills.',
        mood: 5,
        tags: ['positive'],
    },
    {
        id: 'journal-2',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        promptType: 'reflection',
        text: 'Today I struggled with focus. Need to try pomodoro technique tomorrow.',
        linkedHabitId: 'habit-2',
        mood: 3,
        tags: ['challenge', 'learning'],
    },
];
