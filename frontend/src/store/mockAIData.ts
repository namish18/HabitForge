import { AIInsight, HabitPrediction } from '../lib/types';

// Mock AI Insights Data
export const mockAIInsights: AIInsight[] = [
    {
        id: 'insight-1',
        type: 'timing',
        habitId: 'habit-1',
        title: 'Optimal Time for Morning Meditation',
        description: 'Based on your completion patterns, you\'re 73% more likely to complete meditation at 7:00 AM',
        confidence: 87,
        recommendation: 'Reschedule your meditation reminder to 7:00 AM',
        reasoning: [
            'You complete morning habits 73% more at 7:00 AM vs current 7:30 AM',
            'Your energy levels peak between 6:45-7:15 AM based on activity patterns',
            'Weekday completion rate is highest when started before 7:15 AM',
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
    },
    {
        id: 'insight-2',
        type: 'stacking',
        habitId: 'habit-2',
        title: 'Powerful Habit Stack Opportunity',
        description: 'Pair "Read for 30 Minutes" with "Morning Meditation" for a 2.1x success boost',
        confidence: 92,
        recommendation: 'Stack reading immediately after meditation',
        reasoning: [
            'Both habits have 90%+ completion when done in morning time block',
            'Users who stack these habits show 2.1x higher consistency',
            'Mental clarity from meditation enhances reading comprehension',
            'Creates a powerful morning routine ritual',
        ],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
    },
    {
        id: 'insight-3',
        type: 'risk',
        habitId: 'habit-4',
        title: 'Workout Habit at Risk',
        description: 'Your workout habit shows declining pattern - 68% chance of streak break in next 7 days',
        confidence: 75,
        recommendation: 'Implement the 2-minute version: "Just do 10 jumping jacks"',
        reasoning: [
            'Completion rate dropped from 85% to 45% over past 2 weeks',
            'Missing 2 consecutive sessions correlates with full drop-off',
            'Weather patterns show correlation with skipped workouts',
            'Pre-commitment to 2-minute version maintains streak psychology',
        ],
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        status: 'active',
    },
    {
        id: 'insight-4',
        type: 'optimization',
        title: 'Level Up Your Productivity',
        description: 'You could earn 340 more XP this week by optimizing habit timing',
        confidence: 81,
        recommendation: 'Shift 2 habits to your peak performance windows',
        reasoning: [
            'Your peak productivity is 9:00-11:00 AM and 2:00-4:00 PM',
            'Habits completed during peak times have 94% success rate vs 67% off-peak',
            'Time-blocking these windows for habits maximizes completion',
            'Estimated XP gain: 340 per week from improved consistency',
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
    },
];

// Mock Habit Predictions Data
export const mockHabitPredictions: HabitPrediction[] = [
    {
        habitId: 'habit-1',
        riskLevel: 'low',
        successProbability: 89,
        optimalTime: '07:00',
        stackingSuggestions: [
            {
                habitId: 'habit-2',
                reason: 'Both thrive in morning mental clarity window',
                confidence: 92,
            },
        ],
        insights: [
            'Strongest habit in your routine',
            '7-day streak indicates solid commitment',
            'Morning time slot has 95% completion rate',
        ],
    },
    {
        habitId: 'habit-2',
        riskLevel: 'low',
        successProbability: 82,
        optimalTime: '21:00',
        stackingSuggestions: [
            {
                habitId: 'habit-1',
                reason: 'Creates powerful bookend routine (morning + evening)',
                confidence: 85,
            },
        ],
        insights: [
            'Evening habits show consistent pattern',
            'Temptation bundling with podcast is effective',
            'Weekend completion rate matches weekdays',
        ],
    },
    {
        habitId: 'habit-3',
        riskLevel: 'medium',
        successProbability: 58,
        optimalTime: '09:00',
        stackingSuggestions: [],
        insights: [
            'Break habits require different strategy than build habits',
            'Environment design is key - consider app blockers',
            'Replacement habit needed for sustainable change',
        ],
    },
    {
        habitId: 'habit-4',
        riskLevel: 'high',
        successProbability: 42,
        optimalTime: '18:00',
        stackingSuggestions: [
            {
                habitId: 'habit-1',
                reason: 'Meditation reduces resistance to workout',
                confidence: 67,
            },
        ],
        insights: [
            'Recent decline in completion rate',
            'Weather correlation detected - have indoor backup',
            'Consider reducing friction with 2-minute version',
            'Habit stacking could improve consistency by 35%',
        ],
    },
];
