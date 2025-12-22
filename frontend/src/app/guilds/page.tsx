'use client';

import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FiUsers, FiPlus, FiTrendingUp, FiAward, FiCheck, FiX } from 'react-icons/fi';
import { useState } from 'react';
import Link from 'next/link';
import styles from './guilds.module.css';

// Mock data (would come from store in production)
const mockGuilds = [
    {
        id: 'guild-1',
        name: 'Morning Warriors',
        description: 'Rise early, conquer the day',
        avatar: '⚔️',
        members: 4,
        maxMembers: 10,
        totalXP: 5750,
        level: 12,
    },
];

const mockPendingInvites = [
    {
        id: 'inv-1',
        guildName: 'Fitness Fanatics',
        guildAvatar: '💪',
        fromUserName: 'Coach Mike',
        members: 3,
    },
];

const mockPublicGuilds = [
    {
        id: 'guild-3',
        name: 'Mindful Creators',
        description: 'Meditation, journaling, creative pursuits',
        avatar: '🧘',
        members: 2,
        maxMembers: 8,
        totalXP: 2750,
        level: 7,
    },
    {
        id: 'guild-4',
        name: 'Code & Coffee',
        description: 'Developers building better coding habits',
        avatar: '💻',
        members: 12,
        maxMembers: 15,
        totalXP: 18600,
        level: 22,
    },
];

export default function GuildsPage() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>
                            <FiUsers /> Guilds
                        </h1>
                        <p className={styles.subtitle}>
                            Team up with others for collaborative challenges
                        </p>
                    </div>
                    <Button icon={<FiPlus />} onClick={() => setShowCreateDialog(true)}>
                        Create Guild
                    </Button>
                </header>

                {/* Pending Invitations */}
                {mockPendingInvites.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Pending Invitations</h2>
                        <div className={styles.invitesList}>
                            {mockPendingInvites.map((invite) => (
                                <Card key={invite.id}>
                                    <CardContent>
                                        <div className={styles.inviteCard}>
                                            <div className={styles.inviteInfo}>
                                                <div className={styles.guildAvatar}>
                                                    {invite.guildAvatar}
                                                </div>
                                                <div>
                                                    <h4 className={styles.guildName}>
                                                        {invite.guildName}
                                                    </h4>
                                                    <p className={styles.inviteFrom}>
                                                        Invited by {invite.fromUserName} • {invite.members}{' '}
                                                        members
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.inviteActions}>
                                                <Button variant="primary" size="small" icon={<FiCheck />}>
                                                    Accept
                                                </Button>
                                                <Button variant="ghost" size="small" icon={<FiX />}>
                                                    Decline
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* My Guilds */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>My Guilds ({mockGuilds.length})</h2>
                    <div className={styles.guildsGrid}>
                        {mockGuilds.map((guild) => (
                            <Link href={`/guilds/${guild.id}`} key={guild.id}>
                                <Card className={styles.guildCard}>
                                    <CardContent>
                                        <div className={styles.guildHeader}>
                                            <div className={styles.guildAvatar}>
                                                {guild.avatar}
                                            </div>
                                            <Badge variant="default">Level {guild.level}</Badge>
                                        </div>
                                        <h3 className={styles.guildCardName}>{guild.name}</h3>
                                        <p className={styles.guildDescription}>
                                            {guild.description}
                                        </p>
                                        <div className={styles.guildStats}>
                                            <div className={styles.stat}>
                                                <FiUsers />
                                                <span>
                                                    {guild.members}/{guild.maxMembers}
                                                </span>
                                            </div>
                                            <div className={styles.stat}>
                                                <FiTrendingUp />
                                                <span>{guild.totalXP.toLocaleString()} XP</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Public Guilds Discovery */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Discover Guilds</h2>
                        <Link href="/guilds/browse">
                            <Button variant="ghost" size="small">
                                View All
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.guildsGrid}>
                        {mockPublicGuilds.map((guild) => (
                            <Card key={guild.id} className={styles.guildCard}>
                                <CardContent>
                                    <div className={styles.guildHeader}>
                                        <div className={styles.guildAvatar}>{guild.avatar}</div>
                                        <Badge variant="default">Level {guild.level}</Badge>
                                    </div>
                                    <h3 className={styles.guildCardName}>{guild.name}</h3>
                                    <p className={styles.guildDescription}>{guild.description}</p>
                                    <div className={styles.guildStats}>
                                        <div className={styles.stat}>
                                            <FiUsers />
                                            <span>
                                                {guild.members}/{guild.maxMembers}
                                            </span>
                                        </div>
                                        <div className={styles.stat}>
                                            <FiTrendingUp />
                                            <span>{guild.totalXP.toLocaleString()} XP</span>
                                        </div>
                                    </div>
                                    <Button variant="primary" size="small" className={styles.joinButton}>
                                        Request to Join
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Create Guild Info */}
                <Card>
                    <CardContent>
                        <div className={styles.infoSection}>
                            <FiAward className={styles.infoIcon} />
                            <div>
                                <h3>Why Join a Guild?</h3>
                                <ul className={styles.benefitsList}>
                                    <li>Collective XP pools and team achievements</li>
                                    <li>Collaborative challenges with rewards</li>
                                    <li>Accountability and motivation from teammates</li>
                                    <li>Compete in seasonal guild leaderboards</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
