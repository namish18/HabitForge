'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAppStore } from '@/store/useAppStore';
import styles from '../habits/habits.module.css';

export default function AnalyticsPage() {
    const habits = useAppStore((state) => state.habits);

    const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
    const avgStreak = habits.reduce((sum, h) => sum + h.streak, 0) / habits.length;

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Analytics</h1>
                        <p className={styles.subtitle}>
                            Insights into your habit performance
                        </p>
                    </div>
                </header>

                <div className={styles.stats} style={{ marginBottom: '2rem' }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Completions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{totalCompletions}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Average Streak</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{Math.round(avgStreak)} days</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Active Habits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{habits.length}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Completion Heatmap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            Detailed analytics charts coming soon
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
