import { View, Text, TouchableOpacity, Vibration, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useMemo } from 'react'

const Routines = ({theme}) => {

    const gradient = useMemo(() => [
        ['#b20a2c', '#fffbd5'], // yellow to red
        ['#FFC371', '#FF5F6D'], //  cyan to green
        ['#E2D1C3', '#FDFCFB'], // warm white to beige
        ['#96e6a1','#d4fc79'], // light green to mint
    ], [])

    useEffect(() => {
        console.log("Routines rendered")
    })

    return (
        <View className="mt-3">
            <Text
                className="text-2xl font-semibold dark:text-neutral-50"
                style={{ fontFamily: "Quicksand_500Medium" }}
            >
                Your Routines
            </Text>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    if (item.title === "empty") {
                        return <View className="w-[14vw]" />
                    }
                    return (
                        <TouchableOpacity
                            onLongPress={() => {
                                Vibration.vibrate(50)
                            }}
                            onPress={() => {
                                Vibration.vibrate(10)
                            }}

                            activeOpacity={0.75}
                        >
                            <LinearGradient
                                // keep using the gradient array in ROTATION
                                colors={gradient[index % gradient.length]}
                                start={[0.5, 0]}
                                end={[1, 0.5]}
                                style={{
                                    padding: 5,
                                    margin: 10,
                                }}
                                className="rounded-xl h-[60vw] w-[60vw] flex justify-center items-center"
                            >
                                <TouchableOpacity className="absolute rounded-lg top-[2.2%] right-[2%] p-1  dark:border-none"
                                    onPress={() => {
                                        Vibration.vibrate(10)
                                    }}
                                >
                                    <Ionicons name="ellipsis-vertical" size={21} color={"black"} />
                                </TouchableOpacity>

                                {
                                    item.completed ? (
                                        <View className="absolute rounded-lg bottom-[2.2%] left-[2%] p-1 bg-neutral-50 dark:bg-neutral-950 w-28">
                                            <Text className="text-base text-green-950 dark:text-green-50 text-center"
                                                style={{ fontFamily: "Quicksand_500Medium" }}
                                            >
                                                Completed
                                            </Text>
                                        </View>
                                    ) : (
                                        null
                                    )
                                }
                                <Text className="text-lg" style={{ fontFamily: "Quicksand_500Medium" }}>
                                    {item.title}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )
                }}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"center"}
                pagingEnabled
                decelerationRate={"fast"}
                maxToRenderPerBatch={3}
                initialNumToRender={3}
                windowSize={3}

            />
        </View>
    )
}

const MemoizedRoutines = React.memo(Routines)

export default MemoizedRoutines

const data = [
    {
        title: "Yoga 🧘🏽‍♀️ for 30 Minutes",
        completed: false,
        id: 1
    },
    {
        title: "Jog at least for 20 Minutes 🏃🏼‍♂️",
        completed: false,
        id: 2
    },
    {
        title: "Complete College Assignments 📝",
        completed: false,
        id: 5
    },
    {
        title: "Do 10 Pushups 💪🏼",
        completed: false,
        id: 6
    },
    {
        title: "Read 25 Pages 📚",
        completed: true,
        id: 3
    },
    {
        title: "Solve 5 DSA Questions 🖥️",
        completed: true,
        id: 4
    },
    {
        title: "empty",
        id: 99999
    }
]