import { View, Text, ScrollView } from "react-native";
import type { exercise, gymDay } from "app/(tabs)";
import Button from "./button";

export default function ExerciseList({ gymDay }: { gymDay: gymDay }) {
    return (
        <View className="flex flex-col bg-secondary w-5/6 h-full p-5 bg-thirdbg rounded-3xl">
            <View className="flex flex-row justify-between pb-4 border-b border-white/20">
                <Text className="text-white text-3xl font-nexaHeavy my-2 ml-2">Exercises</Text>
                <Button width="w-30" text="+ Add" onPress={() => { }} />
            </View>
            <View className="h-5/6">
                <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                    {gymDay.exercises.length === 0 ? (
                        <View className="flex items-center">
                            <Text className="text-white/50 text-center text-4xl font-nexaHeavy">{'No exercises \nadded yet'}</Text>
                        </View>
                    ) : (
                        gymDay.exercises.map((exercise) => (
                            <View key={exercise.id} className="flex flex-col border border-white bg-secondary w-5/6 h-3/4 p-5 bg-secondarybg rounded-lg">
                                <Text className="text-white text-3xl font-nexaHeavy my-2">{exercise.exerciseName}</Text>
                            </View>
                        ))
                    )}
                </ScrollView>
            </View>

        </View>
    );
}