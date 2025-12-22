'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import {
    FiBarChart2,
    FiTrendingUp,
    FiCalendar,
    FiClock,
    FiDownload,
    FiPieChart,
} from 'react-icons/fi';
import { useState } from 'react';
import styles from './analytics.module.css';
import { generateHabitHeatmapData, generateProductivityByHour, generateCategoryBreakdown, generateXPProgression } from '@/lib/analyticsHelpers';

// Dynamic imports for charts (code splitting)
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('@/components/charts/AreaChart'), { ssr: false });
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });
const HabitHeatmap = dynamic(() => import('@/components/charts/HabitHeatmap'), { ssr: false });

type TimeRange = '7d' | '30d' | '90d' | 'all';
type ViewTab = 'overview' | 'habits' | 'tasks' | 'focus';

export default function AnalyticsPage() {
    const habits = useAppStore((state) => state.habits);
    const tasks = useAppStore((state) => state.tasks);
    const focusSessions = useAppStore((state) => state.focusSessions);
    const user = useAppStore((state) => state.user);

    const [timeRange, setTimeRange] = useState<TimeRange>('30d');
    const [activeTab, setActiveTab] = useState<ViewTab>('overview');

    // Calculate stats
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const totalHabitCompletions = habits.reduce(
        (sum, habit) => sum + (habit.completedDates?.length || 0),
        0
    );

    const totalFocusHours = Math.round(
        focusSessions.reduce((sum, s) => sum + (s.actualDurationMin || 0), 0) / 60
    );

    // Generate chart data
    const xpData = generateXPProgression(12);
    const productivityData = generateProductivityByHour(focusSessions);
    const categoryData = generateCategoryBreakdown(habits);

    // Calculate percentages for category data
    const totalHabits = categoryData.reduce((sum, cat) => sum + cat.value, 0);
    const categoryDataWithPercentages = categoryData.map((cat) => ({
        ...cat,
        percentage: totalHabits > 0 ? Math.round((cat.value / totalHabits) * 100) : 0,
    }));

    const handleExport = (format: 'pdf' | 'csv' | 'image') => {
        // Mock export functionality - would integrate jsPDF or similar
        console.log(`Exporting analytics as ${format}`);
        alert(`Export as ${format.toUpperCase()} feature ready for backend integration`);
    };

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            <FiBarChart2 /> Analytics Dashboard
                        </h1>
                        <p className={styles.subtitle}>
                            Comprehensive insights into your productivity journey
                        </p>
                    </div>
                    <div className={styles.headerActions}>
                        <Button
                            variant="ghost"
                            size="small"
                            icon={<FiDownload />}
                            onClick={() => handleExport('pdf')}
                        >
                            Export PDF
                        </Button>
                    </div>
                </header>

                {/* Time Range Selector */}
                <div className={styles.controls}>
                    <div className={styles.tabs}>
                        {(['overview', 'habits', 'tasks', 'focus'] as ViewTab[]).map((tab) => (
                            <button
                                key={tab}
                                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className={styles.timeRangeSelector}>
                        {(['7d', '30d', '90d', 'all'] as TimeRange[]).map((range) => (
                            <button
                                key={range}
                                className={`${styles.rangeButton} ${timeRange === range ? styles.rangeButtonActive : ''
                                    }`}
                                onClick={() => setTimeRange(range)}
                            >
                                {range === 'all' ? 'All Time' : range.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Summary Stats */}
                        <div className={styles.statsGrid}>
                            <Card>
                                <CardContent>
                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FiTrendingUp />
                                        </div>
                                        <div className={styles.statContent}>
                                            <p className={styles.statLabel}>Total XP Earned</p>
                                            <h3 className={styles.statValue}>{user.xp.toLocaleString()}</h3>
                                            <p className={styles.statChange}>+12% from last month</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FiCalendar />
                                        </div>
                                        <div className={styles.statContent}>
                                            <p className={styles.statLabel}>Hab it Completions</p>
                                            <h3 className={styles.statValue}>{totalHabitCompletions}</h3>
                                            <p className={styles.statChange}>Across {habits.length} habits</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FiClock />
                                        </div>
                                        <div className={styles.statContent}>
                                            <p className={styles.statLabel}>Focus Time</p>
                                            <h3 className={styles.statValue}>{totalFocusHours}h</h3>
                                            <p className={styles.statChange}>{focusSessions.length} sessions</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent>
                                    <div className={styles.statCard}>
                                        <div className={styles.statIcon}>
                                            <FiPieChart />
                                        </div>
                                        <div className={styles.statContent}>
                                            <p className={styles.statLabel}>Task Completion</p>
                                            <h3 className={styles.statValue}>{taskCompletionRate}%</h3>
                                            <p className={styles.statChange}>
                                                {completedTasks}/{totalTasks} tasks
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* XP Progression Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>XP Progression (Last 12 Weeks)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.chartContainer}>
                                    <AreaChart data={xpData} dataKey="xp" xKey="date" color="#ff6b35" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Category Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Habit Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.chartContainer}>
                                    <PieChart data={categoryDataWithPercentages} />
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Habits Tab */}
                {activeTab === 'habits' && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Habit Completion Heatmap</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.heatmapContainer}>
                                    {habits.slice(0, 3).map((habit) => {
                                        const heatmapData = generateHabitHeatmapData(
                                            habit.completedDates || [],
                                            90
                                        );
                                        return (
                                            <div key={habit.id} className={styles.habitHeatmap}>
                                                <h4 className={styles.habitName}>{habit.title}</h4>
                                                <HabitHeatmap data={heatmapData} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Focus Tab */}
                {activeTab === 'focus' && (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Productivity by Time of Day</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.chartContainer}>
                                    <BarChart
                                        data={productivityData.filter((d) => d.sessions > 0)}
                                        dataKey="sessions"
                                        xKey="label"
                                        color="#ff6b35"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Tasks Tab */}
                {activeTab === 'tasks' && (
                    <>
                        <Card>
                            <CardContent>
                                <div className={styles.emptyState}>
                                    <FiBarChart2 className={styles.emptyIcon} />
                                    <h3>Task Analytics Coming Soon</h3>
                                    <p>Detailed task completion trends and project breakdowns</p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </AppShell>
    );
}
