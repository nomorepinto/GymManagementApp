import { Modal, View, Text, ScrollView, Pressable, TextInput } from "react-native";
import type { gymDay, exercise } from "../types";
import * as crypto from 'expo-crypto';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useState } from "react";

export default function AddExerciseModal({
    isOpen,
    onClose,
    setExercise,
    defaultMinReps,
    defaultMaxReps,
}: {
    isOpen: boolean,
    onClose: () => void,
    setExercise: any,
    defaultMinReps: number,
    defaultMaxReps: number,
}) {

    const [exerciseName, setExerciseName] = useState('');
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weightIncrease, setWeightIncrease] = useState('');
    const [restTime, setRestTime] = useState('');

    const clearExerciseDetails = () => {
        setExerciseName('');
        setWeight('');
        setSets('');
        setReps('');
        setWeightIncrease('');
        setRestTime('');
    }

    const handleAddExercise = () => {
        const newExercise: exercise = {
            id: crypto.randomUUID(),
            name: exerciseName,
            weight: Number(weight),
            sets: Number(sets),
            reps: Number(reps),
            targetReps: (Number(reps) >= defaultMaxReps ? defaultMinReps : Number(reps) + 2),
            targetWeight: (Number(reps) >= defaultMaxReps ? (Number(weight) + Number(weightIncrease)) : Number(weight)),
            restTime: Number(restTime),
            weightIncrease: Number(weightIncrease),
            history: []

        }

        if (!exerciseName || !weight || !sets || !reps || !weightIncrease || !restTime) {
            return;
        }

        setExercise(newExercise);
        clearExerciseDetails();
        onClose();
    }

    const numberReplacer = (text: string) => {
        return text.replace(/[^0-9.]/g, '');
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 items-center justify-center">
                    <View className="w-3/4 flex rounded-3xl p-5 bg-card-navy">
                        <View className="flex justify-end self-center mb-2">
                            <Text className="text-white text-2xl font-nexaHeavy">Add Exercise</Text>
                        </View>
                        <View className="flex flex-col">
                            <View className="flex w-full mb-1">
                                <Text className="text-white text-xl font-nexaLight mb-1">Exercise Name</Text>
                                <TextInput className="bg-white rounded-full text-xl px-5 py-2 font-nexaLight" value={exerciseName} onChangeText={setExerciseName} />
                            </View>
                            <View className="flex w-full mb-1">
                                <Text className="text-white text-xl font-nexaLight mb-1">Weight (kg)</Text>
                                <TextInput className="bg-white rounded-full text-xl px-5 py-2 font-nexaLight" keyboardType="numeric" value={weight} onChangeText={(text) => setWeight(numberReplacer(text))} />
                            </View>
                        </View>
                        <View className="flex flex-row gap-6 mb-1">
                            <View className="flex w-[45%]">
                                <Text className="text-white text-xl font-nexaLight mb-1">Sets</Text>
                                <TextInput className="bg-white rounded-full text-xl px-5 py-2 font-nexaLight" keyboardType="numeric" value={sets} onChangeText={(text) => setSets(numberReplacer(text))} />
                            </View>
                            <View className="flex w-[45%]">
                                <Text className="text-white text-xl font-nexaLight mb-1">Reps</Text>
                                <TextInput className="bg-white rounded-full text-xl px-5 py-2 font-nexaLight" keyboardType="numeric" value={reps} onChangeText={(text) => setReps(numberReplacer(text))} />
                            </View>
                        </View>
                        <View className="flex flex-row mb-1">
                            <View className="flex w-full">
                                <Text className="text-white text-xl font-nexaLight mb-1">Weight Increase (kg)</Text>
                                <TextInput className="bg-white rounded-full text-xl px-5 py-2 font-nexaLight" keyboardType="numeric" value={weightIncrease} onChangeText={(text) => setWeightIncrease(numberReplacer(text))} />
                            </View>
                        </View>
                        <View className="flex flex-row mb-1">
                            <View className="flex w-full">
                                <Text className="text-white text-xl font-nexaLight mb-1">Rest Time (Minutes)</Text>
                                <TextInput className="bg-white rounded-full text-xl px-5 py-2 font-nexaLight" keyboardType="numeric" value={restTime} onChangeText={(text) => setRestTime(numberReplacer(text))} />
                            </View>
                        </View>
                        <View className="flex flex-row justify-end items-left mt-5 self-end w-full gap-4">
                            <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-5 py-2 w-50 items-center justify-center`}
                                onPress={() => { onClose(); clearExerciseDetails() }}>
                                <Text className="font-nexaHeavy text-white text-2xl">Close</Text>
                            </Pressable>
                            <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-5 py-2 w-50 items-center justify-center`} onPress={() => { handleAddExercise() }}>
                                <Text className="font-nexaHeavy text-white text-2xl">Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Modal>
    );
}