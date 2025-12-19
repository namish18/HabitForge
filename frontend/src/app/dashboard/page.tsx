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

                {/* Incomplete Tasks */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Tasks to Complete</h2>
                    <p className={styles.sectionSubtitle}>
                        Your pending tasks and priorities
                    </p>
                    <div className={styles.tasksList}>
                        {useAppStore.getState().tasks
                            .filter((task) => task.status !== 'completed')
                            .slice(0, 5)
                            .map((task) => (
                                <div key={task.id} className={styles.taskItem}>
                                    <div className={styles.taskInfo}>
                                        <h4 className={styles.taskTitle}>{task.title}</h4>
                                        {task.description && (
                                            <p className={styles.taskDescription}>{task.description}</p>
                                        )}
                                    </div>
                                    <div className={styles.taskMeta}>
                                        <span className={`${styles.taskPriority} ${styles[`priority${task.priority.charAt(0).toUpperCase()}${task.priority.slice(1)}`]}`}>
                                            {task.priority}
                                        </span>
                                        {task.project && (
                                            <span className={styles.taskProject}>{task.project}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        {useAppStore.getState().tasks.filter((task) => task.status !== 'completed').length === 0 && (
                            <div className={styles.emptyState}>
                                <p>All tasks completed! Great job!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Participating Quests */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Your Active Quests</h2>
                    <p className={styles.sectionSubtitle}>
                        Quests you're currently working on
                    </p>
                    <div className={styles.questsList}>
                        {useAppStore.getState().quests
                            .filter((quest) => quest.status === 'active')
                            .map((quest) => (
                                <div key={quest.id} className={styles.questItem}>
                                    <div className={styles.questHeader}>
                                        <h4 className={styles.questTitle}>{quest.title}</h4>
                                        <span className={styles.questProgress}>{quest.progress}%</span>
                                    </div>
                                    <div className={styles.questProgressBar}>
                                        <div
                                            className={styles.questProgressFill}
                                            style={{ width: `${quest.progress}%` }}
                                        />
                                    </div>
                                    <p className={styles.questDescription}>{quest.description}</p>
                                </div>
                            ))}
                        {useAppStore.getState().quests.filter((quest) => quest.status === 'active').length === 0 && (
                            <div className={styles.emptyState}>
                                <p>No active quests. Start one from the Quests page!</p>
                            </div>
                        )}
                    </div>
                </section>

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
