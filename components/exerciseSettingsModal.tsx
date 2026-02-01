import { Modal, View, Text, ScrollView, Pressable, TextInput } from "react-native";
import type { profile } from "../types";
import * as crypto from 'expo-crypto';
import Button from "./button";
import type { exercise } from '../types'

import { useState } from "react";

function ExerciseSettingsBullet({ displayName, settingName, settingValue, updateSetting, exerciseid }: { displayName: string, settingName: string, settingValue: any, updateSetting: any, exerciseid: string }) {

    const [isEdit, setIsEdit] = useState(false);
    const [settingV, setSettingV] = useState(settingValue);

    return (
        <View className="flex flex-row items-center justify-between w-full border-b border-white p-1">
            {
                isEdit ? (
                    <>
                        <View className="flex flex-row w-3/4 items-center">
                            <Text className="text-white text-xl font-nexaHeavy mb-1">{displayName}: </Text>
                            <TextInput placeholder={settingValue.toString()} className="bg-white rounded-2xl text-lg px-4 py-1 font-nexaLight" value={settingV} onChangeText={setSettingV} />
                        </View>
                        <View className="w-1/4">
                            <Button width="w-full" text="Save"
                                onPress={() => { updateSetting(exerciseid, settingName.toString(), settingV.toString(), true); setIsEdit(!isEdit) }} />
                        </View>
                    </>
                ) : (
                    <>
                        <View className="flex flex-row w-3/4 items-center">
                            <Text className="text-white text-xl font-nexaHeavy mb-1">{displayName}: </Text>
                            <Text className="text-white text-xl font-nexaLight mb-1">{settingV}</Text>
                        </View>
                        <View className="w-1/4">
                            <Button width="w-full" text="Edit" onPress={() => setIsEdit(!isEdit)} />
                        </View>
                    </>
                )
            }

        </View>
    );
}

function ExerciseSettingsBulletNumeric({ displayName, settingName, settingValue, updateSetting, exerciseid }: { displayName: string, settingName: string, settingValue: number, updateSetting: any, exerciseid: string }) {

    const [isEdit, setIsEdit] = useState(false);
    const [settingV, setSettingV] = useState(settingValue.toString());

    return (
        <View className="flex flex-row items-center justify-between w-full p-1 border-b border-white">
            {
                isEdit ? (
                    <>
                        <View className="flex flex-row w-3/4 items-center ">
                            <Text className="text-white text-xl font-nexaHeavy mb-1">{displayName}: </Text>
                            <TextInput
                                placeholder={settingValue.toString()}
                                className="bg-white rounded-2xl text-lg px-4 py-1 font-nexaLight"
                                value={settingV}
                                onChangeText={setSettingV}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="w-1/4">
                            <Button width="w-full" text="Save" onPress={() => {
                                const numValue = parseFloat(settingV);
                                updateSetting(exerciseid, settingName, numValue, false);
                                setIsEdit(!isEdit);
                            }} />
                        </View>
                    </>
                ) : (
                    <>
                        <View className="flex flex-row w-3/4 items-center">
                            <Text className="text-white text-xl font-nexaHeavy mb-1">{displayName}: </Text>
                            <Text className="text-white text-xl font-nexaLight mb-1">{settingV}</Text>
                        </View>
                        <View className="w-1/4">
                            <Button width="w-full" text="Edit" onPress={() => setIsEdit(!isEdit)} />
                        </View>
                    </>
                )
            }

        </View>
    );
}

interface ExerciseSettingsModalProps {
    exercise: exercise;
    updateExercise: any;
    isOpen: boolean; onClose: () => void;
}

export default function ExerciseSettingsModal({
    exercise,
    isOpen,
    onClose,
    updateExercise
}: ExerciseSettingsModalProps) {

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <View className="flex flex-col w-5/6 my-auto mx-auto items-center justify-center bg-slate-800 rounded-3xl p-5">
                <View className="self-center mb-3">
                    <Text className="text-white text-2xl font-nexaHeavy mb-1">Exercise Settings</Text>
                </View>
                <View className="flex flex-col items-center mb-3">
                    <ExerciseSettingsBullet displayName="Name" settingName="name" settingValue={exercise.name} updateSetting={updateExercise} exerciseid={exercise.id} />
                    <ExerciseSettingsBulletNumeric displayName="Weight Increase" settingName="weightIncrease" settingValue={exercise.weightIncrease} updateSetting={updateExercise} exerciseid={exercise.id} />
                    <ExerciseSettingsBulletNumeric displayName="Rest Time" settingName="restTime" settingValue={exercise.restTime} updateSetting={updateExercise} exerciseid={exercise.id} />
                </View>
                <View className="max-h-60 rounded-3xl p-5 bg-slate-700 mb-3">
                    <ScrollView className="flex-grow-0">
                        {(exercise.history?.length ?? 0) > 0 ? (
                            exercise.history.map((history, index) => (
                                <View key={index} className="flex flex-row items-center justify-between w-full p-1 border-b border-white">
                                    <Text className="text-white text-xl font-nexaHeavy mb-1">{history.date}</Text>
                                    <Text className="text-white text-xl font-nexaHeavy mb-1">{history.sets} x {history.reps}</Text>
                                    <Text className="text-white text-xl font-nexaHeavy mb-1">{history.weight} kg</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-white text-xl font-nexaHeavy mb-1">Make some history!</Text>
                        )}
                    </ScrollView>
                </View>
                <View className="self-end">
                    <Button width="w-1/2" text="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}