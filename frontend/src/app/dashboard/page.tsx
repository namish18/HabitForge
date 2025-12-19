'use client';

import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/StatCard';
import { HabitCard } from '@/components/HabitCard';
import { useAppStore } from '@/store/useAppStore';
import { FiTrendingUp, FiAward, FiZap, FiDollarSign } from 'react-icons/fi';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const user = useAppStore((state) => state.user);
    const habits = useAppStore((state) => state.habits);

    // Get top 3 habits to display in "Do Now" queue
    const doNowHabits = habits
        .filter((h) => {
            const today = new Date().toISOString().split('T')[0];
            return !h.completedDates.includes(today);
        })
        .slice(0, 3);

    return (
        <AppShell>
            <div className={styles.dashboard}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Welcome back, {user.name}!</h1>
                    <p className={styles.subtitle}>
                        You're on a {user.streakDays}-day streak. Keep it up!
                    </p>
                </header>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <StatCard
                        label="Level"
                        value={user.level}
                        subtext={`${user.xp} XP total`}
                        icon={<FiTrendingUp />}
                        xpProgress={{
                            current: user.xp,
                            max: user.xpToNext,
                        }}
                    />
                    <StatCard
                        label="Current Streak"
                        value={`${user.streakDays} days`}
                        subtext="Your longest yet!"
                        icon={<FiZap />}
                    />
                    <StatCard
                        label="HabitCoins"
                        value={user.coins}
                        subtext="Spend in shop"
                        icon={<FiDollarSign />}
                    />
                    <StatCard
                        label="Achievements"
                        value="8/12"
                        subtext="4 more to unlock"
                        icon={<FiAward />}
                    />
                </div>

                {/* Do Now Queue */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Do Now</h2>
                    <p className={styles.sectionSubtitle}>
                        Your top priority habits for today
                    </p>
                    <div className={styles.habitGrid}>
                        {doNowHabits.length > 0 ? (
                            doNowHabits.map((habit) => (
                                <HabitCard key={habit.id} habit={habit} />
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <p>All habits completed for today! Great job!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>All Habits</h2>
                    <div className={styles.habitGrid}>
                        {habits.map((habit) => (
                            <HabitCard key={habit.id} habit={habit} />
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
