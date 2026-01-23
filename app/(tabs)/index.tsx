import { View, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ExerciseToday from 'components/exerciseToday';
import Button from 'components/button';

import { useState, useEffect } from 'react';

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


    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const existingData = await AsyncStorage.getItem('profileDataArray');
                if (existingData) {
                    const parsedData: profile[] = JSON.parse(existingData);
                    setProfileArray(parsedData);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadProfileData();
    }, []);

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
                    <View className="flex items-left ml-10 mb-3">
                        <Button text='Create New Profile' width="w-1/2" onPress={() => { router.navigate('/createProfile') }} />
                    </View>
                    <View className="flex items-left ml-10 mb-3">
                        <Text className="text-white text-2xl font-nexaHeavy">Hello {profileArray[0].name}</Text>
                    </View>
                    <View className="flex items-center">
                        <ExerciseToday exercise='Back Day' />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
