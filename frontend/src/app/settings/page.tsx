'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppStore } from '@/store/useAppStore';
import { FiUser, FiBell, FiLock, FiDatabase, FiDownload, FiUpload } from 'react-icons/fi';
import styles from './settings.module.css';

export default function SettingsPage() {
    const user = useAppStore((state) => state.user);
    const togglePrivacySetting = useAppStore((state) => state.togglePrivacySetting);
    const resetData = useAppStore((state) => state.resetData);

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all demo data? This will reload the default mock data.')) {
            resetData();
            alert('Demo data has been reset!');
        }
    };

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Settings</h1>
                    <p className={styles.subtitle}>Manage your preferences and data</p>
                </header>

                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <div className={styles.cardHeaderIcon}>
                            <FiUser />
                            <CardTitle>Profile</CardTitle>
                        </div>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.formGroup}>
                            <Input
                                label="Display Name"
                                type="text"
                                defaultValue={user.name}
                                placeholder="Your name"
                            />
                            <Input
                                label="Avatar Initials"
                                type="text"
                                defaultValue={user.avatar}
                                maxLength={2}
                                placeholder="AB"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className={styles.cardHeaderIcon}>
                            <FiBell />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>Manage how you receive reminders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.settingRow}>
                            <div>
                                <p className={styles.settingLabel}>Email Notifications</p>
                                <p className={styles.settingDescription}>Receive habit reminders via email</p>
                            </div>
                            <Button variant="outline" size="small">
                                Configure
                            </Button>
                        </div>
                        <div className={styles.settingRow}>
                            <div>
                                <p className={styles.settingLabel}>Push Notifications</p>
                                <p className={styles.settingDescription}>Browser push notifications</p>
                            </div>
                            <Button variant="outline" size="small">
                                Enable
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                    <CardHeader>
                        <div className={styles.cardHeaderIcon}>
                            <FiLock />
                            <CardTitle>Privacy</CardTitle>
                        </div>
                        <CardDescription>Control your visibility and data sharing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.settingRow}>
                            <div>
                                <p className={styles.settingLabel}>Show on Leaderboard</p>
                                <p className={styles.settingDescription}>
                                    Allow others to see your ranking
                                </p>
                            </div>
                            <Button
                                variant={user.privacySettings.showOnLeaderboard ? 'success' : 'ghost'}
                                size="small"
                                onClick={() => togglePrivacySetting('showOnLeaderboard')}
                            >
                                {user.privacySettings.showOnLeaderboard ? 'Enabled' : 'Disabled'}
                            </Button>
                        </div>
                        <div className={styles.settingRow}>
                            <div>
                                <p className={styles.settingLabel}>Allow Team Invites</p>
                                <p className={styles.settingDescription}>
                                    Let others invite you to teams
                                </p>
                            </div>
                            <Button
                                variant={user.privacySettings.allowTeamInvites ? 'success' : 'ghost'}
                                size="small"
                                onClick={() => togglePrivacySetting('allowTeamInvites')}
                            >
                                {user.privacySettings.allowTeamInvites ? 'Enabled' : 'Disabled'}
                            </Button>
                        </div>
                        <div className={styles.settingRow}>
                            <div>
                                <p className={styles.settingLabel}>Share Completion Stats</p>
                                <p className={styles.settingDescription}>
                                    Share your habit completion with friends
                                </p>
                            </div>
                            <Button
                                variant={user.privacySettings.shareCompletionStats ? 'success' : 'ghost'}
                                size="small"
                                onClick={() => togglePrivacySetting('shareCompletionStats')}
                            >
                                {user.privacySettings.shareCompletionStats ? 'Enabled' : 'Disabled'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Management */}
                <Card>
                    <CardHeader>
                        <div className={styles.cardHeaderIcon}>
                            <FiDatabase />
                            <CardTitle>Data Management</CardTitle>
                        </div>
                        <CardDescription>Export, import, or reset your data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.actionButtons}>
                            <Button variant="outline" icon={<FiDownload />}>
                                Export Data (JSON)
                            </Button>
                            <Button variant="outline" icon={<FiUpload />}>
                                Import Data
                            </Button>
                            <Button variant="danger" onClick={handleReset}>
                                Reset Demo Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
