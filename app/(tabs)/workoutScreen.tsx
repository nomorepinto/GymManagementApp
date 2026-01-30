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

function ExerciseCard({ exercise, isSelected, nextExercise, prevExercise }: { exercise: exercise, isSelected: boolean, nextExercise: any, prevExercise: any }) {

    const [isOverloadModalOpen, setIsOverloadModalOpen] = useState(false);

    return (
        <>
            <Animated.View
                layout={LinearTransition.springify().damping(80)} // This animates the height change
                className={`w-full rounded-3xl bg-card-navy border border-border-slate mb-3 overflow-hidden`}
            >
                {isSelected ? (
                    <Animated.View entering={FadeIn} exiting={FadeOut} key="expanded" className="p-5">
                        <Text className="text-white text-4xl font-nexaHeavy mb-2">{exercise.name}</Text>
                        <View className="flex flex-col">
                            <View className="rounded-full bg-slate-600 px-5 py-1 mb-2">
                                <Text className="text-white text-2xl font-nexaHeavy">
                                    Weight: {exercise.targetWeight} kg
                                </Text>
                            </View>

                            <View className="flex flex-row justify-between">
                                <View className="rounded-full bg-slate-600 px-5 py-1 min-w-[48%]">
                                    <Text className="text-white text-2xl font-nexaHeavy">
                                        Reps: {exercise.targetReps}
                                    </Text>
                                </View>

                                <View className="rounded-full bg-slate-600 px-5 py-1 min-w-[48%]">
                                    <Text className="text-white text-2xl font-nexaHeavy">
                                        Sets: {exercise.sets}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text>This is where the alarm will be</Text>
                        </View>
                        <View className="flex flex-row justify-between mt-2">
                            <Button width="w-[48%]" text="Previous" onPress={prevExercise} />
                            <Button width="w-[48%]" text="Next" onPress={nextExercise} />
                        </View>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeIn} exiting={FadeOut} key="collapsed" className="h-20 p-5 justify-center">
                        <Text className="text-white text-4xl font-nexaHeavy">{exercise.name}</Text>
                    </Animated.View>
                )}
                <OverloadModal isOpen={isOverloadModalOpen} onClose={() => setIsOverloadModalOpen(false)} overloadExercise={progressExercise()} />
            </Animated.View>
        </>
    )
}

export default function WorkoutScreen() {

    const router = useRouter();

    const [profileArray, setProfileArray] = useState<profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProfileId, setselectedProfileId] = useState<string | null>(null);
    const [exerciseArray, setExerciseArray] = useState<exercise[]>([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);


    const nextExercise = () => {
        setCurrentExerciseIndex(currentExerciseIndex >= exerciseArray.length - 1 ? currentExerciseIndex : currentExerciseIndex + 1);
    }
    const prevExercise = () => {
        setCurrentExerciseIndex(currentExerciseIndex === 0 ? currentExerciseIndex : currentExerciseIndex - 1);
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
                                            targetWeight: exercise.weight + (selectedProfile?.defaultWeightIncrease ?? 2.25),
                                            targetReps: exercise.targetReps + 2,

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
                            <ExerciseCard key={index} exercise={exercise} isSelected={index === currentExerciseIndex} nextExercise={nextExercise} prevExercise={prevExercise} />
                        ))}
                    </ScrollView>
                </View>

                <View className="flex items-center mt-5 mx-10 h-[15%]">
                    <Pressable className={`bg-action-red active:bg-btn-active rounded-full justify-center items-center w-full h-16`}
                        onPress={() => router.push('/')}>
                        <Text className="font-nexaHeavy text-white text-xl">End Workout</Text>
                    </Pressable>
                </View>
            </View>

        </LinearGradient>
    );
}