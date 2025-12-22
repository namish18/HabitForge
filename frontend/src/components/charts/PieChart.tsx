'use client';

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PieChartProps {
    data: { name: string; value: number; percentage: number }[];
}

const COLORS = ['#ff6b35', '#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ef4444'];

export default function PieChart({ data }: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#222226',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                    }}
                />
                <Legend
                    wrapperStyle={{
                        fontSize: '0.875rem',
                        color: '#a8a8aa',
                    }}
                />
            </RechartsPieChart>
        </ResponsiveContainer>
    );
}
