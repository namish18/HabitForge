'use client';

import React from 'react';
import styles from './HabitCard.module.css';
import clsx from 'clsx';
import { Habit } from '@/lib/types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { FiCheck, FiClock, FiZap, FiCalendar } from 'react-icons/fi';
import { useAppStore } from '@/store/useAppStore';

interface HabitCardProps {
    habit: Habit;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
    const completeHabit = useAppStore((state) => state.completeHabit);
    const snoozeHabit = useAppStore((state) => state.snoozeHabit);

    const isCompletedToday = habit.completedDates.includes(
        new Date().toISOString().split('T')[0]
    );

    const handleComplete = () => {
        if (!isCompletedToday) {
            completeHabit(habit.id);
        }
    };

    const handleSnooze = () => {
        snoozeHabit(habit.id, habit.reminderConfig.snoozeMinutes);
    };

    return (
        <div
            className={clsx(
                styles.habitCard,
                habit.type === 'build' ? styles.typeBuild : styles.typeBreak
            )}
        >
            <div className={styles.habitHeader}>
                <div className={styles.habitInfo}>
                    <h3 className={styles.habitTitle}>{habit.title}</h3>
                    {habit.description && (
                        <p className={styles.habitDescription}>{habit.description}</p>
                    )}
                    <div className={styles.habitMeta}>
                        {habit.streak > 0 && (
                            <div className={styles.streakBadge}>
                                <FiZap className={styles.streakIcon} />
                                {habit.streak} day streak
                            </div>
                        )}
                        <div className={styles.metaItem}>
                            <FiCalendar className={styles.metaIcon} />
                            {habit.schedule.frequency}
                        </div>
                        {habit.difficulty && (
                            <Badge variant="default" size="small">
                                Difficulty: {habit.difficulty}/5
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.habitActions}>
                <Button
                    variant={isCompletedToday ? 'success' : 'primary'}
                    fullWidth
                    icon={<FiCheck />}
                    onClick={handleComplete}
                    disabled={isCompletedToday}
                >
                    {isCompletedToday ? 'Completed' : 'Complete'}
                </Button>
                {habit.reminderConfig.enabled && (
                    <Button
                        variant="ghost"
                        icon={<FiClock />}
                        onClick={handleSnooze}
                    >
                        Snooze
                    </Button>
                )}
            </div>
        </div>
    );
};
