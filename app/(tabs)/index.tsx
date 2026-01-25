import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ExerciseToday from 'components/exerciseToday';
import ExerciseList from 'components/exerciseListSection';
import Button from 'components/button';

import { useState, useEffect, useCallback } from 'react';
import ProfileModal from 'components/profileModal';

export type exercise = {
    id: string;
    exerciseName: string;
    weight: number;
    sets: number;
    reps: number;
    restTime: number;
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
}

export default function App() {

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const [profileArray, setProfileArray] = useState<profile[]>([])
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<profile | null>(null);

    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Storage successfully cleared!');
        } catch (e) {
            console.error('Failed to clear AsyncStorage:', e);
        }
    };

    const closeProfileModal = () => setProfileModalOpen(false);

    useFocusEffect(
        useCallback(() => {
            const loadProfileData = async () => {
                try {
                    const existingData = await AsyncStorage.getItem('profileDataArray');
                    if (existingData) {
                        const parsedData: profile[] = JSON.parse(existingData);
                        setProfileArray(parsedData);
                        setSelectedProfile(parsedData[parsedData.length - 1]);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    setIsLoading(false);
                }
            };
            loadProfileData();
        }, [])
    );

    if (isLoading) {
        return (
            <View className="flex-1 bg-primarybg justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (profileArray.length === 0) {
        return (
            <View className="flex-1 bg-primarybg justify-center items-center">
                <Button width="w-1/2" text='Create First Profile' onPress={() => router.navigate('/createProfile')} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <View className="flex-1 font-nexaLight bg-primarybg">
                <View className="flex mt-14">
                    <View className="flex flex-row mx-10 mt-5 justify-between h-12 items-center ">
                        <View className="flex items-left w-[70%]">
                            <Text className="text-white text-4xl font-nexaHeavy" ellipsizeMode="tail" numberOfLines={1}>Hello {selectedProfile?.name}</Text>
                        </View>

                        <View className="flex self-end justify-end w-[30%]">
                            <Pressable className={`bg-primarytext active:bg-accent rounded-full px-5 py-2 items-center h-full justify-center`} onPress={() => setProfileModalOpen(true)}>
                                <Text className="font-nexaHeavy text-white text-s">Switch</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ProfileModal isOpen={profileModalOpen} profileArray={profileArray} setSelectedProfile={setSelectedProfile} onClose={closeProfileModal} />
                    <View className="flex items-center mt-5">
                        <ExerciseToday exercise={selectedProfile ? selectedProfile.days[selectedProfile.currentDay].dayName + ' Day' : 'No profile yet'} />
                    </View>
                    <View className="flex items-center mt-5 h-[60%]">
                        <ExerciseList gymDay={selectedProfile ? selectedProfile.days[selectedProfile.currentDay] : { id: '', dayName: '', exercises: [] }} />
                    </View>
                    <View className="flex items-center mt-5 mx-10">
                        <Pressable className={`bg-primarytext active:bg-accent rounded-full p-2 justify-center items-center w-full h-28`} onPress={() => { }}>
                            <Text className="font-nexaHeavy text-white text-3xl">Start Workout</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Button width="w-full" text='Clear All Data' onPress={clearAllData} />
        </KeyboardAvoidingView>
    );
}
