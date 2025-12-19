import React from 'react';
import styles from './Badge.module.css';
import clsx from 'clsx';

interface BadgeProps {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    variant = 'default',
    size = 'medium',
    icon,
    children,
    className,
}) => {
    return (
        <span
            className={clsx(
                styles.badge,
                styles[variant],
                size !== 'medium' && styles[size],
                className
            )}
        >
            {icon && icon}
            {children}
        </span>
    );
};
