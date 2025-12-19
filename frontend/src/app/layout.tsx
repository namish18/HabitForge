import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'HabitForge - Gamified Habit Tracker',
    description: 'Build better habits with gamification based on Atomic Habits Four Laws',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
