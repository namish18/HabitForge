'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
    data: any[];
    dataKey: string;
    xKey: string;
    color?: string;
}

export default function BarChart({ data, dataKey, xKey, color = '#ff6b35' }: BarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                    dataKey={xKey}
                    stroke="#a8a8aa"
                    style={{ fontSize: '0.75rem' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                />
                <YAxis stroke="#a8a8aa" style={{ fontSize: '0.75rem' }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#222226',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#ffffff',
                    }}
                />
                <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}
