import { Modal, View, Text, ScrollView, Pressable, TextInput } from "react-native";
import type { gymDay, exercise } from "../types";
import * as crypto from 'expo-crypto';

import { useState } from "react";

export default function AddExerciseModal({
    isOpen,
    onClose,
    gymDay,
    setExercise,
    defaultMinReps,
    defaultMaxReps,
    defaultRestTime,
    defaultWeightIncrease,
}: {
    isOpen: boolean,
    gymDay: gymDay,
    onClose: () => void,
    setExercise: any,
    defaultMinReps: number,
    defaultMaxReps: number,
    defaultRestTime: number,
    defaultWeightIncrease: number,
}) {

    const [exerciseName, setExerciseName] = useState('');
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const clearExerciseDetails = () => {
        setExerciseName('');
        setWeight('');
        setSets('');
        setReps('');
    }

    const handleAddExercise = () => {
        const newExercise: exercise = {
            id: crypto.randomUUID(),
            name: exerciseName,
            weight: Number(weight),
            sets: Number(sets),
            reps: Number(reps),
            targetReps: (Number(reps) >= defaultMaxReps ? defaultMinReps : Number(reps) + 2),
            targetWeight: Number(weight) + defaultWeightIncrease,
            restTime: defaultRestTime
        }
        setExercise(newExercise);
        clearExerciseDetails();
        onClose();
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <View className="flex-1 items-center justify-center">
                <View className="w-3/4 flex rounded-3xl p-5 bg-card-navy">
                    <View className="flex justify-end self-center mb-3">
                        <Text className="text-white text-2xl font-nexaHeavy">Add Exercise</Text>
                    </View>
                    <View className="flex flex-col">
                        <View className="flex w-full mb-3">
                            <Text className="text-white text-2xl font-nexaLight mb-1">Exercise Name</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" value={exerciseName} onChangeText={setExerciseName} />
                        </View>
                        <View className="flex w-full mb-3">
                            <Text className="text-white text-2xl font-nexaLight mb-1">Weight (kg)</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" keyboardType="numeric" value={weight} onChangeText={setWeight} />
                        </View>
                    </View>
                    <View className="flex flex-row gap-6">
                        <View className="flex w-[45%]">
                            <Text className="text-white text-2xl font-nexaLight mb-1">Sets</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" keyboardType="numeric" value={sets} onChangeText={setSets} />
                        </View>
                        <View className="flex w-[45%]">
                            <Text className="text-white text-2xl font-nexaLight mb-1">Reps</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" keyboardType="numeric" value={reps} onChangeText={setReps} />
                        </View>
                    </View>
                    <View className="flex flex-row justify-end items-left mt-5 self-end w-full gap-4">
                        <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-5 py-2 w-50 items-center justify-center`} onPress={onClose}>
                            <Text className="font-nexaHeavy text-white text-2xl">Close</Text>
                        </Pressable>
                        <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-5 py-2 w-50 items-center justify-center`} onPress={() => { handleAddExercise(); onClose(); }}>
                            <Text className="font-nexaHeavy text-white text-2xl">Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}