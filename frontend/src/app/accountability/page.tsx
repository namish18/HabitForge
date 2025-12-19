'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/Card';
import styles from '../habits/habits.module.css';

export default function AccountabilityPage() {
    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Accountability</h1>
                        <p className={styles.subtitle}>
                            Partner commitments and team visibility
                        </p>
                    </div>
                </header>

                <Card>
                    <CardContent>
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            Accountability features coming soon. Connect with partners and track shared commitments.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
