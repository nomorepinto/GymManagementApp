import { Pressable, Text } from "react-native";

export default function Button({ text, onPress, width }: { text: string, width: string, onPress: () => void }) {
    return (
        <Pressable className={`bg-primarytext active:bg-accent rounded-md p-2 ${width} items-center`} onPress={onPress}>
            <Text className="font-nexaHeavy text-white">{text}</Text>
        </Pressable>
    );
}
