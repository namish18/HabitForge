'use client';

import { useState, useEffect, useRef } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store/useAppStore';
import { FiPlay, FiPause, FiSquare, FiClock, FiZap, FiUsers, FiTarget } from 'react-icons/fi';
import styles from './focus.module.css';

type FocusMode = 'self' | 'collab' | 'quest';
type TimerType = 'stopwatch' | 'timer' | 'pomodoro';

export default function FocusPage() {
    const quests = useAppStore((state) => state.quests);
    const [focusMode, setFocusMode] = useState<FocusMode>('self');
    const [timerType, setTimerType] = useState<TimerType>('pomodoro');
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    const [inviteCode, setInviteCode] = useState('');
    const [selectedQuest, setSelectedQuest] = useState<string>('');
    const [customMinutes, setCustomMinutes] = useState(25);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const activeQuests = quests.filter(q => q.status === 'active');

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (timerType === 'stopwatch') {
                        return prevTime + 1;
                    } else {
                        if (prevTime <= 0) {
                            handleStop();
                            return 0;
                        }
                        return prevTime - 1;
                    }
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timerType]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleStop = () => {
        setIsRunning(false);
        resetTimer();
    };

    const resetTimer = () => {
        if (timerType === 'stopwatch') {
            setTime(0);
        } else if (timerType === 'pomodoro') {
            setTime(25 * 60);
        } else {
            setTime(customMinutes * 60);
        }
    };

    const handleTimerTypeChange = (newType: TimerType) => {
        setTimerType(newType);
        setIsRunning(false);
        if (newType === 'stopwatch') {
            setTime(0);
        } else if (newType === 'pomodoro') {
            setTime(25 * 60);
        } else {
            setTime(customMinutes * 60);
        }
    };

    const generateInviteCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        setInviteCode(code);
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AppShell>
            <div className={styles.page}>
                <header className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Focus Sessions</h1>
                        <p className={styles.subtitle}>
                            Deep work timer with distraction blocking
                        </p>
                    </div>
                </header>

                {/* Focus Mode Selection */}
                <div className={styles.modeSelector}>
                    <button
                        className={`${styles.modeButton} ${focusMode === 'self' ? styles.modeButtonActive : ''}`}
                        onClick={() => setFocusMode('self')}
                    >
                        <FiZap />
                        <span>Self Focus</span>
                    </button>
                    <button
                        className={`${styles.modeButton} ${focusMode === 'collab' ? styles.modeButtonActive : ''}`}
                        onClick={() => setFocusMode('collab')}
                    >
                        <FiUsers />
                        <span>Collab Focus</span>
                    </button>
                    <button
                        className={`${styles.modeButton} ${focusMode === 'quest' ? styles.modeButtonActive : ''}`}
                        onClick={() => setFocusMode('quest')}
                    >
                        <FiTarget />
                        <span>Quest Focus</span>
                    </button>
                </div>

                {/* Timer Type Selection */}
                <div className={styles.timerTypeSelector}>
                    <button
                        className={`${styles.timerTypeButton} ${timerType === 'stopwatch' ? styles.timerTypeButtonActive : ''}`}
                        onClick={() => handleTimerTypeChange('stopwatch')}
                    >
                        Stopwatch
                    </button>
                    <button
                        className={`${styles.timerTypeButton} ${timerType === 'timer' ? styles.timerTypeButtonActive : ''}`}
                        onClick={() => handleTimerTypeChange('timer')}
                    >
                        Timer
                    </button>
                    <button
                        className={`${styles.timerTypeButton} ${timerType === 'pomodoro' ? styles.timerTypeButtonActive : ''}`}
                        onClick={() => handleTimerTypeChange('pomodoro')}
                    >
                        Pomodoro
                    </button>
                </div>

                <div className={styles.focusContainer}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {focusMode === 'self' && 'Self Focus'}
                                {focusMode === 'collab' && 'Collaborative Focus'}
                                {focusMode === 'quest' && 'Quest-Linked Focus'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Timer Settings */}
                            {timerType === 'timer' && !isRunning && (
                                <div className={styles.timerSettings}>
                                    <label className={styles.label}>Set Duration (minutes)</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={customMinutes}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 0;
                                            setCustomMinutes(val);
                                            setTime(val * 60);
                                        }}
                                        min="1"
                                        max="180"
                                    />
                                </div>
                            )}

                            {/* Collab Mode - Invite Code */}
                            {focusMode === 'collab' && (
                                <div className={styles.collabSection}>
                                    {!inviteCode ? (
                                        <Button variant="primary" onClick={generateInviteCode} className={styles.generateButton}>
                                            Generate Invite Code
                                        </Button>
                                    ) : (
                                        <div className={styles.inviteCodeDisplay}>
                                            <label className={styles.label}>Share this code with others:</label>
                                            <div className={styles.inviteCode}>{inviteCode}</div>
                                            <p className={styles.helpText}>Others can join your focus session using this code</p>
                                        </div>
                                    )}
                                    <div className={styles.joinSection}>
                                        <label className={styles.label}>Or join with a code:</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter invite code"
                                            maxLength={6}
                                        />
                                        <Button variant="ghost" className={styles.joinButton}>Join Session</Button>
                                    </div>
                                </div>
                            )}

                            {/* Quest Mode - Quest Selection */}
                            {focusMode === 'quest' && (
                                <div className={styles.questSection}>
                                    <label className={styles.label}>Link to Quest:</label>
                                    <select
                                        className={styles.select}
                                        value={selectedQuest}
                                        onChange={(e) => setSelectedQuest(e.target.value)}
                                    >
                                        <option value="">Select a quest</option>
                                        {activeQuests.map((quest) => (
                                            <option key={quest.id} value={quest.id}>
                                                {quest.title}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedQuest && (
                                        <Badge variant="success" className={styles.questBadge}>
                                            <FiTarget /> Linked to quest
                                        </Badge>
                                    )}
                                </div>
                            )}

                            {/* Timer Display */}
                            <div className={styles.timerDisplay}>
                                <div className={styles.timeText}>{formatTime(time)}</div>
                                <div className={styles.timerLabel}>
                                    {timerType === 'stopwatch' && 'Elapsed Time'}
                                    {timerType === 'timer' && 'Remaining Time'}
                                    {timerType === 'pomodoro' && 'Pomodoro Session'}
                                </div>
                            </div>

                            {/* Timer Controls */}
                            <div className={styles.controls}>
                                {!isRunning ? (
                                    <Button icon={<FiPlay />} onClick={handleStart} size="large">
                                        Start
                                    </Button>
                                ) : (
                                    <Button variant="ghost" icon={<FiPause />} onClick={handlePause} size="large">
                                        Pause
                                    </Button>
                                )}
                                <Button variant="ghost" icon={<FiSquare />} onClick={handleStop} size="large">
                                    Stop
                                </Button>
                            </div>

                            {/* Focus Tips */}
                            <div className={styles.tips}>
                                <p className={styles.tipsTitle}>Focus Tips:</p>
                                <ul className={styles.tipsList}>
                                    <li>Eliminate distractions before starting</li>
                                    <li>Take short breaks between sessions</li>
                                    <li>Stay hydrated and maintain good posture</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
