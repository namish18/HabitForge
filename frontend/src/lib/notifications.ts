// Notification utility functions for HabitForge

export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return 'denied';
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission;
    }

    return Notification.permission;
}

export function checkNotificationSupport(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
        console.warn('Service workers not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
        });
        console.log('Service Worker registered:', registration);
        return registration;
    } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
    }
}

export async function sendTestNotification(): Promise<void> {
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
        alert('Please enable notifications to use this feature');
        return;
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Use service worker to show notification
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification('HabitForge Test', {
            body: 'This is a test notification from HabitForge!',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            vibrate: [200, 100, 200],
            tag: 'test-notification',
        });
    } else {
        // Fallback to basic notification
        new Notification('HabitForge Test', {
            body: 'This is a test notification from HabitForge!',
            icon: '/icon-192.png',
        });
    }
}

export async function scheduleNotification(
    title: string,
    body: string,
    scheduledTime: Date,
    tag?: string
): Promise<void> {
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
        console.warn('Notification permission not granted');
        return;
    }

    const delay = scheduledTime.getTime() - Date.now();

    if (delay < 0) {
        console.warn('Scheduled time is in the past');
        return;
    }

    setTimeout(async () => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            const registration = await navigator.serviceWorker.ready;
            await registration.showNotification(title, {
                body,
                icon: '/icon-192.png',
                badge: '/icon-192.png',
                tag: tag || 'scheduled-notification',
                requireInteraction: true,
                vibrate: [200, 100, 200],
            });
        } else {
            new Notification(title, {
                body,
                icon: '/icon-192.png',
                tag: tag || 'scheduled-notification',
            });
        }
    }, delay);
}

export function getNotificationStatus(): {
    supported: boolean;
    permission: NotificationPermission;
    serviceWorkerReady: boolean;
} {
    const supported = checkNotificationSupport();
    const permission = supported ? Notification.permission : 'denied';
    const serviceWorkerReady = 'serviceWorker' in navigator && !!navigator.serviceWorker.controller;

    return {
        supported,
        permission,
        serviceWorkerReady,
    };
}

export async function unregisterServiceWorker(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
        return false;
    }

    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
        return await registration.unregister();
    }

    return false;
}

// Context-aware notification helpers
export function shouldShowNotification(quietHours?: { start: string; end: string }): boolean {
    if (!quietHours) return true;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = quietHours.start.split(':').map(Number);
    const [endHour, endMin] = quietHours.end.split(':').map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    if (startTime <= endTime) {
        // Same day range
        return currentTime < startTime || currentTime >= endTime;
    } else {
        // Crosses midnight
        return currentTime >= endTime && currentTime < startTime;
    }
}

export async function requestPushSubscription(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push notifications not supported');
        return null;
    }

    try {
        const registration = await navigator.serviceWorker.ready;

        // Note: In production, you'd need a VAPID public key from your backend
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            // applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        return subscription;
    } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
        return null;
    }
}
