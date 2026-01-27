import { View, Text, Pressable } from "react-native";
import Button from "./button";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ExerciseToday({ exercise, incrementDay }: { exercise: string, incrementDay: any }) {
    return (
        <View className="flex flex-row justify-between w-5/6  bg-card-navy rounded-3xl">
            <View className="w-[60%] p-5">
                <Text className="text-white text-xl font-nexaLight">Today's Plan:</Text>
                <Text className="text-white text-3xl font-nexaHeavy my-2">{exercise}</Text>
            </View>
            <View className="w-[40%] p-5 items-center justify-center opacity-50">
                <Pressable className="active:opacity-50 active:scale-95" onPress={() => { incrementDay() }}>
                    <AntDesign name="caret-right" size={80} color={`white`} />
                </Pressable>
            </View>
        </View>
    );
}