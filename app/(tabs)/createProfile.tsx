import { View, Text, TextInput } from "react-native";
import { useRouter } from 'expo-router';
import * as crypto from 'expo-crypto';
import { useState } from 'react'

import Button from '../../components/button'
import GymDays from '../../components/gymDays'
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { profile, gymDay } from './index'

import { LinearGradient } from 'expo-linear-gradient';

export default function CreateProfile() {
    const router = useRouter();

    const [profileName, setProfileName] = useState<string>('');
    const [gymDays, setGymDays] = useState<string[]>([]);

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
                days: gymDayArray
            }

            await saveProfileData(newProfile);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <LinearGradient colors={['#050E3C', '#000000']} className="flex-1 flex justify-center p-12 rounded-3xl">
            <Text className="text-white text-3xl font-nexaHeavy mb-5">Create Profile</Text>
            <View className="flex justify-start">
                <Text className="text-white text-2xl font-nexaLight mb-2">Profile Name</Text>
            </View>
            <View className="flex justify-start mb-5">
                <TextInput placeholder="Name" className="bg-white rounded-3xl text-lg p-5 font-nexaLight" value={profileName} onChangeText={setProfileName} />
            </View>
            <View className="flex justify-start">
                <Text className="text-white text-2xl font-nexaLight mb-2">Gym Days</Text>
            </View>
            <GymDays gymDays={gymDays} setGymDays={setGymDays} />
            <View className="w-full items-end">
                <Button width="w-1/2" text="Create" onPress={handleCreateProfile} />
            </View>
        </LinearGradient>
    );
}

