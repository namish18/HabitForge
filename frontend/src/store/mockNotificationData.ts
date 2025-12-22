import { NotificationRule, NotificationPreferences } from '../lib/types';

// Mock Notification Preferences
export const mockNotificationPreferences: NotificationPreferences = {
    enabled: true,
    quietHours: { start: '22:00', end: '07:00' },
    soundEnabled: true,
    vibrationEnabled: true,
    badgeEnabled: true,
    contextAware: true,
};

// Mock Notification Rules
export const mockNotificationRules: NotificationRule[] = [
    {
        id: 'rule-1',
        habitId: 'habit-1',
        enabled: true,
        triggers: [
            {
                type: 'time',
                value: '07:00',
                conditions: { repeat: 'daily' },
            },
        ],
        message: 'Time for your morning meditation! 🧘',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'rule-2',
        habitId: 'habit-2',
        enabled: true,
        triggers: [
            {
                type: 'time',
                value: '21:00',
                conditions: { repeat: 'daily' },
            },
        ],
        message: 'Reading time! Pick up your book 📚',
        quietHours: { start: '23:00', end: '06:00' },
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'rule-3',
        habitId: 'habit-4',
        enabled: false,
        triggers: [
            {
                type: 'time',
                value: '18:00',
                conditions: { repeat: 'weekdays' },
            },
        ],
        message: 'Evening workout reminder 💪',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
];
