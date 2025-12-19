'use client';

import { AppShell } from '@/components/layout/AppShell';
import { QuestCard } from '@/components/QuestCard';
import { useAppStore } from '@/store/useAppStore';
import styles from './quests.module.css';

export default function QuestsPage() {
    const quests = useAppStore((state) => state.quests);

    const activeQuests = quests.filter((q) => q.status === 'active');
    const lockedQuests = quests.filter((q) => q.status === 'locked');
    const completedQuests = quests.filter((q) => q.status === 'completed');

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Quests & Campaigns</h1>
                    <p className={styles.subtitle}>
                        Complete epic challenges and earn legendary rewards
                    </p>
                </header>

                {/* Active Quests */}
                {activeQuests.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Active Quests</h2>
                        <div className={styles.questGrid}>
                            {activeQuests.map((quest) => (
                                <QuestCard key={quest.id} quest={quest} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Available Quests */}
                {lockedQuests.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Available Quests</h2>
                        <div className={styles.questGrid}>
                            {lockedQuests.map((quest) => (
                                <QuestCard key={quest.id} quest={quest} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Completed Quests */}
                {completedQuests.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Completed Quests</h2>
                        <div className={styles.questGrid}>
                            {completedQuests.map((quest) => (
                                <QuestCard key={quest.id} quest={quest} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppShell>
    );
}
