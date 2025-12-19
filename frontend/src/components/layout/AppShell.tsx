'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AppShell.module.css';
import clsx from 'clsx';
import { useAppStore } from '@/store/useAppStore';
import {
    FiHome,
    FiTarget,
    FiCheckSquare,
    FiCompass,
    FiTrendingUp,
    FiCrosshair,
    FiUsers,
    FiBarChart2,
    FiUser,
    FiSettings,
    FiSearch,
    FiPlus,
    FiBell,
    FiMenu,
    FiX,
} from 'react-icons/fi';
import { Button } from '../ui/Button';

interface NavLinkItem {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const navLinks: NavLinkItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { href: '/habits', label: 'Habits', icon: <FiTarget /> },
    { href: '/tasks', label: 'Tasks', icon: <FiCheckSquare /> },
    { href: '/quests', label: 'Quests', icon: <FiCompass /> },
    { href: '/leaderboard', label: 'Leaderboard', icon: <FiTrendingUp /> },
    { href: '/focus', label: 'Focus', icon: <FiCrosshair /> },
    { href: '/accountability', label: 'Accountability', icon: <FiUsers /> },
    { href: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
    { href: '/profile', label: 'Profile', icon: <FiUser /> },
    { href: '/settings', label: 'Settings', icon: <FiSettings /> },
];

interface AppShellProps {
    children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
    const pathname = usePathname();
    const user = useAppStore((state) => state.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={styles.shell}>
            {/* Sidebar */}
            <aside
                className={clsx(
                    styles.sidebar,
                    sidebarOpen && styles.sidebarOpen,
                    isCollapsed && !isHovered && styles.sidebarCollapsed
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>HF</div>
                        <span>HabitForge</span>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                styles.navLink,
                                pathname === link.href && styles.navLinkActive
                            )}
                        >
                            <span className={styles.navIcon}>{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className={styles.main}>
                {/* Topbar */}
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <button
                            className={styles.mobileMenuButton}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <FiX /> : <FiMenu />}
                        </button>
                        <input
                            type="text"
                            placeholder="Search habits, tasks, quests..."
                            className={styles.search}
                        />
                    </div>

                    <div className={styles.topbarRight}>
                        <Button variant="primary" size="small" icon={<FiPlus />}>
                            Quick Add
                        </Button>

                        <button className={styles.iconButton}>
                            <FiBell />
                        </button>

                        <button className={styles.userMenu}>
                            <div className={styles.avatar}>{user.avatar}</div>
                            <span className={styles.userName}>{user.name}</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    );
};
