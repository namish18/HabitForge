'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Dialog } from '@/components/ui/Dialog';
import { useAppStore } from '@/store/useAppStore';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { Task } from '@/lib/types';
import styles from './tasks.module.css';

export default function TasksPage() {
    const tasks = useAppStore((state) => state.tasks);
    const addTask = useAppStore((state) => state.addTask);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        project: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        estMinutes: '',
    });

    const todoTasks = tasks.filter((t) => t.status === 'todo');
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
    const completedTasks = tasks.filter((t) => t.status === 'completed');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        const newTask: Task = {
            id: `task-${Date.now()}`,
            title: formData.title,
            description: formData.description || undefined,
            project: formData.project || undefined,
            priority: formData.priority,
            status: 'todo',
            tags: [],
            createdAt: new Date().toISOString(),
            estMinutes: formData.estMinutes ? parseInt(formData.estMinutes) : undefined,
        };

        addTask(newTask);
        setIsDialogOpen(false);
        setFormData({
            title: '',
            description: '',
            project: '',
            priority: 'medium',
            estMinutes: '',
        });
    };

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
                        <Button icon={<FiPlus />} onClick={() => setIsDialogOpen(true)}>
                            New Task
                        </Button>
                    </div>
                </header>

                <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Create New Task">
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title" className={styles.label}>Task Title *</label>
                            <input
                                id="title"
                                type="text"
                                className={styles.input}
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter task title"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description" className={styles.label}>Description</label>
                            <textarea
                                id="description"
                                className={styles.textarea}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Add task description"
                                rows={3}
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="project" className={styles.label}>Project</label>
                                <input
                                    id="project"
                                    type="text"
                                    className={styles.input}
                                    value={formData.project}
                                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                    placeholder="e.g. Personal"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="estMinutes" className={styles.label}>Duration (min)</label>
                                <input
                                    id="estMinutes"
                                    type="number"
                                    className={styles.input}
                                    value={formData.estMinutes}
                                    onChange={(e) => setFormData({ ...formData, estMinutes: e.target.value })}
                                    placeholder="30"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Priority</label>
                            <div className={styles.priorityButtons}>
                                {(['low', 'medium', 'high'] as const).map((priority) => (
                                    <button
                                        key={priority}
                                        type="button"
                                        className={`${styles.priorityButton} ${formData.priority === priority ? styles.priorityButtonActive : ''}`}
                                        onClick={() => setFormData({ ...formData, priority })}
                                    >
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Create Task
                            </Button>
                        </div>
                    </form>
                </Dialog>

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
