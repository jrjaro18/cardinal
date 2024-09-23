import { View, Text, TouchableOpacity, Vibration } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, Foundation } from '@expo/vector-icons'
import React from 'react'

const TaskIcons = () => {
    return (
        <View className="flex flex-row gap-x-6 justify-around mt-5">
            <TouchableOpacity className="flex items-center"
                onPress={() => {
                    Vibration.vibrate(15)
                }}
            >
                <View className="bg-neutral-900 p-3 rounded-full h-16 w-16 justify-center flex items-center dark:bg-[#171717]">
                    <MaterialIcons name="task-alt" size={34} color="white" />
                </View>
                <Text className="text-center text-sm mt-1 font-semibold tracking-wide dark:text-neutral-50"
                    style={{ fontFamily: "Quicksand_500Medium" }}
                >
                    Add a{"\n"}Task
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center"
                onPress={() => {
                    Vibration.vibrate(15)
                }}
            >
                <View className="bg-neutral-900 p-3 rounded-full h-16 w-16 justify-center flex items-center dark:bg-[#171717]">
                    <MaterialCommunityIcons name="book-open-page-variant-outline" size={34} color="white" />
                </View>
                <Text className="text-center text-sm mt-1 font-semibold tracking-wide dark:text-neutral-50"
                    style={{ fontFamily: "Quicksand_500Medium" }}
                >
                    Start a{"\n"}Routine
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center"
                onPress={() => {
                    Vibration.vibrate(15)
                }}
            >
                <View className="bg-neutral-900 p-3 rounded-full h-16 w-16 justify-center flex items-center dark:bg-[#171717]">
                    <Foundation name="mountains" size={34} color="white" />
                </View>
                <Text className="text-center text-sm mt-1 font-semibold tracking-wide dark:text-neutral-50"
                    style={{ fontFamily: "Quicksand_500Medium" }}
                >
                    Create a{"\n"}Goal
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center"
                onPress={() => {
                    Vibration.vibrate(15)
                }}
            >
                <View className="bg-neutral-900 p-3 rounded-full h-16 w-16 justify-center flex items-center dark:bg-[#171717]">
                    <MaterialIcons name="people-alt" size={34} color="white" />
                </View>
                <Text className="text-center text-sm mt-1 font-semibold tracking-wide dark:text-neutral-50"
                    style={{ fontFamily: "Quicksand_500Medium" }}
                >
                    Join a{"\n"}Group
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(TaskIcons)