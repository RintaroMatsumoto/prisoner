import type { UserState } from '../types';
import { EXERCISES } from '../data/exercises';

export function calculateRank(state: UserState): string {
    let totalLevels = 0;
    // Iterate over known keys in state that match exercises
    const exerciseKeys = Object.keys(EXERCISES) as Array<keyof UserState>;

    exerciseKeys.forEach(key => {
        const item = state[key];
        if (item && typeof item === 'object' && 'level' in item) {
            totalLevels += (item as { level: number }).level;
        }
    });

    if (totalLevels >= 60) return "LEGEND (伝説)";
    if (totalLevels >= 55) return "BEAST (野獣)";
    if (totalLevels >= 40) return "CONVICT (受刑者)";
    if (totalLevels >= 25) return "CRIMINAL (犯罪者)";
    if (totalLevels >= 10) return "GOON (雑魚)";
    return "FRESH FISH (新入り)";
}

export function getDailyOrders(state: UserState): string[] {
    // Simple Logic: Pick the 2 exercises with the oldest 'last done' date (or never done).
    // Only unlocked ones.
    const candidates: { id: string, time: number }[] = [];
    const exerciseKeys = Object.keys(EXERCISES) as Array<keyof UserState>;

    exerciseKeys.forEach(key => {
        const uItem = state[key];
        const exerciseDef = EXERCISES[key];

        // Check locked state properly dealing with dynamic vs static
        // const isLocked = (uItem as any).locked !== undefined ? (uItem as any).locked : exerciseDef.isLocked;
        // In our Type, UserState properties for exercises are UserExerciseState which has 'locked' optional.
        // We cast to access specific props safely

        let isLocked = exerciseDef.isLocked;
        if (uItem && typeof uItem === 'object' && 'locked' in uItem) {
            if ((uItem as any).locked !== undefined) {
                isLocked = (uItem as any).locked;
            }
        }

        if (isLocked) return;

        let lastTime = 0;
        const history = (uItem as any).history;
        if (history && history.length > 0) {
            lastTime = new Date(history[history.length - 1].date).getTime();
        }
        candidates.push({ id: key, time: lastTime });
    });

    // Sort ascending (oldest first)
    candidates.sort((a, b) => a.time - b.time);

    // Return top 2 IDs
    return candidates.slice(0, 2).map(c => c.id);
}

export function getRecommendationDetails(state: UserState, exerciseId: string): { reason: string, urgency: 'high' | 'medium' | 'low' } {
    const exerciseState = state[exerciseId as keyof UserState] as any;
    if (!exerciseState || !exerciseState.history || exerciseState.history.length === 0) {
        return { reason: "貴様、まだ一度もこの痛みを知らないようだな...", urgency: 'high' };
    }

    const lastDate = new Date(exerciseState.history[exerciseState.history.length - 1].date);
    const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
        return { reason: `${diffDays}日もサボっているぞ！筋肉が泣いている！`, urgency: 'high' };
    } else if (diffDays > 3) {
        return { reason: "そろそろこの部位を再び虐め抜く時間だ。", urgency: 'medium' };
    } else {
        return { reason: "休むな！継続こそが力だ！", urgency: 'low' };
    }
}
