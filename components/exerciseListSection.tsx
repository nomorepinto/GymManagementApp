import { View, Text, ScrollView } from "react-native";
import type { exercise, gymDay } from "app/(tabs)";
import Button from "./button";

function ExeciseListBullet({ exercise }: { exercise: exercise }) {
    return (
        <View className="flex w-5/6 h-3/4 p-5 bg-card-navy rounded-3xl">
            <Text className="text-white text-3xl font-nexaHeavy my-2">{exercise.name}</Text>
            <View className="flex-col">
                <Text className="text-white text-xl font-nexaLight">Sets: {exercise.sets}</Text>
                <Text className="text-white text-xl font-nexaLight">Reps: {exercise.reps}</Text>
            </View>
        </View>
    );
}

export default function ExerciseList({ gymDay }: { gymDay: gymDay }) {
    return (
        <View className="flex flex-col w-5/6 h-full p-5 bg-card-slate rounded-3xl">
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
                            <ExeciseListBullet key={exercise.id} exercise={exercise} />
                        ))
                    )}
                </ScrollView>
            </View>

        </View>
    );
}