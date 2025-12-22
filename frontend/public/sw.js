// Service Worker for HabitForge PWA
const CACHE_NAME = 'habitforge-v1';
const RUNTIME_CACHE = 'habitforge-runtime';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/dashboard',
    '/habits',
    '/tasks',
    '/quests',
    '/focus',
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Cache successful responses
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(event.request);
            })
    );
});

// Push notification event
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from HabitForge',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        actions: [
            {
                action: 'complete',
                title: 'Mark Complete',
                icon: '/icons/checkmark.png',
            },
            {
                action: 'snooze',
                title: 'Snooze',
                icon: '/icons/snooze.png',
            },
        ],
    };

    event.waitUntil(self.registration.showNotification('HabitForge', options));
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'complete') {
        // Handle complete action
        event.waitUntil(
            clients.openWindow('/habits?action=complete&id=' + event.notification.data.primaryKey)
        );
    } else if (event.action === 'snooze') {
        // Handle snooze action
        console.log('Notification snoozed');
    } else {
        // Default action - open app
        event.waitUntil(clients.openWindow('/'));
    }
});

// Background sync event (for offline actions)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-habits') {
        event.waitUntil(syncHabits());
    }
});

async function syncHabits() {
    // Sync pending habit completions when back online
    console.log('Syncing habits with server...');
    // Implementation would sync with backend
}
