import { View, Text, TextInput, ScrollView } from "react-native";
import { useState } from 'react'
import Button from './button'

export default function GymDays({ gymDays, setGymDays }: { gymDays: string[], setGymDays: any }) {

    const [dayModel, setDayModel] = useState<string>('')

    const handleAddDay = (day: string) => {
        setGymDays([...gymDays, day])
        setDayModel('')
    }
    const handleRemoveDay = (index: number) => {
        setGymDays(gymDays.filter((day, i) => i !== index))
    }

    return (
        <View className="flex justify-start bg-card-navy rounded-3xl mb-5 p-5">
            <View className="max-h-60 mb-2">
                <ScrollView className="flex-grow-0">
                    {gymDays.length > 0 ? (
                        gymDays.map((day, index) => (
                            <View key={index} className="bg-app-navy rounded-3xl p-2 mb-2 flex flex-row justify-between items-center">
                                <Text className="font-nexaHeavy text-white text-2xl px-2">{day} Day</Text>
                                <Button width="w-1/6" text="-" onPress={() => handleRemoveDay(index)} />
                            </View>
                        ))
                    ) : (
                        <Text className="text-white text-2xl font-nexaHeavy opacity-50 mb-5 ">No days added</Text>
                    )}
                </ScrollView>
            </View>
            <View className="flex flex-row justify-between gap-2">
                <TextInput placeholder="Add day" className="bg-white rounded-3xl font-nexaLight w-60 px-5" value={dayModel} onChangeText={setDayModel} />
                <Button width="w-1/4" text="Add" onPress={() => { dayModel !== '' && handleAddDay(dayModel) }} />
            </View>
        </View >
    );
}