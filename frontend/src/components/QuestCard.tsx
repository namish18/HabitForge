'use client';

import React from 'react';
import styles from './QuestCard.module.css';
import clsx from 'clsx';
import { Quest } from '@/lib/types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { FiCheckCircle, FiCircle, FiAward, FiDollarSign, FiZap, FiClock } from 'react-icons/fi';
import { useAppStore } from '@/store/useAppStore';

interface QuestCardProps {
    quest: Quest;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
    const startQuest = useAppStore((state) => state.startQuest);
    const updateQuestProgress = useAppStore((state) => state.updateQuestProgress);
    const completeQuest = useAppStore((state) => state.completeQuest);

    const handleStart = () => {
        startQuest(quest.id);
    };

    const handleStepToggle = (stepId: string) => {
        updateQuestProgress(quest.id, stepId);
    };

    const handleComplete = () => {
        completeQuest(quest.id);
    };

    const isAllStepsComplete = quest.steps.every((s) => s.completed);

    return (
        <div className={styles.questCard}>
            <div className={styles.questHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 className={styles.questTitle}>{quest.title}</h3>
                    <Badge
                        variant={
                            quest.status === 'completed'
                                ? 'success'
                                : quest.status === 'active'
                                    ? 'primary'
                                    : 'default'
                        }
                    >
                        {quest.status}
                    </Badge>
                </div>
                <p className={styles.questDescription}>{quest.description}</p>
                <div className={styles.questMeta}>
                    <Badge variant="info" size="small" icon={<FiClock />}>
                        {quest.durationDays} days
                    </Badge>
                    <Badge variant="default" size="small">
                        {quest.steps.length} steps
                    </Badge>
                </div>
            </div>

            {/* Progress */}
            <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${quest.progress}%` }}
                    />
                </div>
                <p className={styles.progressText}>{quest.progress}% Complete</p>
            </div>

            {/* Boss Mode */}
            {quest.bossMode?.enabled && (
                <div className={styles.bossMode}>
                    <p className={styles.bossTitle}>Boss: {quest.bossMode.name}</p>
                    <div className={styles.bossHealth}>
                        <div
                            className={styles.bossHealthFill}
                            style={{
                                width: `${(quest.bossMode.health / quest.bossMode.maxHealth) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Steps */}
            <div className={styles.steps}>
                {quest.steps.map((step) => (
                    <div
                        key={step.id}
                        className={clsx(styles.step, step.completed && styles.stepCompleted)}
                        onClick={() => !step.completed && quest.status === 'active' && handleStepToggle(step.id)}
                        style={{ cursor: quest.status === 'active' && !step.completed ? 'pointer' : 'default' }}
                    >
                        {step.completed ? (
                            <FiCheckCircle className={styles.stepIcon} />
                        ) : (
                            <FiCircle className={styles.stepIconIncomplete} />
                        )}
                        <span className={styles.stepText}>{step.title}</span>
                    </div>
                ))}
            </div>

            {/* Rewards */}
            <div className={styles.rewards}>
                <div className={styles.rewardItem}>
                    <FiZap />
                    +{quest.rewards.xp} XP
                </div>
                <div className={styles.rewardItem}>
                    <FiDollarSign />
                    +{quest.rewards.coins} coins
                </div>
                {quest.rewards.unlocksTitle && (
                    <div className={styles.rewardItem}>
                        <FiAward />
                        {quest.rewards.unlocksTitle}
                    </div>
                )}
            </div>

            {/* Actions */}
            {quest.status === 'locked' && (
                <Button variant="primary" fullWidth onClick={handleStart}>
                    Start Quest
                </Button>
            )}
            {quest.status === 'active' && isAllStepsComplete && (
                <Button variant="success" fullWidth onClick={handleComplete}>
                    Claim Rewards
                </Button>
            )}
            {quest.status === 'completed' && (
                <Badge variant="success" size="large">
                    Quest Completed!
                </Badge>
            )}
        </div>
    );
};
