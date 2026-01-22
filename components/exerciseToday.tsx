import { View, Text } from "react-native";

export default function ExerciseToday({ exercise }: { exercise: string }) {
    return (
        <View className="mt-10 flex flex-col bg-secondary w-5/6 p-5 bg-secondarybg rounded-lg">
            <Text className="text-white text-xl font-nexaLight">Today you are going to do:</Text>
            <Text className="text-white text-3xl font-nexaHeavy my-2">{exercise}</Text>
        </View>
    );
}