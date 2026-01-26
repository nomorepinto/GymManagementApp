import { View, Text, ScrollView, Pressable } from "react-native";
import type { exercise, gymDay } from "app/(tabs)";
import Button from "./button";



function ExeciseListBullet({ exercise }: { exercise: exercise }) {
    return (
        <View className="flex p-5 bg-slate-700 rounded-3xl mb-2">
            <Text className="text-white text-3xl font-nexaHeavy mt-2 mb-3">{exercise.weight}kg {exercise.name}</Text>
            <View className="flex-row gap-4">
                <View className="rounded-full bg-slate-600 px-5 py-2">
                    <Text className="text-white text-xl font-nexaLight">Sets: {exercise.sets}</Text>
                </View>
                <View className="rounded-full bg-slate-600 px-5 py-2">
                    <Text className="text-white text-xl font-nexaLight">Reps: {exercise.reps}</Text>
                </View>
            </View>
        </View>
    );
}

export default function ExerciseList({ gymDay, setAddExerciseModalOpen }: { gymDay: gymDay, setAddExerciseModalOpen: (value: boolean) => void }) {
    return (
        <View className="flex flex-col w-5/6 h-full p-5 bg-card-slate rounded-3xl">
            <View className="flex flex-row justify-between pb-4 border-b border-white/20">
                <Text className="text-white text-3xl font-nexaHeavy my-2 ml-2">Exercises</Text>
                <Button width="w-30" text="+ Add" onPress={() => { setAddExerciseModalOpen(true) }} />
            </View>
            <View className="h-5/6">
                <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, padding: 5 }}>

                    {gymDay.exercises.length === 0 ? (
                        <View className="flex items-center">
                            <Text className="text-white/50 text-center text-4xl font-nexaHeavy">{'No exercises \nadded yet'}</Text>
                        </View>
                    ) : (
                        gymDay.exercises.map((exercise) => (
                            <ExeciseListBullet key={exercise.id} exercise={exercise} />
                        ))
                    )}
                </ScrollView>
            </View>

        </View>
    );
}