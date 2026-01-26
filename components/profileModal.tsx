import { Modal, View, Text, ScrollView, Pressable } from "react-native";
import Button from "./button";
import type { profile } from "../app/(tabs)/index";
import { useRouter } from "expo-router";


export default function ProfileModal({ isOpen, profileArray, setSelectedProfile, onClose }: { isOpen: boolean, profileArray: profile[], setSelectedProfile: any, onClose: () => void }) {

    const router = useRouter();

    const handleSelectProfile = (profile: profile) => {
        setSelectedProfile(profile);
        onClose();
    }

    const handleCreateNewProfile = () => {
        router.replace('/createProfile');
        onClose();
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <View className="flex-1 items-center justify-center">
                <View className="w-3/4 flex rounded-3xl p-5 bg-card-navy">
                    <View className="flex justify-end self-center">
                        <Text className="text-white text-2xl font-nexaHeavy">Select Profile</Text>
                    </View>
                    <View className="max-h-40 px-5 rounded-3xl bg-app-navy mt-5">
                        <ScrollView className="flex-grow-0 w-full">
                            {profileArray.map((profile) => (
                                <Pressable key={profile.id} className="flex p-2 border-b border-slate active:bg-item-active rounded-md" onPress={() => handleSelectProfile(profile)}>
                                    <Text className="text-white text-2xl font-nexaLight">{profile.name} Profile</Text>
                                </Pressable>
                            ))}
                            <Pressable key="createNewProfile" className="bg-action-red flex px-2 m-2 border-b border-slate active:bg-item-active rounded-full" onPress={handleCreateNewProfile}>
                                <Text className="text-white text-2xl font-nexaLight">Create New Profile</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                    <View className="flex justify-end items-left mt-5 self-end w-1/2">
                        <Button width="w-full" text="Close" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}