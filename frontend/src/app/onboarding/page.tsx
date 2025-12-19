'use client';

import Link from 'next/link';
import styles from './onboarding.module.css';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FiTarget, FiClock, FiUsers, FiZap } from 'react-icons/fi';

export default function OnboardingPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Welcome to HabitForge</h1>
                    <p className={styles.subtitle}>
                        Let's set up your habit-building journey
                    </p>
                </header>

                <div className={styles.stepsGrid}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <FiTarget /> Choose Your Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Select from fitness, productivity, wellness, or create custom goals</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <FiClock /> Set Reminders
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Configure when you want to be reminded about your habits</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <FiUsers /> Privacy Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Choose your visibility on leaderboards and teams</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <FiZap /> Pick Templates
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Start with proven habit templates or build from scratch</p>
                        </CardContent>
                    </Card>
                </div>

                <div className={styles.actions}>
                    <Link href="/dashboard">
                        <Button size="large">
                            Skip to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
