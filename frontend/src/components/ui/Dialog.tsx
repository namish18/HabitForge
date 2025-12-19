'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import styles from './Dialog.module.css';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children }) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    <button className={styles.closeButton} onClick={onClose}>
                        <FiX />
                    </button>
                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body
    );
};
