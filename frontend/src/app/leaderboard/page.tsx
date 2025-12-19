'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { FiZap, FiAward } from 'react-icons/fi';
import styles from './leaderboard.module.css';

export default function LeaderboardPage() {
    const leaderboard = useAppStore((state) => state.leaderboard);
    const currentSeason = useAppStore((state) => state.currentSeason);

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Leaderboard</h1>
                    <div className={styles.seasonInfo}>
                        <Badge variant="primary" size="large">
                            {currentSeason.name}
                        </Badge>
                        <p className={styles.subtitle}>{currentSeason.theme}</p>
                    </div>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle>Global Rankings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.leaderboardTable}>
                            {leaderboard.map((entry) => (
                                <div key={entry.userId} className={styles.leaderboardRow}>
                                    <div className={styles.rank}>
                                        {entry.rank === 1 && <span className={styles.gold}>
                                            <FiAward />
                                        </span>}
                                        {entry.rank === 2 && <span className={styles.silver}>
                                            <FiAward />
                                        </span>}
                                        {entry.rank === 3 && <span className={styles.bronze}>
                                            <FiAward />
                                        </span>}
                                        {entry.rank > 3 && <span className={styles.rankNumber}>#{entry.rank}</span>}
                                    </div>

                                    <div className={styles.userInfo}>
                                        <div className={styles.avatar}>{entry.userAvatar}</div>
                                        <span className={styles.userName}>{entry.userName}</span>
                                    </div>

                                    <div className={styles.stats}>
                                        <div className={styles.statItem}>
                                            <FiZap className={styles.statIcon} />
                                            <span className={styles.statValue}>{entry.xp} XP</span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <FiZap className={styles.statIcon} />
                                            <span className={styles.statValue}>{entry.streakDays} day streak</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
