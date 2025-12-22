'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import {
    FiZap,
    FiAlertTriangle,
    FiClock,
    FiTrendingUp,
    FiCheck,
    FiX,
    FiInfo,
} from 'react-icons/fi';
import styles from './insights.module.css';

export default function InsightsPage() {
    const aiInsights = useAppStore((state) => state.aiInsights);
    const habitPredictions = useAppStore((state) => state.habitPredictions);
    const habits = useAppStore((state) => state.habits);
    const acceptInsight = useAppStore((state) => state.acceptInsight);
    const dismissInsight = useAppStore((state) => state.dismissInsight);
    const generateInsights = useAppStore((state) => state.generateInsights);

    const activeInsights = aiInsights.filter((insight) => insight.status === 'active');
    const highRiskHabits = habitPredictions.filter((pred) => pred.riskLevel === 'high');
    const mediumRiskHabits = habitPredictions.filter((pred) => pred.riskLevel === 'medium');

    const getInsightIcon = (type: string) => {
        switch (type) {
            case 'timing':
                return <FiClock />;
            case 'stacking':
                return <FiZap />;
            case 'risk':
                return <FiAlertTriangle />;
            case 'optimization':
                return <FiTrendingUp />;
            default:
                return <FiZap />;
        }
    };

    const getInsightColor = (type: string) => {
        switch (type) {
            case 'timing':
                return 'blue';
            case 'stacking':
                return 'purple';
            case 'risk':
                return 'red';
            case 'optimization':
                return 'green';
            default:
                return 'gray';
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'high':
                return 'red';
            case 'medium':
                return 'yellow';
            case 'low':
                return 'green';
            default:
                return 'gray';
        }
    };

    const getHabitName = (habitId: string) => {
        return habits.find((h) => h.id === habitId)?.title || 'Unknown Habit';
    };

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            <FiZap /> AI Insights
                        </h1>
                        <p className={styles.subtitle}>
                            Personalized recommendations powered by your habit data
                        </p>
                    </div>
                    <Button icon={<FiZap />} onClick={generateInsights}>
                        Refresh Insights
                    </Button>
                </header>

                {/* Risk Alerts */}
                {highRiskHabits.length > 0 && (
                    <section className={styles.section}>
                        <div className={styles.alertBanner}>
                            <FiAlertTriangle />
                            <div>
                                <h3>Habits at Risk</h3>
                                <p>
                                    {highRiskHabits.length} habit{highRiskHabits.length > 1 ? 's' : ''} show
                                    declining patterns
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Active Insights */}
                {activeInsights.length > 0 ? (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Recommendations for You</h2>
                        <div className={styles.insightsGrid}>
                            {activeInsights.map((insight) => (
                                <Card key={insight.id}>
                                    <CardContent>
                                        <div className={styles.insightCard}>
                                            <div className={styles.insightHeader}>
                                                <div
                                                    className={`${styles.insightIcon} ${styles[`icon${getInsightColor(insight.type)}`]
                                                        }`}
                                                >
                                                    {getInsightIcon(insight.type)}
                                                </div>
                                                <div className={styles.insightMeta}>
                                                    <Badge
                                                        variant="default"
                                                        size="small"
                                                        className={styles.typeBadge}
                                                    >
                                                        {insight.type}
                                                    </Badge>
                                                    <div className={styles.confidence}>
                                                        <span className={styles.confidenceBar}>
                                                            <span
                                                                className={styles.confidenceFill}
                                                                style={{ width: `${insight.confidence}%` }}
                                                            />
                                                        </span>
                                                        <span className={styles.confidenceText}>
                                                            {insight.confidence}% confidence
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className={styles.insightTitle}>{insight.title}</h3>
                                            <p className={styles.insightDescription}>
                                                {insight.description}
                                            </p>

                                            {insight.habitId && (
                                                <div className={styles.habitBadge}>
                                                    {getHabitName(insight.habitId)}
                                                </div>
                                            )}

                                            <div className={styles.recommendation}>
                                                <FiZap />
                                                <strong>Recommendation:</strong> {insight.recommendation}
                                            </div>

                                            <div className={styles.reasoning}>
                                                <p className={styles.reasoningTitle}>
                                                    <FiInfo /> Why this recommendation?
                                                </p>
                                                <ul>
                                                    {insight.reasoning.map((reason, idx) => (
                                                        <li key={idx}>{reason}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className={styles.insightActions}>
                                                <Button
                                                    variant="primary"
                                                    size="small"
                                                    icon={<FiCheck />}
                                                    onClick={() => acceptInsight(insight.id)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="small"
                                                    icon={<FiX />}
                                                    onClick={() => dismissInsight(insight.id)}
                                                >
                                                    Dismiss
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                ) : (
                    <Card>
                        <CardContent>
                            <div className={styles.emptyState}>
                                <FiZap className={styles.emptyIcon} />
                                <h3>No New Insights</h3>
                                <p>
                                    Keep tracking your habits and we'll generate personalized
                                    recommendations based on your patterns.
                                </p>
                                <Button icon={<FiZap />} onClick={generateInsights}>
                                    Generate Insights
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Habit Predictions */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Habit Health Analysis</h2>
                    <div className={styles.predictionsGrid}>
                        {habitPredictions.map((prediction) => {
                            const habit = habits.find((h) => h.id === prediction.habitId);
                            if (!habit) return null;

                            return (
                                <Card key={prediction.habitId}>
                                    <CardContent>
                                        <div className={styles.predictionCard}>
                                            <div className={styles.predictionHeader}>
                                                <h4 className={styles.habitName}>{habit.title}</h4>
                                                <Badge
                                                    variant="default"
                                                    className={`${styles.riskBadge} ${styles[`risk${getRiskColor(prediction.riskLevel)}`]
                                                        }`}
                                                >
                                                    {prediction.riskLevel} risk
                                                </Badge>
                                            </div>

                                            <div className={styles.successProbability}>
                                                <span className={styles.probabilityLabel}>
                                                    Success Probability
                                                </span>
                                                <div className={styles.probabilityBar}>
                                                    <div
                                                        className={styles.probabilityFill}
                                                        style={{
                                                            width: `${prediction.successProbability}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className={styles.probabilityValue}>
                                                    {prediction.successProbability}%
                                                </span>
                                            </div>

                                            <div className={styles.predictionDetails}>
                                                <div className={styles.detailItem}>
                                                    <FiClock />
                                                    <span>
                                                        Optimal time: <strong>{prediction.optimalTime}</strong>
                                                    </span>
                                                </div>
                                            </div>

                                            {prediction.insights.length > 0 && (
                                                <div className={styles.predictionInsights}>
                                                    <p className={styles.insightsTitle}>Insights:</p>
                                                    <ul>
                                                        {prediction.insights.map((insight, idx) => (
                                                            <li key={idx}>{insight}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
