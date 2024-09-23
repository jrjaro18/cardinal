import { View, Text, Vibration, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

const Remaing = () => {
    useEffect(() => {
        console.log("Remaing rendered")
    })
    return (
        <View
            className="flex flex-row justify-between"
        >
            <TouchableOpacity
                className=" w-[48.5%] p-2 bg-zinc-950 rounded-2xl elevation dark:bg-[#171717]"
                activeOpacity={0.5}
                onPress={() => {
                    //vibrate
                    Vibration.vibrate(15)
                }}
            >
                <Text className="text-zinc-50 text-xl" style={{ fontFamily: "Quicksand_400Regular" }}>
                    Tasks {"\n"}Remaining: <Text className="font-extrabold">99</Text>
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="w-[48.5%] p-2 bg-zinc-50 rounded-2xl border-2 dark:bg-zinc-100"
                onPress={() => {
                    //vibrate
                    Vibration.vibrate(15)
                }}
            >
                <Text className="text-xl tex-zinc-50" style={{ fontFamily: "Quicksand_400Regular" }}>
                    Goals {"\n"}Remaining: <Text className="font-extrabold">10</Text>
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default React.memo(Remaing)