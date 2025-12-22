'use client';

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
    data: any[];
    dataKey: string;
    xKey: string;
    color?: string;
}

export default function AreaChart({ data, dataKey, xKey, color = '#ff6b35' }: AreaChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                    dataKey={xKey}
                    stroke="#a8a8aa"
                    style={{ fontSize: '0.75rem' }}
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
                <Area
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                />
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
}
