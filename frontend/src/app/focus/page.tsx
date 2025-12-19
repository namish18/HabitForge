'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FiClock, FiPlay, FiPause, FiSquare } from 'react-icons/fi';
import styles from '../habits/habits.module.css';

export default function FocusPage() {
    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Focus Sessions</h1>
                        <p className={styles.subtitle}>
                            Deep work timer with distraction blocking
                        </p>
                    </div>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle>Pomodoro Timer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '2rem' }}>
                                25:00
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <Button icon={<FiPlay />}>Start</Button>
                                <Button variant="ghost" icon={<FiPause />}>Pause</Button>
                                <Button variant="ghost" icon={<FiSquare />}>Stop</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
