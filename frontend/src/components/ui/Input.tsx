import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className={styles.inputGroup}>
                {label && <label className={styles.label}>{label}</label>}
                <input ref={ref} className={clsx(styles.input, className)} {...props} />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className={styles.inputGroup}>
                {label && <label className={styles.label}>{label}</label>}
                <textarea
                    ref={ref}
                    className={clsx(styles.input, styles.textarea, className)}
                    {...props}
                />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
