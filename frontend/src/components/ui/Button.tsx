import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'medium',
            fullWidth = false,
            icon,
            iconPosition = 'left',
            className,
            children,
            ...props
        },
        ref
    ) => {
        const isIconOnly = icon && !children;

        return (
            <button
                ref={ref}
                className={clsx(
                    styles.button,
                    styles[variant],
                    styles[size],
                    fullWidth && styles.fullWidth,
                    isIconOnly && styles.iconOnly,
                    className
                )}
                {...props}
            >
                {icon && iconPosition === 'left' && icon}
                {children}
                {icon && iconPosition === 'right' && icon}
            </button>
        );
    }
);

Button.displayName = 'Button';
