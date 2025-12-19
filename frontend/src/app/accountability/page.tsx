'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { FiUsers, FiPlus, FiUserPlus, FiUserMinus, FiCheck, FiX, FiZap } from 'react-icons/fi';
import styles from './accountability.module.css';

export default function AccountabilityPage() {
    const accountabilityPartners = useAppStore((state) => state.accountabilityPartners);
    const accountabilityInvitations = useAppStore((state) => state.accountabilityInvitations);
    const leaderboard = useAppStore((state) => state.leaderboard);
    const user = useAppStore((state) => state.user);
    const sendAccountabilityInvite = useAppStore((state) => state.sendAccountabilityInvite);
    const acceptAccountabilityInvite = useAppStore((state) => state.acceptAccountabilityInvite);
    const rejectAccountabilityInvite = useAppStore((state) => state.rejectAccountabilityInvite);
    const removeAccountabilityPartner = useAppStore((state) => state.removeAccountabilityPartner);

    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    const pendingInvitations = accountabilityInvitations.filter(
        inv => inv.toUserId === user.id && inv.status === 'pending'
    );

    const sentInvitations = accountabilityInvitations.filter(
        inv => inv.fromUserId === user.id && inv.status === 'pending'
    );

    // Get available users (not already partners, not invited)
    const availableUsers = leaderboard.filter(
        (entry) =>
            entry.userId !== user.id &&
            !accountabilityPartners.some((p) => p.userId === entry.userId) &&
            !sentInvitations.some((inv) => inv.toUserId === entry.userId)
    );

    const handleSendInvite = (userId: string, userName: string, userAvatar: string) => {
        if (accountabilityPartners.length >= 3) {
            alert('You can have a maximum of 3 accountability partners');
            return;
        }
        sendAccountabilityInvite(userId, userName, userAvatar);
        setIsInviteDialogOpen(false);
        setSelectedUser(null);
    };

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Accountability Partners</h1>
                        <p className={styles.subtitle}>
                            Stay motivated with accountability partners
                        </p>
                    </div>
                    <Button
                        icon={<FiUserPlus />}
                        onClick={() => setIsInviteDialogOpen(true)}
                        disabled={accountabilityPartners.length >= 3}
                    >
                        Invite Partner
                    </Button>
                </header>

                {accountabilityPartners.length >= 3 && (
                    <div className={styles.limitNotice}>
                        <FiUsers />
                        <span>You have reached the maximum of 3 accountability partners</span>
                    </div>
                )}

                {/* Pending Invitations Received */}
                {pendingInvitations.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Pending Requests</h2>
                        <div className={styles.invitationsList}>
                            {pendingInvitations.map((invitation) => (
                                <Card key={invitation.id}>
                                    <CardContent>
                                        <div className={styles.invitationCard}>
                                            <div className={styles.invitationUser}>
                                                <div className={styles.avatar}>
                                                    {invitation.fromUserAvatar}
                                                </div>
                                                <div>
                                                    <h4 className={styles.invitationName}>
                                                        {invitation.fromUserName}
                                                    </h4>
                                                    <p className={styles.invitationMessage}>
                                                        wants to be your accountability partner
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.invitationActions}>
                                                <Button
                                                    variant="primary"
                                                    size="small"
                                                    icon={<FiCheck />}
                                                    onClick={() => acceptAccountabilityInvite(invitation.id)}
                                                    disabled={accountabilityPartners.length >= 3}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="small"
                                                    icon={<FiX />}
                                                    onClick={() => rejectAccountabilityInvite(invitation.id)}
                                                >
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

                {/* Current Partners */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        Your Partners ({accountabilityPartners.length}/3)
                    </h2>
                    {accountabilityPartners.length > 0 ? (
                        <div className={styles.partnersGrid}>
                            {accountabilityPartners.map((partner) => (
                                <Card key={partner.userId}>
                                    <CardContent>
                                        <div className={styles.partnerCard}>
                                            <div className={styles.partnerHeader}>
                                                <div className={styles.avatar}>{partner.userAvatar}</div>
                                                <div className={styles.partnerInfo}>
                                                    <h3 className={styles.partnerName}>
                                                        {partner.userName}
                                                    </h3>
                                                    <div className={styles.partnerStats}>
                                                        <FiZap />
                                                        <span>{partner.streakDays} day streak</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.partnerMeta}>
                                                <p className={styles.partnerSince}>
                                                    Partners since{' '}
                                                    {new Date(partner.addedAt).toLocaleDateString()}
                                                </p>
                                                {partner.sharedHabits.length > 0 && (
                                                    <Badge variant="default" size="small">
                                                        {partner.sharedHabits.length} shared habits
                                                    </Badge>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="small"
                                                icon={<FiUserMinus />}
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            `Remove ${partner.userName} as accountability partner?`
                                                        )
                                                    ) {
                                                        removeAccountabilityPartner(partner.userId);
                                                    }
                                                }}
                                                className={styles.removeButton}
                                            >
                                                Remove Partner
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent>
                                <div className={styles.emptyState}>
                                    <FiUsers className={styles.emptyIcon} />
                                    <h3>No Accountability Partners Yet</h3>
                                    <p>
                                        Invite friends to be your accountability partners and stay
                                        motivated together!
                                    </p>
                                    <Button
                                        icon={<FiPlus />}
                                        onClick={() => setIsInviteDialogOpen(true)}
                                    >
                                        Invite Your First Partner
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Sent Invitations */}
                {sentInvitations.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Pending Invites Sent</h2>
                        <div className={styles.sentInvitesList}>
                            {sentInvitations.map((invitation) => (
                                <div key={invitation.id} className={styles.sentInviteItem}>
                                    <div className={styles.avatar}>
                                        {leaderboard.find(u => u.userId === invitation.toUserId)?.userAvatar || '👤'}
                                    </div>
                                    <span className={styles.sentInviteName}>
                                        {leaderboard.find(u => u.userId === invitation.toUserId)?.userName || 'User'}
                                    </span>
                                    <Badge variant="default" size="small">
                                        Pending
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Invite Dialog */}
                <Dialog
                    open={isInviteDialogOpen}
                    onClose={() => {
                        setIsInviteDialogOpen(false);
                        setSelectedUser(null);
                    }}
                    title="Invite Accountability Partner"
                >
                    <div className={styles.inviteDialog}>
                        <p className={styles.dialogDescription}>
                            Choose someone from the community to be your accountability partner.
                            You can have a maximum of 3 partners.
                        </p>
                        <div className={styles.usersList}>
                            {availableUsers.length > 0 ? (
                                availableUsers.map((userEntry) => (
                                    <div
                                        key={userEntry.userId}
                                        className={`${styles.userItem} ${selectedUser === userEntry.userId
                                                ? styles.userItemSelected
                                                : ''
                                            }`}
                                        onClick={() => setSelectedUser(userEntry.userId)}
                                    >
                                        <div className={styles.avatar}>{userEntry.userAvatar}</div>
                                        <div className={styles.userDetails}>
                                            <span className={styles.userItemName}>
                                                {userEntry.userName}
                                            </span>
                                            <span className={styles.userItemStats}>
                                                {userEntry.xp} XP • {userEntry.streakDays} day streak
                                            </span>
                                        </div>
                                        {selectedUser === userEntry.userId && (
                                            <FiCheck className={styles.checkIcon} />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noUsers}>
                                    No users available to invite at the moment.
                                </p>
                            )}
                        </div>
                        <div className={styles.dialogActions}>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setIsInviteDialogOpen(false);
                                    setSelectedUser(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (selectedUser) {
                                        const user = availableUsers.find(
                                            (u) => u.userId === selectedUser
                                        );
                                        if (user) {
                                            handleSendInvite(
                                                user.userId,
                                                user.userName,
                                                user.userAvatar
                                            );
                                        }
                                    }
                                }}
                                disabled={!selectedUser}
                            >
                                Send Invite
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppShell>
    );
}
