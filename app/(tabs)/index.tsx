import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ExerciseToday from 'components/exerciseToday';
import ExerciseList from 'components/exerciseListSection';
import Button from 'components/button';
import AddExerciseModal from 'components/addExerciseModal';
import SettingsModal from 'components/settingsModal';
import { useState, useEffect, useCallback, useMemo } from 'react';
import ProfileModal from 'components/profileModal';
import WarningModal from 'components/warningModal';

import { exercise, gymDay, profile, DEFAULT_PROFILE } from '../../types';

export default function App() {

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const [profileArray, setProfileArray] = useState<profile[]>([])
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [selectedProfileId, setselectedProfileId] = useState<string | null>(null);
    const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false);
    const [dimBackground, setDimBackground] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [warningModalOpen, setWarningModalOpen] = useState(false);

    const selectedProfile = useMemo(() => {
        return profileArray.find(profile => profile.id === selectedProfileId)
    }, [profileArray, selectedProfileId]);

    const saveProfileData = async (data: profile[]) => {
        try {
            await AsyncStorage.setItem('profileDataArray', JSON.stringify(data));
            console.log('Asynch Storage Profile Updated')
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
                        setselectedProfileId(parsedData.find(profile => profile.isSelected)?.id || null);
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

        if (profileArray.length === 0 || !selectedProfileId) return;

        const updatedProfileArray = profileArray.map(profile => ({
            ...profile,
            isSelected: profile.id === selectedProfileId
        }));

        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);

        console.log(updatedProfileArray.map(profile => profile.isSelected ? (profile.name + "[selected]") : profile.name));

    }, [selectedProfileId]);

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
        if (profileModalOpen || addExerciseModalOpen || settingsModalOpen || warningModalOpen) {
            setDimBackground(true);
        } else {
            setDimBackground(false);
        }
    }, [profileModalOpen, addExerciseModalOpen, settingsModalOpen, warningModalOpen]);



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

    const deleteProfile = () => {
        if (profileArray.length <= 1) {
            router.replace('/createProfile');
            clearAllData();
            return;
        }
        const updatedProfileArray = profileArray.filter(profile => profile.id !== selectedProfileId);
        setselectedProfileId(updatedProfileArray[(updatedProfileArray.findIndex(profile => profile.id === selectedProfileId) + 1) % updatedProfileArray.length].id);
        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);
        console.log("Profile Deleted")
    }

    const incrementDay = () => {
        const updatedProfileArray = profileArray.map(profile =>
            profile.id === selectedProfileId ?
                { ...profile, currentDay: (profile.currentDay + 1) % profile.days.length }
                : profile
        )
        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);
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

    const removeExercise = (exerciseId: string) => {
        const updatedProfileArray = profileArray.map(profile =>
            profile.id === selectedProfileId ?
                {
                    ...profile, days: profile.days.map(day =>
                        day.id === profile.days[profile.currentDay].id ?
                            { ...day, exercises: day.exercises.filter(ex => ex.id !== exerciseId) }
                            : day
                    )
                }
                : profile
        );
        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);
        console.log("Exercise removed");
    }

    const progressExercise = (exerciseId: string) => {
        const updatedProfileArray = profileArray.map(profile =>
            profile.id === selectedProfileId ?
                {
                    ...profile, days: profile.days.map(day =>
                        day.id === profile.days[profile.currentDay].id ?
                            {
                                ...day, exercises: day.exercises.map(exercise =>
                                    exercise.id === exerciseId ?
                                        {
                                            ...exercise,
                                            weight: exercise.targetWeight,
                                            reps: exercise.targetReps,
                                            targetWeight: exercise.weight + 2.25,
                                            targetReps: exercise.reps + 2,

                                        }
                                        : exercise
                                )
                            }
                            : day
                    )
                }
                : profile
        );
        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);
        console.log("Exercise overloaded");
    }

    const updateSetting = (key: string, settingValue: number) => {
        const updatedProfileArray = profileArray.map(profile =>
            profile.id === selectedProfileId ?
                {
                    ...profile,
                    [key]: settingValue
                }
                : profile
        );
        setProfileArray(updatedProfileArray);
        saveProfileData(updatedProfileArray);
        console.log("Setting updated");
    }

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
                <Animated.View style={dimStyle} className={`flex-col mt-14`}>
                    <View className="flex flex-row mx-10 justify-between h-12 items-center ">
                        <Pressable className="flex items-left w-[84%]" onPress={() => setProfileModalOpen(true)}>
                            <Text className="text-white text-4xl font-nexaHeavy" ellipsizeMode="tail" numberOfLines={1}>Hi, {selectedProfile?.name}</Text>
                        </Pressable>

                        <View className="flex self-end justify-end w-[14%]">
                            <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-2 py-2 items-center h-full justify-center`} onPress={() => setSettingsModalOpen(true)}>
                                <Text className="font-nexaHeavy text-white text-sm"><FontAwesome name="gear" size={20} color="white" /></Text>
                            </Pressable>
                        </View>
                    </View>
                    <View className="flex items-center justify-center mt-5">
                        <ExerciseToday exercise={activeDay?.dayName + ' Day'} incrementDay={incrementDay} />
                    </View>
                    <View className="flex items-center mt-5 h-[60%]">
                        <ExerciseList gymDay={activeDay ? activeDay : { id: '', dayName: '', exercises: [] }} setAddExerciseModalOpen={setAddExerciseModalOpen} removeExercise={removeExercise} />
                    </View>
                    <View className="flex items-center mt-5 mx-10">
                        <Pressable className={`bg-action-red active:bg-btn-active rounded-full p-2 justify-center items-center w-full h-28`}
                            onPress={() => {
                                selectedProfile?.days[selectedProfile?.currentDay].exercises.length === 0 ? setWarningModalOpen(true) : router.push('/workoutScreen')
                            }}>
                            <Text className="font-nexaHeavy text-white text-3xl">Start Workout</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </LinearGradient >
            <ProfileModal isOpen={profileModalOpen} profileArray={profileArray} setSelectedProfileId={setselectedProfileId} onClose={closeProfileModal} />
            <AddExerciseModal isOpen={addExerciseModalOpen}
                onClose={() => setAddExerciseModalOpen(false)}
                gymDay={activeDay ? activeDay : { id: '', dayName: '', exercises: [] }}
                setExercise={setExercise}
                defaultMinReps={selectedProfile?.defaultMinReps ? selectedProfile.defaultMinReps : 8}
                defaultMaxReps={selectedProfile?.defaultMaxReps ? selectedProfile.defaultMaxReps : 12}
                defaultRestTime={selectedProfile?.defaultRestTime ? selectedProfile.defaultRestTime : 150}
                defaultWeightIncrease={selectedProfile?.defaultWeightIncrease ? selectedProfile.defaultWeightIncrease : 2.25}
            />
            <SettingsModal selectedProfile={selectedProfile ? selectedProfile : DEFAULT_PROFILE} updateSetting={updateSetting} isOpen={settingsModalOpen} onClose={() => setSettingsModalOpen(false)} deleteProfile={deleteProfile} />
            <WarningModal isOpen={warningModalOpen} onClose={() => setWarningModalOpen(false)} text="Add Exercises Before Starting Workout" />
        </KeyboardAvoidingView>

    );
}
