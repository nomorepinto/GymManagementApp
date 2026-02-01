import { View, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from 'expo-router';
import * as crypto from 'expo-crypto';
import { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/button'
import GymDays from '../../components/gymDays'
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { profile, gymDay } from '../../types'

import { LinearGradient } from 'expo-linear-gradient';

function TextBoxHelper({ label, value, setValue }: { label: string, value: any, setValue: any }) {
    return (
        <View className="flex flex-col w-[47%]">
            <View className="flex justify-start">
                <Text className="text-white text-2xl font-nexaLight mb-1">{label}</Text>
            </View>
            <View className="flex justify-start mb-3">
                <TextInput placeholder={label} className="bg-white rounded-2xl text-lg px-5 py-3 font-nexaLight" value={value.toString()} onChangeText={(text) => setValue(text)} keyboardType="number-pad" />
            </View>
        </View>
    )
}

export default function CreateProfile() {
    const router = useRouter();

    const [profileName, setProfileName] = useState<string>('');
    const [gymDays, setGymDays] = useState<string[]>([]);
    const [defaultMinReps, setDefaultMinReps] = useState<number>(8);
    const [defaultMaxReps, setDefaultMaxReps] = useState<number>(12);
    const [defaultRestTime, setDefaultRestTime] = useState<number>(150);
    const [defaultWeightIncrease, setDefaultWeightIncrease] = useState<number>(2.25);

    const checkProfileArray = async () => {
        try {
            const existingData = await AsyncStorage.getItem('profileDataArray');
            if (existingData) {
                const parsedData: profile[] = JSON.parse(existingData);
                if (parsedData.length > 0) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    const saveProfileData = async (data: profile) => {
        try {
            const existingData = await AsyncStorage.getItem('profileDataArray');
            if (existingData) {
                const parsedData: profile[] = JSON.parse(existingData);
                parsedData.push(data);
                await AsyncStorage.setItem('profileDataArray', JSON.stringify(parsedData));
                router.replace('/')
                console.log('Profile saved successfully');
            } else {
                await AsyncStorage.setItem('profileDataArray', JSON.stringify([data]));
                router.replace('/')
                console.log('New Profile Array created successfully');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setProfileName('');
            setGymDays([]);
        }
    }

    const handleCreateProfile = async () => {
        try {
            if (profileName === '' || gymDays.length === 0) {
                return;
            }
            const gymDayArray: gymDay[] = gymDays.map((day) => {
                return {
                    id: crypto.randomUUID(),
                    dayName: day,
                    exercises: []
                }
            })

            const newProfile: profile = {
                id: crypto.randomUUID(),
                name: profileName,
                currentDay: 0,
                days: gymDayArray,
                defaultMinReps: Number(defaultMinReps),
                defaultMaxReps: Number(defaultMaxReps),
                isSelected: true
            }

            await saveProfileData(newProfile);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            <LinearGradient colors={['#050E3C', '#000000']} className="flex-1 flex justify-center p-8 rounded-3xl">
                <Text className="text-white text-3xl font-nexaHeavy mb-5">Create Profile</Text>
                <View className="flex justify-start">
                    <Text className="text-white text-2xl font-nexaLight mb-1">Profile Name</Text>
                </View>
                <View className="flex justify-start mb-5">
                    <TextInput placeholder="Name" className="bg-white rounded-2xl text-lg px-5 py-3 font-nexaLight" value={profileName} onChangeText={setProfileName} />
                </View>
                <View className="flex justify-start">
                    <Text className="text-white text-2xl font-nexaLight mb-2">Gym Days</Text>
                </View>
                <GymDays gymDays={gymDays} setGymDays={setGymDays} />
                <View className="w-full justify-between mb-5">
                    <View className="flex flex-row justify-between">
                        <TextBoxHelper label="Min Reps" value={defaultMinReps.toString()} setValue={setDefaultMinReps} />
                        <TextBoxHelper label="Max Reps" value={defaultMaxReps.toString()} setValue={setDefaultMaxReps} />
                    </View>
                </View>
                <View className="flex flex-row gap-6 w-full justify-between items-end">
                    <Button width="w-[45%]" text="Cancel" onPress={async () => { await checkProfileArray() ? router.replace('/') : null }} />
                    <Button width="w-[45%]" text="Create" onPress={handleCreateProfile} />
                </View>
            </LinearGradient>
        </KeyboardAwareScrollView>
    );
}

