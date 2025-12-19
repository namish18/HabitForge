'use client';

import React from 'react';
import styles from './TaskCard.module.css';
import clsx from 'clsx';
import { Task } from '@/lib/types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { FiCheck, FiCalendar, FiClock, FiFolder } from 'react-icons/fi';
import { useAppStore } from '@/store/useAppStore';
import { format } from 'date-fns';

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const completeTask = useAppStore((state) => state.completeTask);
    const updateTask = useAppStore((state) => state.updateTask);

    const handleComplete = () => {
        completeTask(task.id);
    };

    const handleStart = () => {
        updateTask(task.id, { status: 'in-progress' });
    };

    const priorityVariant = {
        low: 'default' as const,
        medium: 'warning' as const,
        high: 'error' as const,
    };

    return (
        <div
            className={clsx(
                styles.taskCard,
                task.status === 'completed' && styles.completed,
                task.status === 'in-progress' && styles.inProgress,
                task.status === 'todo' && styles.todo
            )}
        >
            <div className={styles.taskHeader}>
                <div className={styles.taskInfo}>
                    <h3 className={styles.taskTitle}>{task.title}</h3>
                    {task.description && (
                        <p className={styles.taskDescription}>{task.description}</p>
                    )}
                    <div className={styles.taskMeta}>
                        {task.project && (
                            <div className={styles.metaItem}>
                                <FiFolder className={styles.metaIcon} />
                                {task.project}
                            </div>
                        )}
                        {task.dueDate && (
                            <div className={styles.metaItem}>
                                <FiCalendar className={styles.metaIcon} />
                                {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </div>
                        )}
                        {task.estMinutes && (
                            <div className={styles.metaItem}>
                                <FiClock className={styles.metaIcon} />
                                {task.estMinutes} min
                            </div>
                        )}
                        <Badge variant={priorityVariant[task.priority]} size="small">
                            {task.priority}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className={styles.taskActions}>
                {task.status !== 'completed' && (
                    <>
                        <Button
                            variant="primary"
                            fullWidth
                            icon={<FiCheck />}
                            onClick={handleComplete}
                        >
                            Complete
                        </Button>
                        {task.status === 'todo' && (
                            <Button variant="ghost" onClick={handleStart}>
                                Start
                            </Button>
                        )}
                    </>
                )}
                {task.status === 'completed' && (
                    <Badge variant="success" size="large">
                        Completed
                    </Badge>
                )}
            </div>
        </div>
    );
};
