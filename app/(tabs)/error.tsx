import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ErrorBoundary() {
    useEffect(() => {
        // Log the error to an error reporting service
        console.log("Error occured")
    }, []);

    return (
        <View className="flex-1 bg-[#121212] items-center justify-center p-6">
            <LinearGradient
                colors={['#FF4B2B', '#FF416C']}
                className="w-24 h-24 rounded-full items-center justify-center mb-6 shadow-xl"
                style={{ elevation: 10 }}
            >
                <MaterialCommunityIcons name="alert-circle-outline" size={48} color="white" />
            </LinearGradient>

            <Text className="text-white text-3xl font-bold text-center mb-2">
                Oops!
            </Text>

            <Text className="text-gray-400 text-lg text-center mb-8 px-4">
                Something unexpected happened. We're working on getting it fixed.
            </Text>
        </View>
    );
}
