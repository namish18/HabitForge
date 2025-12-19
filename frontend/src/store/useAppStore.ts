import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    AppState,
    User,
    Habit,
    Task,
    Quest,
    FocusSession,
    JournalEntry,
    Achievement,
} from '../lib/types';
import {
    mockUser,
    mockHabits,
    mockTasks,
    mockQuests,
    mockAchievements,
    mockTeam,
    mockLeaderboard,
    mockSeason,
    mockCosmetics,
    mockFocusSessions,
    mockJournalEntries,
    mockAccountabilityPartners,
    mockAccountabilityInvitations,
} from './mockData';

interface AppStore extends AppState {
    // Habit actions
    completeHabit: (habitId: string) => void;
    snoozeHabit: (habitId: string, minutes: number) => void;
    addHabit: (habit: Habit) => void;
    updateHabit: (habitId: string, updates: Partial<Habit>) => void;
    deleteHabit: (habitId: string) => void;

    // Task actions
    addTask: (task: Task) => void;
    updateTask: (taskId: string, updates: Partial<Task>) => void;
    completeTask: (taskId: string) => void;
    deleteTask: (taskId: string) => void;

    // Quest actions
    updateQuestProgress: (questId: string, stepId: string) => void;
    completeQuest: (questId: string) => void;
    startQuest: (questId: string) => void;

    // Focus actions
    startFocus: (session: Omit<FocusSession, 'id'>) => void;
    endFocus: (sessionId: string, actualMinutes: number) => void;

    // Journal actions
    addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;

    // User actions
    grantXp: (amount: number) => void;
    spendCoins: (amount: number) => void;
    earnCoins: (amount: number) => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    togglePrivacySetting: (setting: keyof User['privacySettings']) => void;
    unlockCosmetic: (cosmeticId: string) => void;

    // Achievement actions
    claimAchievement: (achievementId: string) => void;

    // Accountability actions
    sendAccountabilityInvite: (toUserId: string, toUserName: string, toUserAvatar: string) => void;
    acceptAccountabilityInvite: (invitationId: string) => void;
    rejectAccountabilityInvite: (invitationId: string) => void;
    removeAccountabilityPartner: (partnerId: string) => void;

    // Utility actions
    resetData: () => void;
}

const initialState: AppState = {
    user: mockUser,
    habits: mockHabits,
    tasks: mockTasks,
    quests: mockQuests,
    achievements: mockAchievements,
    teams: [mockTeam],
    leaderboard: mockLeaderboard,
    focusSessions: mockFocusSessions,
    journalEntries: mockJournalEntries,
    currentSeason: mockSeason,
    cosmetics: mockCosmetics,
    accountabilityPartners: mockAccountabilityPartners,
    accountabilityInvitations: mockAccountabilityInvitations,
};

export const useAppStore = create<AppStore>()(
    persist(
        (set, get) => ({
            ...initialState,

            // Habit actions
            completeHabit: (habitId: string) => {
                const habit = get().habits.find(h => h.id === habitId);
                if (!habit) return;

                const today = new Date().toISOString().split('T')[0];
                const updatedCompletedDates = [...habit.completedDates, today];
                const newStreak = habit.streak + 1;

                set(state => ({
                    habits: state.habits.map(h =>
                        h.id === habitId
                            ? {
                                ...h,
                                streak: newStreak,
                                lastCompletedAt: new Date().toISOString(),
                                completedDates: updatedCompletedDates,
                            }
                            : h
                    ),
                }));

                // Grant rewards
                get().grantXp(habit.rewardConfig.xpPerCompletion);
                get().earnCoins(habit.rewardConfig.coinsPerCompletion);
            },

            snoozeHabit: (habitId: string, minutes: number) => {
                // Just a UI action, no state change needed
                console.log(`Snoozed habit ${habitId} for ${minutes} minutes`);
            },

            addHabit: (habit: Habit) => {
                set(state => ({
                    habits: [...state.habits, habit],
                }));
            },

            updateHabit: (habitId: string, updates: Partial<Habit>) => {
                set(state => ({
                    habits: state.habits.map(h =>
                        h.id === habitId ? { ...h, ...updates } : h
                    ),
                }));
            },

            deleteHabit: (habitId: string) => {
                set(state => ({
                    habits: state.habits.filter(h => h.id !== habitId),
                }));
            },

            // Task actions
            addTask: (task: Task) => {
                set(state => ({
                    tasks: [...state.tasks, task],
                }));
            },

            updateTask: (taskId: string, updates: Partial<Task>) => {
                set(state => ({
                    tasks: state.tasks.map(t =>
                        t.id === taskId ? { ...t, ...updates } : t
                    ),
                }));
            },

            completeTask: (taskId: string) => {
                set(state => ({
                    tasks: state.tasks.map(t =>
                        t.id === taskId
                            ? { ...t, status: 'completed' as const, completedAt: new Date().toISOString() }
                            : t
                    ),
                }));

                // Grant XP for task completion
                get().grantXp(25);
                get().earnCoins(5);
            },

            deleteTask: (taskId: string) => {
                set(state => ({
                    tasks: state.tasks.filter(t => t.id !== taskId),
                }));
            },

            // Quest actions
            updateQuestProgress: (questId: string, stepId: string) => {
                set(state => ({
                    quests: state.quests.map(q => {
                        if (q.id !== questId) return q;

                        const updatedSteps = q.steps.map(s =>
                            s.id === stepId ? { ...s, completed: true } : s
                        );

                        const completedSteps = updatedSteps.filter(s => s.completed).length;
                        const totalSteps = updatedSteps.length;
                        const newProgress = Math.round((completedSteps / totalSteps) * 100);

                        return {
                            ...q,
                            steps: updatedSteps,
                            progress: newProgress,
                        };
                    }),
                }));
            },

            completeQuest: (questId: string) => {
                const quest = get().quests.find(q => q.id === questId);
                if (!quest) return;

                set(state => ({
                    quests: state.quests.map(q =>
                        q.id === questId ? { ...q, status: 'completed' as const, progress: 100 } : q
                    ),
                }));

                // Grant quest rewards
                get().grantXp(quest.rewards.xp);
                get().earnCoins(quest.rewards.coins);

                if (quest.rewards.unlocksCosmetic) {
                    get().unlockCosmetic(quest.rewards.unlocksCosmetic);
                }
            },

            startQuest: (questId: string) => {
                set(state => ({
                    quests: state.quests.map(q =>
                        q.id === questId
                            ? { ...q, status: 'active' as const, startDate: new Date().toISOString() }
                            : q
                    ),
                }));
            },

            // Focus actions
            startFocus: (session: Omit<FocusSession, 'id'>) => {
                const newSession: FocusSession = {
                    ...session,
                    id: `focus-${Date.now()}`,
                };

                set(state => ({
                    focusSessions: [...state.focusSessions, newSession],
                }));
            },

            endFocus: (sessionId: string, actualMinutes: number) => {
                set(state => ({
                    focusSessions: state.focusSessions.map(s =>
                        s.id === sessionId
                            ? {
                                ...s,
                                completedAt: new Date().toISOString(),
                                actualDurationMin: actualMinutes,
                            }
                            : s
                    ),
                }));

                // Grant XP based on focus time
                get().grantXp(Math.round(actualMinutes * 2));
            },

            // Journal actions
            addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
                const newEntry: JournalEntry = {
                    ...entry,
                    id: `journal-${Date.now()}`,
                    createdAt: new Date().toISOString(),
                };

                set(state => ({
                    journalEntries: [newEntry, ...state.journalEntries],
                }));
            },

            // User actions
            grantXp: (amount: number) => {
                set(state => {
                    const newXp = state.user.xp + amount;
                    const currentLevel = state.user.level;
                    const xpToNext = state.user.xpToNext;

                    let newLevel = currentLevel;
                    let newXpToNext = xpToNext;

                    // Level up logic
                    if (newXp >= xpToNext) {
                        newLevel = currentLevel + 1;
                        newXpToNext = Math.floor(xpToNext * 1.5);
                    }

                    return {
                        user: {
                            ...state.user,
                            xp: newXp,
                            level: newLevel,
                            xpToNext: newXpToNext,
                        },
                    };
                });
            },

            spendCoins: (amount: number) => {
                set(state => ({
                    user: {
                        ...state.user,
                        coins: Math.max(0, state.user.coins - amount),
                    },
                }));
            },

            earnCoins: (amount: number) => {
                set(state => ({
                    user: {
                        ...state.user,
                        coins: state.user.coins + amount,
                    },
                }));
            },

            incrementStreak: () => {
                set(state => ({
                    user: {
                        ...state.user,
                        streakDays: state.user.streakDays + 1,
                    },
                }));
            },

            resetStreak: () => {
                set(state => ({
                    user: {
                        ...state.user,
                        streakDays: 0,
                    },
                }));
            },

            togglePrivacySetting: (setting: keyof User['privacySettings']) => {
                set(state => ({
                    user: {
                        ...state.user,
                        privacySettings: {
                            ...state.user.privacySettings,
                            [setting]: !state.user.privacySettings[setting],
                        },
                    },
                }));
            },

            unlockCosmetic: (cosmeticId: string) => {
                set(state => ({
                    cosmetics: state.cosmetics.map(c =>
                        c.id === cosmeticId ? { ...c, owned: true } : c
                    ),
                }));
            },

            // Achievement actions
            claimAchievement: (achievementId: string) => {
                set(state => ({
                    achievements: state.achievements.map(a =>
                        a.id === achievementId
                            ? { ...a, earnedAt: new Date().toISOString() }
                            : a
                    ),
                }));

                // Grant achievement rewards
                get().grantXp(100);
                get().earnCoins(50);
            },

            // Accountability actions
            sendAccountabilityInvite: (toUserId: string, toUserName: string, toUserAvatar: string) => {
                // Check if already partners
                const existingPartner = get().accountabilityPartners.find(p => p.userId === toUserId);
                if (existingPartner) {
                    console.log('Already partners with this user');
                    return;
                }

                // Check if already invited
                const existingInvite = get().accountabilityInvitations.find(
                    inv => inv.toUserId === toUserId && inv.status === 'pending'
                );
                if (existingInvite) {
                    console.log('Already sent invite to this user');
                    return;
                }

                // Check partner limit
                if (get().accountabilityPartners.length >= 3) {
                    console.log('Maximum 3 accountability partners allowed');
                    return;
                }

                const newInvitation: import('../lib/types').AccountabilityInvitation = {
                    id: `inv-${Date.now()}`,
                    fromUserId: get().user.id,
                    fromUserName: get().user.name,
                    fromUserAvatar: get().user.avatar,
                    toUserId,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                };

                set(state => ({
                    accountabilityInvitations: [...state.accountabilityInvitations, newInvitation],
                }));
            },

            acceptAccountabilityInvite: (invitationId: string) => {
                const invitation = get().accountabilityInvitations.find(inv => inv.id === invitationId);
                if (!invitation) return;

                // Check partner limit
                if (get().accountabilityPartners.length >= 3) {
                    console.log('Maximum 3 accountability partners allowed');
                    return;
                }

                // Create new partner
                const newPartner: import('../lib/types').AccountabilityPartner = {
                    userId: invitation.fromUserId,
                    userName: invitation.fromUserName,
                    userAvatar: invitation.fromUserAvatar,
                    addedAt: new Date().toISOString(),
                    sharedHabits: [],
                    streakDays: 0,
                };

                // Update invitation status and add partner
                set(state => ({
                    accountabilityInvitations: state.accountabilityInvitations.map(inv =>
                        inv.id === invitationId ? { ...inv, status: 'accepted' as const } : inv
                    ),
                    accountabilityPartners: [...state.accountabilityPartners, newPartner],
                }));
            },

            rejectAccountabilityInvite: (invitationId: string) => {
                set(state => ({
                    accountabilityInvitations: state.accountabilityInvitations.map(inv =>
                        inv.id === invitationId ? { ...inv, status: 'rejected' as const } : inv
                    ),
                }));
            },

            removeAccountabilityPartner: (partnerId: string) => {
                set(state => ({
                    accountabilityPartners: state.accountabilityPartners.filter(p => p.userId !== partnerId),
                }));
            },

            // Utility
            resetData: () => {
                set(initialState);
            },
        }),
        {
            name: 'habitforge-storage',
            partialize: (state) => ({
                user: state.user,
                habits: state.habits,
                tasks: state.tasks,
                quests: state.quests,
                achievements: state.achievements,
                focusSessions: state.focusSessions,
                journalEntries: state.journalEntries,
                accountabilityPartners: state.accountabilityPartners,
                accountabilityInvitations: state.accountabilityInvitations,
            }),
        }
    )
);
