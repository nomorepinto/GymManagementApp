import { Pressable, Text } from "react-native";

export default function Button({ text, onPress, width }: { text: string, width: string, onPress: () => void }) {
    return (
        <Pressable className={`bg-action-red active:bg-btn-active rounded-full px-5 py-2 ${width} items-center justify-center`} onPress={onPress}>
            <Text className="font-nexaHeavy text-white text-md">{text}</Text>
        </Pressable>
    );
}
