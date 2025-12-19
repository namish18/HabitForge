'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { Button } from '@/components/ui/Button';
import { FiTarget, FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';

export default function HomePage() {
    return (
        <div className={styles.hero}>
            <h1 className={styles.logo}>HabitForge</h1>
            <p className={styles.tagline}>
                Transform Your Life Through Gamified Habit Building
            </p>
            <p className={styles.description}>
                Built on Atomic Habits' Four Laws: Make it Obvious, Attractive, Easy, and Satisfying
            </p>

            <div className={styles.cta}>
                <Link href="/onboarding">
                    <Button size="large" icon={<FiZap />}>
                        Try Demo
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button size="large" variant="outline">
                        Go to Dashboard
                    </Button>
                </Link>
            </div>

            <div className={styles.features}>
                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <FiTarget />
                    </div>
                    <h3 className={styles.featureTitle}>Make it Obvious</h3>
                    <p className={styles.featureDescription}>
                        Visual cues, reminders, and environmental design to trigger your habits
                    </p>
                </div>

                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <FiZap />
                    </div>
                    <h3 className={styles.featureTitle}>Make it Attractive</h3>
                    <p className={styles.featureDescription}>
                        Quests, social features, and temptation bundling to boost motivation
                    </p>
                </div>

                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <FiTrendingUp />
                    </div>
                    <h3 className={styles.featureTitle}>Make it Easy</h3>
                    <p className={styles.featureDescription}>
                        1-tap check-ins, templates, and habit stacking for frictionless execution
                    </p>
                </div>

                <div className={styles.feature}>
                    <div className={styles.featureIcon}>
                        <FiAward />
                    </div>
                    <h3 className={styles.featureTitle}>Make it Satisfying</h3>
                    <p className={styles.featureDescription}>
                        XP, levels, streaks, and achievements for immediate gratification
                    </p>
                </div>
            </div>
        </div>
    );
}
