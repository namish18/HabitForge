'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import {
    FiBell,
    FiCheck,
    FiX,
    FiVolume2,
    FiSmartphone,
    FiMoon,
    FiMapPin,
    FiClock,
    FiBellOff,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import styles from './notifications.module.css';
import {
    requestNotificationPermission,
    sendTestNotification,
    getNotificationStatus,
    registerServiceWorker,
} from '@/lib/notifications';

export default function NotificationsSettingsPage() {
    const habits = useAppStore((state) => state.habits);
    const [notificationStatus, setNotificationStatus] = useState({
        supported: false,
        permission: 'default' as NotificationPermission,
        serviceWorkerReady: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Mock preferences (in production these would come from store)
    const [preferences, setPreferences] = useState({
        enabled: true,
        soundEnabled: true,
        vibrationEnabled: true,
        badgeEnabled: true,
        contextAware: true,
        quietHours: { start: '22:00', end: '07:00' },
    });

    useEffect(() => {
        const status = getNotificationStatus();
        setNotificationStatus(status);
        setIsLoading(false);

        // Register service worker
        if (status.supported) {
            registerServiceWorker();
        }
    }, []);

    const handleRequestPermission = async () => {
        const permission = await requestNotificationPermission();
        setNotificationStatus((prev) => ({ ...prev, permission }));
    };

    const handleTestNotification = async () => {
        await sendTestNotification();
    };

    const togglePreference = (key: keyof typeof preferences) => {
        if (typeof preferences[key] === 'boolean') {
            setPreferences((prev) => ({
                ...prev,
                [key]: !prev[key as keyof typeof prev],
            }));
        }
    };

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            <FiBell /> Notifications
                        </h1>
                        <p className={styles.subtitle}>
                            Configure smart reminders and context-aware notifications
                        </p>
                    </div>
                </header>

                {/* Permission Status */}
                <Card>
                    <CardContent>
                        <div className={styles.permissionSection}>
                            <div className={styles.permissionInfo}>
                                <div className={styles.permissionIcon}>
                                    {notificationStatus.permission === 'granted' ? (
                                        <FiCheck />
                                    ) : (
                                        <FiBellOff />
                                    )}
                                </div>
                                <div>
                                    <h3 className={styles.permissionTitle}>
                                        Notification Permission
                                    </h3>
                                    <p className={styles.permissionStatus}>
                                        Status:{' '}
                                        <Badge
                                            variant={
                                                notificationStatus.permission === 'granted'
                                                    ? 'success'
                                                    : 'default'
                                            }
                                        >
                                            {notificationStatus.permission}
                                        </Badge>
                                    </p>
                                    {!notificationStatus.supported && (
                                        <p className={styles.warning}>
                                            ⚠️ Notifications not supported on this browser
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={styles.permissionActions}>
                                {notificationStatus.permission !== 'granted' && (
                                    <Button
                                        onClick={handleRequestPermission}
                                        disabled={!notificationStatus.supported}
                                    >
                                        Enable Notifications
                                    </Button>
                                )}
                                {notificationStatus.permission === 'granted' && (
                                    <Button variant="ghost" onClick={handleTestNotification}>
                                        Send Test Notification
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Global Preferences */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Notification Settings</h2>
                    <Card>
                        <CardContent>
                            <div className={styles.preferencesList}>
                                <div className={styles.preferenceItem}>
                                    <div className={styles.preferenceLabel}>
                                        <FiBell />
                                        <div>
                                            <h4>Enable Notifications</h4>
                                            <p>Receive habit reminders and updates</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${preferences.enabled ? styles.toggleActive : ''
                                            }`}
                                        onClick={() => togglePreference('enabled')}
                                    >
                                        <span className={styles.toggleThumb} />
                                    </button>
                                </div>

                                <div className={styles.preferenceItem}>
                                    <div className={styles.preferenceLabel}>
                                        <FiVolume2 />
                                        <div>
                                            <h4>Sound</h4>
                                            <p>Play sound with notifications</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${preferences.soundEnabled ? styles.toggleActive : ''
                                            }`}
                                        onClick={() => togglePreference('soundEnabled')}
                                    >
                                        <span className={styles.toggleThumb} />
                                    </button>
                                </div>

                                <div className={styles.preferenceItem}>
                                    <div className={styles.preferenceLabel}>
                                        <FiSmartphone />
                                        <div>
                                            <h4>Vibration</h4>
                                            <p>Vibrate on notification (mobile)</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${preferences.vibrationEnabled ? styles.toggleActive : ''
                                            }`}
                                        onClick={() => togglePreference('vibrationEnabled')}
                                    >
                                        <span className={styles.toggleThumb} />
                                    </button>
                                </div>

                                <div className={styles.preferenceItem}>
                                    <div className={styles.preferenceLabel}>
                                        <FiMapPin />
                                        <div>
                                            <h4>Context-Aware</h4>
                                            <p>Smart timing based on your location and activity</p>
                                        </div>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${preferences.contextAware ? styles.toggleActive : ''
                                            }`}
                                        onClick={() => togglePreference('contextAware')}
                                    >
                                        <span className={styles.toggleThumb} />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Quiet Hours */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Quiet Hours</h2>
                    <Card>
                        <CardContent>
                            <div className={styles.quietHours}>
                                <div className={styles.quietHoursInfo}>
                                    <FiMoon />
                                    <p>No notifications during these hours</p>
                                </div>
                                <div className={styles.timeInputs}>
                                    <div className={styles.timeInput}>
                                        <label>Start</label>
                                        <input
                                            type="time"
                                            value={preferences.quietHours.start}
                                            onChange={(e) =>
                                                setPreferences((p) => ({
                                                    ...p,
                                                    quietHours: {
                                                        ...p.quietHours,
                                                        start: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                    <span className={styles.timeSeparator}>to</span>
                                    <div className={styles.timeInput}>
                                        <label>End</label>
                                        <input
                                            type="time"
                                            value={preferences.quietHours.end}
                                            onChange={(e) =>
                                                setPreferences((p) => ({
                                                    ...p,
                                                    quietHours: {
                                                        ...p.quietHours,
                                                        end: e.target.value,
                                                    },
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Habit Reminders */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Habit Reminders</h2>
                    <div className={styles.habitsGrid}>
                        {habits.slice(0, 4).map((habit) => (
                            <Card key={habit.id}>
                                <CardContent>
                                    <div className={styles.habitReminder}>
                                        <div className={styles.habitInfo}>
                                            <h4>{habit.title}</h4>
                                            <div className={styles.reminderTime}>
                                                <FiClock />
                                                <span>Daily at 09:00</span>
                                            </div>
                                        </div>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* PWA Info */}
                {notificationStatus.serviceWorkerReady && (
                    <Card>
                        <CardContent>
                            <div className={styles.pwaInfo}>
                                <FiCheck className={styles.pwaIcon} />
                                <div>
                                    <h4>Progressive Web App Active</h4>
                                    <p>
                                        Background notifications and offline support are enabled
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}
