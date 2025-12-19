'use client';

import { AppShell } from '@/components/layout/AppShell';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { FiPlus, FiFilter } from 'react-icons/fi';
import styles from './tasks.module.css';

export default function TasksPage() {
    const tasks = useAppStore((state) => state.tasks);

    const todoTasks = tasks.filter((t) => t.status === 'todo');
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
    const completedTasks = tasks.filter((t) => t.status === 'completed');

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Tasks</h1>
                        <p className={styles.subtitle}>
                            Manage your tasks and projects
                        </p>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="ghost" icon={<FiFilter />}>
                            Filter
                        </Button>
                        <Button icon={<FiPlus />}>
                            New Task
                        </Button>
                    </div>
                </header>

                <div className={styles.stats}>
                    <Badge variant="default" size="large">
                        {todoTasks.length} To Do
                    </Badge>
                    <Badge variant="primary" size="large">
                        {inProgressTasks.length} In Progress
                    </Badge>
                    <Badge variant="success" size="large">
                        {completedTasks.length} Completed
                    </Badge>
                </div>

                {/* In Progress */}
                {inProgressTasks.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>In Progress</h2>
                        <div className={styles.taskGrid}>
                            {inProgressTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </section>
                )}

                {/* To Do */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>To Do</h2>
                    <div className={styles.taskGrid}>
                        {todoTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </section>

                {/* Completed */}
                {completedTasks.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Completed</h2>
                        <div className={styles.taskGrid}>
                            {completedTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppShell>
    );
}
