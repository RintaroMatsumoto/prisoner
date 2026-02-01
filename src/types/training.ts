export interface TrainingPhase {
  title: string;
  description: string;
  imageUrl: string;
  tips: string[];
}

export interface TrainingLevelStandards {
  beginner: number;
  intermediate: { sets: number; reps: number };
  progression: { sets: number; reps: number };
}

export interface TrainingLevel {
  id: string;
  title: string;
  level: number;
  overview: string;
  standards: TrainingLevelStandards;
  phases: TrainingPhase[];
}
