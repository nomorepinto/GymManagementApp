import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { useState, useCallback, useMemo, useEffect } from "react";
import type { profile, exercise, gymDay } from "../../types";
import Button from 'components/button';

import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

function ExerciseCard({ exercise, isSelected, nextExercise, prevExercise }: { exercise: exercise, isSelected: boolean, nextExercise: any, prevExercise: any }) {
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
        setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
    const prevExercise = () => {
        setCurrentExerciseIndex(currentExerciseIndex - 1);
    }

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

    if (isLoading) {
        return (
            <View className="flex-1 bg-app-navy justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <LinearGradient colors={['#050E3C', '#000000']} className="flex-1 font-nexaLight h-screen">
            <View className="flex flex-col mx-10 mt-16">
                <View>
                    {exerciseArray.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise} isSelected={index === currentExerciseIndex} nextExercise={nextExercise} prevExercise={prevExercise} />
                    ))}
                </View>

                <View className="flex items-center mt-5 mx-10">
                    <Pressable className={`bg-action-red active:bg-btn-active rounded-full justify-center items-center w-full h-16`}
                        onPress={() => router.push('/')}>
                        <Text className="font-nexaHeavy text-white text-xl">End Workout</Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    );
}