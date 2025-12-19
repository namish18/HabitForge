'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { FiTrendingUp, FiZap, FiDollarSign, FiAward, FiStar } from 'react-icons/fi';
import styles from './profile.module.css';

export default function ProfilePage() {
    const user = useAppStore((state) => state.user);
    const achievements = useAppStore((state) => state.achievements);
    const cosmetics = useAppStore((state) => state.cosmetics);

    const earnedAchievements = achievements.filter((a) => a.earnedAt);

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div className={styles.avatarLarge}>{user.avatar}</div>
                    <h1 className={styles.name}>{user.name}</h1>
                    <div className={styles.titles}>
                        {user.titles.map((title) => (
                            <Badge key={title} variant="primary">
                                {title}
                            </Badge>
                        ))}
                    </div>
                </header>

                <div className={styles.statsGrid}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={styles.statsList}>
                                <div className={styles.statRow}>
                                    <span className={styles.statLabel}>
                                        <FiTrendingUp /> Level
                                    </span>
                                    <span className={styles.statValue}>{user.level}</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span className={styles.statLabel}>
                                        <FiZap /> Total XP
                                    </span>
                                    <span className={styles.statValue}>{user.xp}</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span className={styles.statLabel}>
                                        <FiZap /> Current Streak
                                    </span>
                                    <span className={styles.statValue}>{user.streakDays} days</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span className={styles.statLabel}>
                                        <FiDollarSign /> HabitCoins
                                    </span>
                                    <span className={styles.statValue}>{user.coins}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FiAward /> Achievements ({earnedAchievements.length}/{achievements.length})
                    </h2>
                    <div className={styles.achievementGrid}>
                        {achievements.map((achievement) => (
                            <Card
                                key={achievement.id}
                                variant={achievement.earnedAt ? 'glow' : 'bordered'}
                                className={achievement.earnedAt ? '' : styles.locked}
                            >
                                <CardContent>
                                    <div className={styles.achievementIcon}>
                                        <FiStar />
                                    </div>
                                    <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                                    <p className={styles.achievementDescription}>
                                        {achievement.description}
                                    </p>
                                    <Badge
                                        variant={achievement.earnedAt ? 'success' : 'default'}
                                        size="small"
                                    >
                                        {achievement.rarity}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Cosmetics & Inventory</h2>
                    <div className={styles.cosmeticGrid}>
                        {cosmetics.map((cosmetic) => (
                            <Card
                                key={cosmetic.id}
                                variant={cosmetic.owned ? 'elevated' : 'bordered'}
                                className={cosmetic.owned ? '' : styles.locked}
                            >
                                <CardContent>
                                    <h3 className={styles.cosmeticName}>{cosmetic.name}</h3>
                                    <Badge variant="default" size="small">
                                        {cosmetic.type}
                                    </Badge>
                                    <p className={styles.cosmeticRequirement}>
                                        {cosmetic.unlockRequirement}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
