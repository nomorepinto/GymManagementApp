import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useState } from 'react'

export default function GymDays() {

    const [days, setDays] = useState<string[]>([])
    const [dayModel, setDayModel] = useState<string>('')

    const handleAddDay = (day: string) => {
        setDays([...days, day])
        setDayModel('')
    }
    const handleRemoveDay = (index: number) => {
        setDays(days.filter((day, i) => i !== index))
    }

    return (
        <View className="flex justify-start bg-primarybg rounded-lg mb-5 p-5">
            <View className="max-h-60">
                <ScrollView className="flex-grow-0">
                    {days.length > 0 ? (
                        days.map((day, index) => (
                            <View key={index} className="bg-secondarybg rounded-md p-2 mb-2 flex flex-row justify-between items-center">
                                <Text className="font-nexaLight text-white">{day} Day</Text>
                                <Pressable className="bg-primarytext active:bg-accent rounded-md p-2 w-1/8" onPress={() => handleRemoveDay(index)}><Text className="font-nexaHeavy text-white">-</Text></Pressable>
                            </View>
                        ))
                    ) : (
                        <Text className="text-white text-xl font-nexaHeavy opacity-50 mb-5">No days added</Text>
                    )}
                </ScrollView>
            </View>
            <View className="flex flex-row justify-between gap-2">
                <TextInput placeholder="Add day" className="bg-white rounded-md p-2 font-nexaLight w-3/4" value={dayModel} onChangeText={setDayModel} />
                <Pressable className="bg-primarytext active:bg-accent rounded-md p-2 w-1/4 items-center" onPress={() => handleAddDay(dayModel)}>
                    <Text className="font-nexaHeavy text-white">Add</Text>
                </Pressable>
            </View>
        </View >
    );
}