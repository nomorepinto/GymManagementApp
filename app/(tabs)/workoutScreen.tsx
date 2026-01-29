import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import { useState, useCallback, useMemo } from "react";
import type { profile, exercise, gymDay } from "../../types";

export default function WorkoutScreen() {

    const [profileArray, setProfileArray] = useState<profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProfileId, setselectedProfileId] = useState<string | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

    const selectedDay = useMemo(() => {
        return profileArray.find(profile => profile.id === selectedProfileId)?.days[profileArray.find(profile => profile.id === selectedProfileId)?.currentDay ?? 0]
    }, [profileArray, selectedProfileId]);

    const selectedExercise = useMemo(() => {
        return selectedDay?.exercises[currentExerciseIndex]
    }, [selectedDay, currentExerciseIndex]);

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

    if (isLoading) {
        return (
            <View className="flex-1 bg-app-navy justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <LinearGradient colors={['#050E3C', '#000000']} className="flex-1 font-nexaLight h-screen">
            <View className="flex flex-col mx-10 items-center mt-16 border">
                <Text className="text-white text-4xl font-nexaHeavy mb-3">{selectedDay?.dayName} Day</Text>
                <View className="flex flex-col w-full h-80 rounded-3xl bg-card-navy p-5">
                    <Text className="text-white text-2xl font-nexaLight">Current Exercise</Text>
                    <Text className="text-white text-4xl font-nexaHeavy">
                        {selectedExercise?.name}
                    </Text>
                </View>
            </View>

        </LinearGradient>
    );
}