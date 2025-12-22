'use client';

import styles from './HabitHeatmap.module.css';

interface HeatmapData {
    date: string;
    count: number;
    day: string;
    month: string;
}

interface HabitHeatmapProps {
    data: HeatmapData[];
}

export default function HabitHeatmap({ data }: HabitHeatmapProps) {
    return (
        <div className={styles.heatmap}>
            <div className={styles.grid}>
                {data.map((day, index) => {
                    const intensity = day.count > 0 ? 'completed' : 'empty';
                    return (
                        <div
                            key={day.date}
                            className={`${styles.cell} ${styles[intensity]}`}
                            title={`${day.date}: ${day.count > 0 ? 'Completed' : 'Not completed'}`}
                        >
                            <span className={styles.cellTooltip}>{day.day}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
