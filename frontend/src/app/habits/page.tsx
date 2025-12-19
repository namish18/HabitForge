'use client';

import { AppShell } from '@/components/layout/AppShell';
import { HabitCard } from '@/components/HabitCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { FiPlus, FiFilter } from 'react-icons/fi';
import styles from './habits.module.css';

export default function HabitsPage() {
    const habits = useAppStore((state) => state.habits);

    const buildHabits = habits.filter((h) => h.type === 'build');
    const breakHabits = habits.filter((h) => h.type === 'break');

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Habits</h1>
                        <p className={styles.subtitle}>
                            Build good habits, break bad ones
                        </p>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="ghost" icon={<FiFilter />}>
                            Filter
                        </Button>
                        <Button icon={<FiPlus />}>
                            New Habit
                        </Button>
                    </div>
                </header>

                <div className={styles.stats}>
                    <Badge variant="success" size="large">
                        {buildHabits.length} Build Habits
                    </Badge>
                    <Badge variant="error" size="large">
                        {breakHabits.length} Break Habits
                    </Badge>
                    <Badge variant="primary" size="large">
                        {habits.length} Total
                    </Badge>
                </div>

                {/* Build Habits */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Build Habits</h2>
                    <div className={styles.habitGrid}>
                        {buildHabits.map((habit) => (
                            <HabitCard key={habit.id} habit={habit} />
                        ))}
                    </div>
                </section>

                {/* Break Habits */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Break Habits</h2>
                    <div className={styles.habitGrid}>
                        {breakHabits.map((habit) => (
                            <HabitCard key={habit.id} habit={habit} />
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
