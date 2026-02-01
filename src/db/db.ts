import Dexie, { type EntityTable } from 'dexie';
import type { UserState, ExerciseHistoryLog } from '../types';

// DB Interfaces
export interface User {
    id: number;
    name: string;
    createdAt: string;
}

export interface UserProgress {
    id: number;
    userId: number;
    exerciseId: string;
    level: number;
    locked: boolean;
}

export interface TrainingLog {
    id: number;
    userId: number;
    exerciseId: string;
    date: string;
    reps: number;
    result: 'success' | 'fail';
}

const db = new Dexie('PrisonerTrainingDB') as Dexie & {
    users: EntityTable<User, 'id'>;
    progress: EntityTable<UserProgress, 'id'>;
    logs: EntityTable<TrainingLog, 'id'>;
};

// Schema
db.version(1).stores({
    users: '++id, name',
    progress: '++id, [userId+exerciseId]',
    logs: '++id, userId, [userId+exerciseId], date'
});

export { db };

// Migration / Helper to seed initial data from localStorage if empty
export const migrateFromLocalStorage = async () => {
    const STORAGE_KEY = 'ironLogState';
    const raw = localStorage.getItem(STORAGE_KEY);

    // Check if DB is empty
    const userCount = await db.users.count();

    if (userCount === 0 && raw) {
        try {
            const legacyState: UserState = JSON.parse(raw);
            if (legacyState.name) {
                await db.transaction('rw', db.users, db.progress, db.logs, async () => {
                    // Create User
                    const userId = await db.users.add({
                        name: legacyState.name!,
                        createdAt: new Date().toISOString()
                    });

                    // Function to migrate exercise
                    const migrateExercise = async (exId: string, data: any) => {
                        await db.progress.add({
                            userId,
                            exerciseId: exId,
                            level: data.level,
                            locked: !!data.locked
                        });

                        if (data.history && Array.isArray(data.history)) {
                            for (const h of data.history) {
                                await db.logs.add({
                                    userId,
                                    exerciseId: exId,
                                    date: h.date,
                                    reps: typeof h.reps === 'number' ? h.reps : 0,
                                    result: h.result
                                });
                            }
                        }
                    };

                    await migrateExercise('pushups', legacyState.pushups);
                    await migrateExercise('squats', legacyState.squats);
                    await migrateExercise('pullups', legacyState.pullups);
                    await migrateExercise('legraises', legacyState.legraises);
                    await migrateExercise('bridges', legacyState.bridges);
                    await migrateExercise('handstand_pushups', legacyState.handstand_pushups);
                });
                console.log("Migration complete");
            }
        } catch (e) {
            console.error("Migration failed", e);
        }
    }
};

export const getUserState = async (userId: number): Promise<UserState | null> => {
    const user = await db.users.get(userId);
    if (!user) return null;

    const mkState = (level: number, locked: boolean, history: any[]) => ({
        level, locked, history
    });

    const loadEx = async (exId: string) => {
        const p = await db.progress.where({ userId: userId, exerciseId: exId }).first();
        const logs = await db.logs.where({ userId: userId, exerciseId: exId }).toArray();
        // format logs
        const history: ExerciseHistoryLog[] = logs.map(l => ({
            date: l.date,
            reps: l.reps,
            result: l.result
        }));

        // Default if progress missing (shouldn't happen if initialized properly)
        return mkState(p?.level || 1, p?.locked ?? (exId === 'bridges' || exId === 'handstand_pushups'), history);
    };

    return {
        name: user.name,
        pushups: await loadEx('pushups'),
        squats: await loadEx('squats'),
        pullups: await loadEx('pullups'),
        legraises: await loadEx('legraises'),
        bridges: await loadEx('bridges'),
        handstand_pushups: await loadEx('handstand_pushups')
    };
};
