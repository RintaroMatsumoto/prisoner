import { useState, useCallback } from 'react';
import type { UserState, ExerciseHistoryLog } from '../types';

const STORAGE_KEY = 'ironLogState';

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
    const [userState, setUserState] = useState<UserState>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : DEFAULT_STATE;
        } catch (e) {
            console.error("Failed to load state", e);
            return DEFAULT_STATE;
        }
    });

    const saveState = useCallback((newState: UserState) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            setUserState(newState);
        } catch (e) {
            console.error("Failed to save state", e);
        }
    }, []);

    const checkForUnlocks = useCallback((currentState: UserState): UserState => {
        let newState = { ...currentState };
        let hasChanges = false;

        // Bridge unlocks if Squats >= 6 AND LegRaises >= 6
        if (newState.bridges.locked) {
            if (newState.squats.level >= 6 && newState.legraises.level >= 6) {
                newState.bridges = { ...newState.bridges, locked: false };
                hasChanges = true;
            }
        }

        // Handstand Pushups unlocks if Pushups >= 6
        if (newState.handstand_pushups.locked) {
            if (newState.pushups.level >= 6) {
                newState.handstand_pushups = { ...newState.handstand_pushups, locked: false };
                hasChanges = true;
            }
        }

        return hasChanges ? newState : currentState;
    }, []);

    const setName = useCallback((name: string) => {
        const newState = { ...userState, name };
        saveState(newState);
    }, [userState, saveState]);

    const recordTraining = useCallback((exerciseId: string, log: ExerciseHistoryLog, levelUp: boolean) => {
        const currentState = { ...userState };
        const exerciseState = currentState[exerciseId as keyof UserState];

        if (typeof exerciseState === 'object' && exerciseState !== null && 'history' in exerciseState) {
            // Create new exercise state object
            const newExerciseState = { ...exerciseState };

            // Append history
            newExerciseState.history = [...newExerciseState.history, log];

            // Level up if applicable
            if (levelUp && newExerciseState.level < 10) {
                newExerciseState.level += 1;
            }

            // Update main state
            // @ts-expect-error key access dynamic
            currentState[exerciseId] = newExerciseState;

            // Check unlocks
            const stateAfterUnlocks = checkForUnlocks(currentState);

            saveState(stateAfterUnlocks);
        }
    }, [userState, saveState, checkForUnlocks]);

    return {
        userState,
        setName,
        recordTraining
    };
}
