import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    icon: React.ReactNode;
    xpProgress?: {
        current: number;
        max: number;
    };
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    subtext,
    icon,
    xpProgress,
}) => {
    const progressPercent = xpProgress
        ? Math.round((xpProgress.current / xpProgress.max) * 100)
        : 0;

    return (
        <div className={styles.statCard}>
            <div className={styles.statHeader}>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statIcon}>{icon}</span>
            </div>
            <div className={styles.statValue}>{value}</div>
            {subtext && <div className={styles.statSubtext}>{subtext}</div>}
            {xpProgress && (
                <>
                    <div className={styles.xpProgress}>
                        <div
                            className={styles.xpProgressBar}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className={styles.statSubtext} style={{ marginTop: '0.5rem' }}>
                        {xpProgress.current} / {xpProgress.max} XP
                    </div>
                </>
            )}
        </div>
    );
};
