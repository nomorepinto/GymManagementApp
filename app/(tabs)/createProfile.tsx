import { View, Text, Pressable, TextInput } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from 'react'
import Button from '../../components/button'
import GymDays from '../../components/gymDays'



export default function CreateProfile() {

    const router = useRouter();

    return (
        <View className="flex-1 h-full w-full flex justify-center p-4 bg-secondarybg rounded-lg">
            <Text className="text-white text-2xl font-nexaHeavy mb-5">Create Profile</Text>
            <View className="flex justify-start">
                <Text className="text-white text-l font-nexaLight mb-2">Profile Name</Text>
            </View>
            <View className="flex justify-start mb-5">
                <TextInput placeholder="Name" className="bg-white rounded-md p-2 font-nexaLight" />
            </View>
            <View className="flex justify-start">
                <Text className="text-white text-l font-nexaLight mb-2">Gym Days</Text>
            </View>
            <GymDays />
            <View className="w-full items-end">
                <Button width="w-1/2" text="Create" onPress={() => { router.navigate('/') }} />
            </View>
        </View>
    );
}

