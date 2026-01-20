import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from 'react'
import GymDays from './gymDays'


export default function CreateProfile() {

    return (
        <View className="my-auto mx-auto w-3/4 flex justify-center p-4 bg-secondarybg rounded-lg">
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
                <Pressable className="bg-primarytext active:bg-accent rounded-md p-2 w-1/2 items-center">
                    <Text className="font-nexaHeavy text-white">Create</Text>
                </Pressable>
            </View>
        </View>
    );
}

