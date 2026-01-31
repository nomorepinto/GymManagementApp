import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import { useState, useCallback, useMemo, useEffect } from "react";
import type { profile, exercise, gymDay } from "../../types";
import Button from 'components/button';
import OverloadModal from 'components/overloadModal'

import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

interface ExerciseCardProps {
    exercise: exercise;
    isSelected: boolean;
    nextExercise: any;
    selectExercise: any;
    incrementExerciseLimit: any;
    progressExercise: any;
}

function ExerciseCard({ exercise, isSelected, nextExercise, selectExercise, incrementExerciseLimit, progressExercise }: ExerciseCardProps) {

    const formatNumber = (number: number) => Number(number.toFixed(2))

    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    return (
        <Pressable onPress={selectExercise}>
            <Animated.View
                layout={LinearTransition.springify().damping(90)} // This animates the height change
                className={`w-full rounded-3xl bg-card-navy border border-border-slate mb-3 overflow-hidden`}
            >
                {isSelected && !isCompleted ? (
                    <Animated.View entering={FadeIn} exiting={FadeOut} key="expanded" className="p-5">
                        {
                            isCompleted ? (
                                <Text className="text-white text-4xl font-nexaHeavy mb-2 line-through">{exercise.name}</Text>
                            ) : (
                                <Text className="text-white text-4xl font-nexaHeavy mb-2">{exercise.name}</Text>
                            )
                        }
                        <View className="flex flex-col">
                            <View className="rounded-full bg-slate-600 px-5 py-1 mb-2">
                                <Text className="text-white text-xl font-nexaHeavy">
                                    Weight: {formatNumber(exercise.targetWeight)} kg
                                </Text>
                            </View>

                            <View className="flex flex-row justify-between">
                                <View className="rounded-full bg-slate-600 px-5 py-1 min-w-[48%]">
                                    <Text className="text-white text-xl font-nexaHeavy">
                                        Reps: {exercise.targetReps}
                                    </Text>
                                </View>

                                <View className="rounded-full bg-slate-600 px-5 py-1 min-w-[48%]">
                                    <Text className="text-white text-xl font-nexaHeavy">
                                        Sets: {exercise.sets}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between mt-2">
                            <Button width="w-[48%]" text="Failed" onPress={() => { incrementExerciseLimit(); nextExercise(); setIsCompleted(true) }} />
                            <Button width="w-[48%]" text="Completed" onPress={() => { incrementExerciseLimit(); nextExercise(); progressExercise(exercise.id); setIsCompleted(true) }} />
                        </View>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeIn} exiting={FadeOut} key="collapsed" className="h-20 p-5 justify-center">
                        {isCompleted ? (
                            <Text className="text-white text-4xl font-nexaHeavy opacity-50 line-through">{exercise.name}</Text>
                        ) : (
                            <Text className="text-white text-4xl font-nexaHeavy">{exercise.name}</Text>
                        )}
                    </Animated.View>
                )}
            </Animated.View>
        </Pressable>
    )
}

export default function WorkoutScreen() {

    const router = useRouter();

    const [profileArray, setProfileArray] = useState<profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProfileId, setselectedProfileId] = useState<string | null>(null);
    const [exerciseArray, setExerciseArray] = useState<exercise[]>([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
    const [currentExerciseLimit, setCurrentExerciseLimit] = useState<number>(0);

    const incrementExerciseLimit = () => {
        setCurrentExerciseLimit(currentExerciseLimit + 1);
    }

    const nextExercise = () => {
        setCurrentExerciseIndex(currentExerciseIndex >= exerciseArray.length - 1 ? currentExerciseIndex : currentExerciseIndex + 1);
    }
    const prevExercise = () => {
        setCurrentExerciseIndex(currentExerciseIndex === currentExerciseLimit ? currentExerciseIndex : currentExerciseIndex - 1);
    }

    const selectExercise = (index: number) => {
        setCurrentExerciseIndex(index);
    }

    const selectedProfile = useMemo(() => {
        return profileArray.find(profile => profile.id === selectedProfileId);
    }, [profileArray, selectedProfileId]);

    const selectedDay = useMemo(() => {
        return profileArray.find(profile => profile.id === selectedProfileId)?.days[profileArray.find(profile => profile.id === selectedProfileId)?.currentDay ?? 0]
    }, [profileArray, selectedProfileId]);

    useEffect(() => {
        if (selectedDay) {
            setExerciseArray(selectedDay.exercises);
        }
    }, [selectedDay]);

    useFocusEffect(
        useCallback(() => {
            const loadProfileData = async () => {
                try {
                    const existingData = await AsyncStorage.getItem('profileDataArray');
                    if (existingData) {
                        const parsedData: profile[] = JSON.parse(existingData);
                        setProfileArray(parsedData);
                        setselectedProfileId(parsedData.find(profile => profile.isSelected)?.id ?? null);
                        console.log('Asynch Storage Profile Loaded into Workout Screen')
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

    const saveProfileData = async (data: profile[]) => {
        try {
            await AsyncStorage.setItem('profileDataArray', JSON.stringify(data));
            console.log('Asynch Storage Profile Updated')
        } catch (e) {
            console.log(e);
        }
    }

    const progressExercise = (exerciseId: string) => {
        const updatedDay = {
            ...selectedDay,
            exercises: selectedDay?.exercises.map(exercise =>
                exercise.id === exerciseId ?
                    {
                        ...exercise,
                        weight: exercise.targetWeight,
                        reps: exercise.targetReps,
                        targetWeight: exercise.weight + (selectedProfile?.defaultWeightIncrease ?? 2.25),
                        targetReps: exercise.targetReps + 2,
                    }
                    : exercise
            )
        }
        const updatedProfileArray = profileArray.map(profile =>
            profile.id === selectedProfileId ?
                {
                    ...profile,
                    days: profile.days.map((day, index) =>
                        index === profile.currentDay ? updatedDay : day
                    )
                } :
                profile
        );
        saveProfileData(updatedProfileArray as profile[]);
    }

    const handleEndWorkout = () => {
        router.replace('/');
        setCurrentExerciseIndex(0);
        setExerciseArray([]);
        setProfileArray([]);
        setselectedProfileId(null);
    }

    const setAlarm = async (seconds: number) => {
        // 1. Get the current time in milliseconds and add the 'seconds' duration.
        // This creates a fixed point in future history.
        const triggerTime = Date.now() + (seconds * 1000);

        // 2. Save that future point to storage so if the app restarts, 
        // it remembers when it was supposed to go off.
        await AsyncStorage.setItem('alarm_target_time', triggerTime.toString());

        // 3. Request the OS to schedule a push notification.
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Time's Up!",
                body: "Your rest period is over.",
                sound: true, // Uses the user's default notification sound
            },
            // The 'trigger' tells the OS exactly how many seconds to wait.
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: seconds
            },
        });
    };


    if (isLoading) {
        return (
            <View className="flex-1 bg-app-navy justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <LinearGradient colors={['#050E3C', '#000000']} className="flex-1 font-nexaLight h-screen">
            <View className="flex flex-col mx-10 mt-20">
                <View className="h-[80%]">
                    <ScrollView className="flex-1">
                        {exerciseArray.map((exercise, index) => (
                            <ExerciseCard key={index} exercise={exercise} isSelected={index === currentExerciseIndex} nextExercise={nextExercise} selectExercise={() => selectExercise(index)} incrementExerciseLimit={incrementExerciseLimit} progressExercise={() => { progressExercise(exercise.id) }} />
                        ))}
                    </ScrollView>
                </View>

                <View className="flex items-center mt-5 mx-10 h-[15%]">
                    <Pressable className={`bg-action-red active:bg-btn-active rounded-full justify-center items-center w-full h-16`}
                        onPress={() => handleEndWorkout()}>
                        <Text className="font-nexaHeavy text-white text-xl">End Workout</Text>
                    </Pressable>
                </View>
            </View>

        </LinearGradient>
    );
}