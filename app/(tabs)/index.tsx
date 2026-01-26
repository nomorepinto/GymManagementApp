import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import ExerciseToday from 'components/exerciseToday';
import ExerciseList from 'components/exerciseListSection';
import Button from 'components/button';
import AddExerciseModal from 'components/addExerciseModal';

import { useState, useEffect, useCallback, useMemo } from 'react';
import ProfileModal from 'components/profileModal';

export type exercise = {
    id: string;
    name: string;
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
    const [selectedProfileId, setselectedProfileId] = useState<string | null>(null);
    const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
    const [dimBackground, setDimBackground] = useState(false);

    const selectedProfile = useMemo(() => {
        return profileArray.find(profile => profile.id === selectedProfileId)
    }, [profileArray, selectedProfileId]);

    const saveProfileData = async (data: profile[]) => {
        try {
            await AsyncStorage.setItem('profileDataArray', JSON.stringify(data));
            console.log('Profile Updated')
        } catch (e) {
            console.log(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            const loadProfileData = async () => {
                try {
                    const existingData = await AsyncStorage.getItem('profileDataArray');
                    if (existingData) {
                        const parsedData: profile[] = JSON.parse(existingData);
                        setProfileArray(parsedData);
                        setselectedProfileId(parsedData[parsedData.length - 1].id);
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

    useEffect(() => {
        if (!isLoading && profileArray.length === 0) {
            router.replace('/createProfile');
        }
    }, [isLoading, profileArray.length]);

    const dimStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(dimBackground ? 0.3 : 1)
        }
    })

    useEffect(() => {
        if (profileModalOpen || addExerciseModalOpen) {
            setDimBackground(true);
        } else {
            setDimBackground(false);
        }
    }, [profileModalOpen, addExerciseModalOpen]);



    const activeDay = selectedProfile?.days[selectedProfile?.currentDay];



    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Storage successfully cleared!');
        } catch (e) {
            console.error('Failed to clear AsyncStorage:', e);
        }
    };

    const closeProfileModal = () => setProfileModalOpen(false);

    //SHIT THAT CHANGES THE DATA OF THE STATE

    const incrementDay = () => {
        setProfileArray(prev => prev.map(profile => profile.id === selectedProfileId ? { ...profile, currentDay: profile.currentDay + 1 } : profile))
        saveProfileData(profileArray);
    }

    const setExercise = (exercise: exercise) => {

        const updatedProfileArray = profileArray.map(profile =>
            profile.id === selectedProfileId ?
                {
                    ...profile, days: profile.days.map(day =>
                        day.id === profile.days[profile.currentDay].id ?
                            { ...day, exercises: [...day.exercises, exercise] }
                            : day
                    )
                }
                : profile
        );
        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);
        console.log("Exercise Added to profile " + profileArray.find(profile => profile.id === selectedProfileId)?.name);
    };

    //BORDER

    if (isLoading) {
        return (
            <View className="flex-1 bg-app-navy justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
            <LinearGradient colors={['#050E3C', '#000000']} className="flex-1 font-nexaLight h-screen">
                <Animated.View style={dimStyle} className={`flex mt-14`}>
                    <View className="flex flex-row mx-10 mt-5 justify-between h-12 items-center ">
                        <View className="flex items-left w-[70%]">
                            <Text className="text-white text-4xl font-nexaHeavy" ellipsizeMode="tail" numberOfLines={1}>Hello {selectedProfile?.name}</Text>
                        </View>

                        <View className="flex self-end justify-end w-[30%]">
                            <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-5 py-2 items-center h-full justify-center`} onPress={() => setProfileModalOpen(true)}>
                                <Text className="font-nexaHeavy text-white text-s">Switch</Text>
                            </Pressable>
                        </View>
                    </View>
                    <ProfileModal isOpen={profileModalOpen} profileArray={profileArray} setSelectedProfileId={setselectedProfileId} onClose={closeProfileModal} />
                    <View className="flex items-center mt-5">
                        <ExerciseToday exercise={activeDay?.dayName + ' Day'} />
                        <AddExerciseModal isOpen={addExerciseModalOpen}
                            onClose={() => setAddExerciseModalOpen(false)}
                            gymDay={activeDay ? activeDay : { id: '', dayName: '', exercises: [] }}
                            setExercise={setExercise}
                        />
                    </View>
                    <View className="flex items-center mt-5 h-[60%]">
                        <ExerciseList gymDay={activeDay ? activeDay : { id: '', dayName: '', exercises: [] }} setAddExerciseModalOpen={setAddExerciseModalOpen} />
                    </View>
                    <View className="flex items-center mt-5 mx-10">
                        <Pressable className={`bg-action-red active:bg-btn-active rounded-full p-2 justify-center items-center w-full h-28`} onPress={() => { }}>
                            <Text className="font-nexaHeavy text-white text-3xl">Start Workout</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </LinearGradient >
            <Button width="w-full" text='Clear All Data' onPress={clearAllData} />
        </KeyboardAvoidingView>

    );
}
