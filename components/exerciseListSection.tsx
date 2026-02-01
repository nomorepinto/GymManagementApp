import { View, Text, ScrollView, Pressable } from "react-native";
import type { exercise, gymDay } from "../types";
import Button from "./button";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ExeciseListBulletProps {
    exercise: exercise,
    handleRemoveExercise: any,
    setSelectedExercise: any,
    setExerciseSettingsModalOpen: any,
}

function ExeciseListBullet({ exercise, handleRemoveExercise, setSelectedExercise, setExerciseSettingsModalOpen }: ExeciseListBulletProps) {
    const formatNumber = (number: number) => Number(number.toFixed(2))

    return (
        <>
            <Pressable onPress={() => { setSelectedExercise(exercise); setExerciseSettingsModalOpen(true) }}>
                <View className="flex p-3 bg-slate-700 rounded-3xl mb-2">
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-white text-xl font-nexaHeavy mt-1 mb-1 ml-2">{formatNumber(exercise.weight)}kg {exercise.name}</Text>
                        <Pressable className="rounded-full bg-action-red active:bg-btn-active px-8 py-0.5 items-center justify-center" onPress={() => handleRemoveExercise(exercise.id)}>
                            <Text className="text-white text-lg font-nexaBold">-</Text>
                        </Pressable>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <View className="rounded-full bg-slate-600 px-2 py-1 items-center justify-center min-w-[32%]">
                            <Text className="text-white text-md font-nexaLight">Sets: {exercise.sets}</Text>
                        </View>
                        <View className="rounded-full bg-slate-600 px-2 py-1 items-center justify-center min-w-[32%]">
                            <Text className="text-white text-md font-nexaLight">Reps: {exercise.reps}</Text>
                        </View>
                        <View className="rounded-full bg-slate-600 px-2 py-1 items-center justify-center min-w-[32%]">
                            <Text className="text-white text-md font-nexaLight">Rest: {formatNumber(exercise.restTime)} min</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between">
                        <View className="rounded-full bg-slate-500 px-2 py-1 items-center justify-center min-w-[49%]">
                            <Text className="text-white text-md font-nexaLight"><MaterialCommunityIcons name="target" size={12} color="white" /> Kg: {formatNumber(exercise.targetWeight)}</Text>
                        </View>
                        <View className="rounded-full bg-slate-500 px-2 py-1 items-center justify-center min-w-[49%]">
                            <Text className="text-white text-md font-nexaLight"><MaterialCommunityIcons name="target" size={12} color="white" /> Reps: {exercise.targetReps}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}

interface ExerciseListProps {
    gymDay: gymDay,
    setAddExerciseModalOpen: (value: boolean) => void,
    removeExercise: any,
    setSelectedExercise: any,
    setExerciseSettingsModalOpen: any,
}

export default function ExerciseList({
    gymDay,
    setAddExerciseModalOpen,
    setSelectedExercise,
    removeExercise,
    setExerciseSettingsModalOpen,
}: ExerciseListProps) {
    return (
        <View className="flex flex-col w-5/6 h-full p-5 bg-card-slate rounded-3xl">
            <View className="flex flex-row justify-between pb-2 border-b border-white/20">
                <Text className="text-white text-3xl font-nexaHeavy my-2 ml-2">Exercises</Text>
                <Button width="w-30" text="+ Add" onPress={() => { setAddExerciseModalOpen(true) }} />
            </View>
            <View className="h-5/6">
                <ScrollView className="flex-1 rounded-3xl" contentContainerStyle={{ flexGrow: 1, padding: 5 }}>

                    {gymDay.exercises.length === 0 ? (
                        <View className="flex items-center">
                            <Text className="text-white/50 text-center text-4xl font-nexaHeavy">{'No exercises \nadded yet'}</Text>
                        </View>
                    ) : (
                        gymDay.exercises.map((exercise) => (
                            <ExeciseListBullet key={exercise.id} exercise={exercise} handleRemoveExercise={removeExercise} setSelectedExercise={setSelectedExercise} setExerciseSettingsModalOpen={setExerciseSettingsModalOpen} />
                        ))
                    )}
                </ScrollView>
            </View>
        </View>
    );
}