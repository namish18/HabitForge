// Core Data Models for HabitForge

export interface User {
    id: string;
    name: string;
    avatar: string;
    level: number;
    xp: number;
    xpToNext: number;
    coins: number;
    streakDays: number;
    titles: string[];
    cosmeticsUnlocked: string[];
    privacySettings: {
        showOnLeaderboard: boolean;
        allowTeamInvites: boolean;
        shareCompletionStats: boolean;
    };
}

export type HabitType = 'build' | 'break';

export interface ScheduleConfig {
    frequency: 'daily' | 'weekly' | 'custom';
    daysOfWeek?: number[]; // 0-6, Sunday = 0
    timesPerDay?: number;
    customDates?: string[];
}

export interface ReminderConfig {
    enabled: boolean;
    times: string[]; // HH:MM format
    message?: string;
    snoozeMinutes: number;
}

export interface ContextCue {
    type: 'location' | 'routine' | 'time';
    value: string;
    description: string;
}

export interface EnvironmentChecklist {
    id: string;
    description: string;
    completed: boolean;
}

export interface RewardConfig {
    xpPerCompletion: number;
    coinsPerCompletion: number;
    bonusMultiplier?: number;
}

export interface Habit {
    id: string;
    title: string;
    description?: string;
    type: HabitType;
    schedule: ScheduleConfig;
    reminderConfig: ReminderConfig;
    contextCues: ContextCue[];
    difficulty: number; // 1-5
    twoMinuteVersion?: string;
    habitStacking?: {
        triggerHabitId?: string;
        triggerTaskId?: string;
        description: string;
    };
    environmentSetupChecklist: EnvironmentChecklist[];
    rewardConfig: RewardConfig;
    streak: number;
    lastCompletedAt?: string;
    tags: string[];
    temptationBundling?: {
        activity: string;
        icon: string;
    };
    makeInvisible?: boolean; // for break habits
    frictionControls?: {
        cooldownMinutes: number;
        requireConfirmation: boolean;
    };
    completedDates: string[]; // ISO date strings
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    project?: string;
    dueDate?: string;
    recurring?: {
        frequency: 'daily' | 'weekly' | 'monthly';
        interval: number;
    };
    estMinutes?: number;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
    tags: string[];
    createdAt: string;
    completedAt?: string;
}

export interface QuestStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    relatedHabitIds?: string[];
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    durationDays: number;
    startDate?: string;
    steps: QuestStep[];
    rewards: {
        xp: number;
        coins: number;
        unlocksCosmetic?: string;
        unlocksTitle?: string;
    };
    progress: number; // 0-100
    bossMode?: {
        enabled: boolean;
        name: string;
        health: number;
        maxHealth: number;
    };
    status: 'locked' | 'active' | 'completed';
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    criteria: string;
    icon: string;
    earnedAt?: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface TeamMember {
    userId: string;
    role: 'member' | 'admin';
    joinedAt: string;
}

export interface TeamChallenge {
    id: string;
    title: string;
    description: string;
    goal: number;
    currentProgress: number;
    endsAt: string;
}

export interface Team {
    id: string;
    name: string;
    description: string;
    avatar: string;
    members: TeamMember[];
    challenges: TeamChallenge[];
    totalXp: number;
    level: number;
}

export interface LeaderboardEntry {
    userId: string;
    userName: string;
    userAvatar: string;
    seasonId: string;
    xp: number;
    rank: number;
    streakDays: number;
}

export type FocusMode = 'pomodoro' | 'deep-work' | 'flow';

export interface FocusSession {
    id: string;
    startAt: string;
    durationMin: number;
    mode: FocusMode;
    blockedItems: string[];
    notes?: string;
    completedAt?: string;
    actualDurationMin?: number;
}

export interface JournalEntry {
    id: string;
    createdAt: string;
    promptType: 'reflection' | 'gratitude' | 'slip-trigger' | 'free';
    text: string;
    linkedHabitId?: string;
    linkedTaskId?: string;
    mood?: number; // 1-5
    tags: string[];
}

export interface Season {
    id: string;
    name: string;
    startAt: string;
    endAt: string;
    theme: string;
}

export interface Cosmetic {
    id: string;
    name: string;
    type: 'avatar' | 'badge' | 'theme' | 'title';
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockRequirement: string;
    owned: boolean;
}

export interface AppState {
    user: User;
    habits: Habit[];
    tasks: Task[];
    quests: Quest[];
    achievements: Achievement[];
    teams: Team[];
    leaderboard: LeaderboardEntry[];
    focusSessions: FocusSession[];
    journalEntries: JournalEntry[];
    currentSeason: Season;
    cosmetics: Cosmetic[];
}
