import { Modal, View, Text } from "react-native";
import Button from "./button";

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
}

export default function WarningModal({ isOpen, onClose, text }: WarningModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View className="flex-1 items-center justify-center">
                <View className="w-[85%] bg-card-navy p-6 rounded-3xl items-center shadow-lg">
                    <Text className="text-white text-2xl font-nexaHeavy mb-4 text-center">Warning</Text>
                    <Text className="text-white text-lg font-nexaLight mb-6 text-center">
                        {text}
                    </Text>
                    <View className="w-full items-center">
                        <Button
                            text="OK"
                            width="w-1/2"
                            onPress={onClose}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
