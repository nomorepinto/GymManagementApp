import { Modal, View, Text, ScrollView, Pressable, TextInput } from "react-native";
import type { profile } from "../types";
import * as crypto from 'expo-crypto';
import Button from "./button";

import { useState } from "react";

function SettingsBullet({ displayName, settingName, settingValue, updateSetting }: { displayName: string, settingName: string, settingValue: any, updateSetting: any }) {

    const [isEdit, setIsEdit] = useState(false);
    const [settingV, setSettingV] = useState(settingValue);

    return (
        <View className="flex flex-row items-center justify-between w-full border-b border-border-slate p-1">
            {
                isEdit ? (
                    <>
                        <View className="flex flex-row w-3/4 items-center">
                            <Text className="text-white text-xl font-nexaHeavy mb-1">{displayName}: </Text>
                            <TextInput placeholder={settingValue.toString()} className="bg-white rounded-2xl text-lg px-4 py-1 font-nexaLight" value={settingV} onChangeText={setSettingV} />
                        </View>
                        <View className="w-1/4">
                            <Button width="w-full" text="Save" onPress={() => { updateSetting(settingName.toString(), settingV.toString()); setIsEdit(!isEdit) }} />
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

function SettingsBulletNumeric({ displayName, settingName, settingValue, updateSetting }: { displayName: string, settingName: string, settingValue: number, updateSetting: any }) {

    const [isEdit, setIsEdit] = useState(false);
    const [settingV, setSettingV] = useState(settingValue.toString());

    return (
        <View className="flex flex-row items-center justify-between w-full p-1 border-b border-border-slate">
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
                                updateSetting(settingName, isNaN(numValue) ? settingValue : numValue);
                                setIsEdit(!isEdit);
                            }} />
                        </View>
                    </>
                ) : (
                    <>
                        <View className="flex flex-row w-3/4 items-center">
                            <Text className="text-white text-xl font-nexaHeavy mb-1">{displayName}: </Text>
                            <Text className="text-white text-xl font-nexaLight mb-1">{settingValue}</Text>
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

export default function SettingsModal({ selectedProfile, updateSetting, isOpen, onClose, deleteProfile }: { selectedProfile: profile, updateSetting: any, isOpen: boolean, onClose: () => void, deleteProfile: any }) {

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <View className="flex flex-col w-5/6 my-auto mx-auto items-center justify-center bg-card-navy rounded-3xl p-5">
                <View className="self-center mb-3">
                    <Text className="text-white text-2xl font-nexaHeavy mb-1">Profile Settings</Text>
                </View>
                <View className="flex flex-col items-center mb-3">
                    <SettingsBullet displayName="Name" settingName="name" settingValue={selectedProfile.name} updateSetting={updateSetting} />
                    <SettingsBulletNumeric displayName="Max Reps" settingName="defaultMaxReps" settingValue={selectedProfile.defaultMaxReps} updateSetting={updateSetting} />
                    <SettingsBulletNumeric displayName="Min Reps" settingName="defaultMinReps" settingValue={selectedProfile.defaultMinReps} updateSetting={updateSetting} />
                    <SettingsBulletNumeric displayName="Rest Time" settingName="defaultRestTime" settingValue={selectedProfile.defaultRestTime} updateSetting={updateSetting} />
                    <SettingsBulletNumeric displayName="Weight Increase" settingName="defaultWeightIncrease" settingValue={selectedProfile.defaultWeightIncrease} updateSetting={updateSetting} />

                </View>
                <View className="self-center">
                    <Button width="w-1/2" text="Delete Profile" onPress={() => { deleteProfile(); onClose(); }} />
                </View>
                <View className="self-end">
                    <Button width="w-1/2" text="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}