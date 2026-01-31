export type RepsSets = {
  reps: number;
  sets: number;
};

export type TimeStandard = {
  time: string;
};

export type Standard = RepsSets | TimeStandard;

export type StepStandards = {
  beginner: Standard;
  intermediate: Standard;
  progression: Standard;
};

export type ExerciseStep = {
  level: number;
  name: string;
  standards: StepStandards;
};

export type ExerciseData = {
  id: string;
  name: string;
  description: string;
  isLocked: boolean;
  steps: ExerciseStep[];
};

export type ExerciseHistoryLog = {
  date: string;
  reps: number | string; // string for time-based records if needed, though usually handled differently
  result: 'success' | 'fail';
};

export type UserExerciseState = {
  level: number;
  history: ExerciseHistoryLog[];
  locked?: boolean;
};

export type UserState = {
  name: string | null;
  pushups: UserExerciseState;
  squats: UserExerciseState;
  pullups: UserExerciseState;
  legraises: UserExerciseState;
  bridges: UserExerciseState;
  handstand_pushups: UserExerciseState;
};

// Helper type for the big data object
export type Big6Data = {
  [key: string]: ExerciseData;
};
