import { useState, useEffect, useCallback } from 'react';
import type { UserState, ExerciseHistoryLog } from '../types';
import { db, migrateFromLocalStorage, getUserState } from '../db/db';
// import { useLiveQuery } from 'dexie-react-hooks'; // Not installed

const DEFAULT_STATE: UserState = {
    name: null,
    pushups: { level: 1, history: [] },
    squats: { level: 1, history: [] },
    pullups: { level: 1, history: [] },
    legraises: { level: 1, history: [] },
    bridges: { level: 1, history: [], locked: true },
    handstand_pushups: { level: 1, history: [], locked: true }
};

export function usePrisonerState() {
    // Current active user ID. For now single user or first user.
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initial Load / Migration
    useEffect(() => {
        const init = async () => {
            await migrateFromLocalStorage();
            const firstUser = await db.users.orderBy('id').first();
            if (firstUser) {
                setUserId(firstUser.id);
            }
            setIsLoading(false);
        };
        init();
    }, []);

    // Load state for current user
    // We can use a simple effect loop or dexie's live query if we install dexie-react-hooks
    // Since we didn't check for dexie-react-hooks in package.json, let's assume we might not have it 
    // or just strict manual reload for now to be safe, OR use a custom live implementation.
    // Actually, 'dexie' is in dependencies. 'dexie-react-hooks' is NOT in package.json I viewed earlier.
    // So we must manage state manually.

    const [userState, setUserState] = useState<UserState>(DEFAULT_STATE);

    const refreshState = useCallback(async () => {
        if (!userId) return;
        const s = await getUserState(userId);
        if (s) setUserState(s);
    }, [userId]);

    useEffect(() => {
        if (userId) {
            refreshState();
        }
    }, [userId, refreshState]);

    const setName = useCallback(async (name: string) => {
        if (!userId) {
            // Create new user
            const newId = await db.users.add({
                name,
                createdAt: new Date().toISOString()
            });
            setUserId(newId);
            // Initialize progress
            const exercises = ['pushups', 'squats', 'pullups', 'legraises', 'bridges', 'handstand_pushups'];
            for (const ex of exercises) {
                await db.progress.add({
                    userId: newId,
                    exerciseId: ex,
                    level: 1,
                    locked: ex === 'bridges' || ex === 'handstand_pushups'
                });
            }
        } else {
            // Rename
            await db.users.update(userId, { name });
            refreshState(); // update local state
        }
    }, [userId, refreshState]);

    const recordTraining = useCallback(async (exerciseId: string, log: ExerciseHistoryLog, levelUp: boolean) => {
        if (!userId) return;

        await db.transaction('rw', db.progress, db.logs, async () => {
            // Add Log
            await db.logs.add({
                userId,
                exerciseId,
                date: log.date,
                reps: typeof log.reps === 'number' ? log.reps : 0,
                result: log.result
            });

            // Update Level
            if (levelUp) {
                const currentP = await db.progress.where({ userId, exerciseId }).first();
                if (currentP && currentP.level < 10) {
                    await db.progress.update(currentP.id, { level: currentP.level + 1 });
                }
            }

            // Check Unlocks (Logic duplicated from original BUT applied to DB)
            // We need to fetch current levels to check unlocks.
            // Bridge unlocks if Squats >= 6 AND LegRaises >= 6
            // Handstand Pushups unlocks if Pushups >= 6

            // Optimization: Only check relevant unlocks
            // If we just did squats or legraises, check bridges.
            if (exerciseId === 'squats' || exerciseId === 'legraises') {
                const s = await db.progress.where({ userId, exerciseId: 'squats' }).first();
                const l = await db.progress.where({ userId, exerciseId: 'legraises' }).first();
                const b = await db.progress.where({ userId, exerciseId: 'bridges' }).first();

                if (s && l && b && b.locked) {
                    if (s.level >= 6 && l.level >= 6) {
                        await db.progress.update(b.id, { locked: false });
                    }
                }
            }

            if (exerciseId === 'pushups') {
                const p = await db.progress.where({ userId, exerciseId: 'pushups' }).first();
                const h = await db.progress.where({ userId, exerciseId: 'handstand_pushups' }).first();

                if (p && h && h.locked) {
                    if (p.level >= 6) {
                        await db.progress.update(h.id, { locked: false });
                    }
                }
            }
        });

        await refreshState();

    }, [userId, refreshState]);

    return {
        userState: userState,
        setName,
        recordTraining,
        isLoading
    };
}
