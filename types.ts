export type exercise = {
    id: string;
    name: string;
    weight: number;
    sets: number;
    reps: number;
    targetWeight: number;
    targetReps: number;
    restTime: number;
    weightIncrease: number;
    history: (exercise & { date: string })[];
}

export type gymDay = {
    id: string;
    dayName: string;
    exercises: exercise[];
}

export type profile = {
    id: string;
    name: string;
    currentDay: number;
    days: gymDay[];
    defaultMaxReps: number;
    defaultMinReps: number;
    isSelected: boolean;
}

export const DEFAULT_EXERCISE: exercise = {
    id: "default-id", // Usually generated via UUID or Date.now().toString()
    name: "New Exercise",
    weight: 40,
    sets: 3,
    reps: 8,
    targetWeight: 42.5,
    targetReps: 10,
    restTime: 180,
    weightIncrease: 2.25,
    history: []
}

export const DEFAULT_PROFILE: profile = {
    id: "default-id", // Usually generated via UUID or Date.now().toString()
    name: "New Profile",
    currentDay: 0,
    days: [
        {
            id: "day-1",
            dayName: "Push Day",
            exercises: [
                {
                    id: "ex-1",
                    name: "Bench Press",
                    weight: 40,
                    sets: 3,
                    reps: 8,
                    targetWeight: 42.5,
                    targetReps: 10,
                    restTime: 180,
                    weightIncrease: 2.25,
                    history: []
                }
            ]
        }
    ],
    defaultMaxReps: 12,
    defaultMinReps: 8,
    isSelected: false,
};
