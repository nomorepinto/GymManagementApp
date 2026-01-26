import { Modal, View, Text, ScrollView, Pressable, TextInput } from "react-native";
import Button from "./button";
import type { gymDay, exercise } from "../app/(tabs)/index";
import * as crypto from 'expo-crypto';

import { useState } from "react";


export default function AddExerciseModal({ isOpen, onClose, gymDay, setExercise }: { isOpen: boolean, gymDay: gymDay, onClose: () => void, setExercise: any }) {

    const [exerciseName, setExerciseName] = useState('');
    const [weight, setWeight] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const handleAddExercise = () => {
        const newExercise: exercise = {
            id: crypto.randomUUID(),
            name: exerciseName,
            weight: Number(weight),
            sets: Number(sets),
            reps: Number(reps),
            restTime: 60
        }
        setExercise(newExercise);
        onClose();
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <View className="flex-1 items-center justify-center">
                <View className="w-3/4 flex rounded-3xl p-5 bg-card-navy">
                    <View className="flex justify-end self-center">
                        <Text className="text-white text-2xl font-nexaHeavy">Add Exercise</Text>
                    </View>
                    <View className="flex flex-row">
                        <View className="flex w-1/2">
                            <Text className="text-white text-2xl font-nexaLight">Exercise Name</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" value={exerciseName} onChangeText={setExerciseName} />
                        </View>
                        <View className="flex w-1/2">
                            <Text className="text-white text-2xl font-nexaLight">Weight</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" keyboardType="numeric" value={weight} onChangeText={setWeight} />
                        </View>
                    </View>
                    <View className="flex flex-row">
                        <View className="flex w-1/2">
                            <Text className="text-white text-2xl font-nexaLight">Sets</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" keyboardType="numeric" value={sets} onChangeText={setSets} />
                        </View>
                        <View className="flex w-1/2">
                            <Text className="text-white text-2xl font-nexaLight">Reps</Text>
                            <TextInput className="bg-white rounded-3xl text-lg p-5 font-nexaLight" keyboardType="numeric" value={reps} onChangeText={setReps} />
                        </View>
                    </View>
                    <View className="flex justify-end items-left mt-5 self-end w-1/2">
                        <Button width="w-1/4" text="Close" onPress={onClose} />
                        <Button width="w-1/4" text="Save" onPress={() => { handleAddExercise(); onClose(); }} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}