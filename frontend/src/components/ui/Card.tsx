import React from 'react';
import styles from './Card.module.css';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'glass' | 'elevated' | 'bordered' | 'glow';
    interactive?: boolean;
    children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'glass', interactive = false, className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    styles.card,
                    variant !== 'glass' && styles[variant],
                    interactive && styles.interactive,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
    return <div className={clsx(styles.header, className)}>{children}</div>;
};

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
    return <h3 className={clsx(styles.title, className)}>{children}</h3>;
};

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
    return <p className={clsx(styles.description, className)}>{children}</p>;
};

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
    return <div className={clsx(styles.content, className)}>{children}</div>;
};

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
    return <div className={clsx(styles.footer, className)}>{children}</div>;
};
