import { format, startOfWeek, endOfWeek, eachDayOfInterval, subDays, subWeeks } from 'date-fns';

// Helper to generate heatmap data for habit completions
export function generateHabitHeatmapData(completedDates: string[], daysToShow: number = 90) {
    const endDate = new Date();
    const startDate = subDays(endDate, daysToShow);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const completed = completedDates.includes(dateStr);
        return {
            date: dateStr,
            count: completed ? 1 : 0,
            day: format(day, 'EEE'),
            month: format(day, 'MMM'),
        };
    });
}

// Helper to generate productivity by hour data
export function generateProductivityByHour(focusSessions: any[]) {
    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        label: `${hour.toString().padStart(2, '0')}:00`,
        sessions: 0,
        totalMinutes: 0,
    }));

    focusSessions.forEach((session) => {
        if (session.completedAt) {
            const hour = new Date(session.startAt).getHours();
            hourlyData[hour].sessions += 1;
            hourlyData[hour].totalMinutes += session.actualDurationMin || 0;
        }
    });

    return hourlyData;
}

// Helper to generate category breakdown
export function generateCategoryBreakdown(habits: any[]) {
    const categories: Record<string, number> = {};

    habits.forEach((habit) => {
        const tag = habit.tags?.[0] || 'uncategorized';
        categories[tag] = (categories[tag] || 0) + 1;
    });

    return Object.entries(categories).map(([name, value]) => ({
        name,
        value,
        percentage: 0, // Will be calculated in component
    }));
}

// Helper to generate XP progression over time
export function generateXPProgression(weeks: number = 12) {
    const data = [];
    const now = Date.now();

    for (let i = weeks; i >= 0; i--) {
        const weekStart = new Date(now - i * 7 * 24 * 60 * 60 * 1000);
        // Simulate progressive XP growth
        const baseXP = 100;
        const growth = (weeks - i) * 50;
        const randomVariation = Math.random() * 100;

        data.push({
            date: format(weekStart, 'MMM dd'),
            xp: baseXP + growth + randomVariation,
            week: `Week ${weeks - i + 1}`,
        });
    }

    return data;
}

// Helper to calculate streak calendar data
export function generateStreakCalendar(completedDates: string[], startDate: Date, endDate: Date) {
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isCompleted = completedDates.includes(dateStr);

        return {
            date: dateStr,
            value: isCompleted ? 1 : 0,
            day: format(day, 'd'),
            month: format(day, 'MMM'),
            weekday: format(day, 'EEE'),
        };
    });
}

// Year-in-review summary calculations
export function calculateYearInReview(user: any, habits: any[], tasks: any[], quests: any[], focusSessions: any[]) {
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const completedQuests = quests.filter((q) => q.status === 'completed').length;

    const totalHabitCompletions = habits.reduce(
        (sum, habit) => sum + (habit.completedDates?.length || 0),
        0
    );

    const totalFocusMinutes = focusSessions.reduce(
        (sum, session) => sum + (session.actualDurationMin || 0),
        0
    );

    const longestStreak = Math.max(...habits.map((h) => h.streak || 0), 0);

    return {
        totalHabitsCompleted: totalHabitCompletions,
        totalTasksCompleted: completedTasks,
        totalQuestsCompleted: completedQuests,
        totalFocusHours: Math.round(totalFocusMinutes / 60),
        longestStreak,
        currentLevel: user.level,
        totalXP: user.xp,
        streakDays: user.streakDays,
    };
}
