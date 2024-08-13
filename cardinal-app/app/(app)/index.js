import { View, Text, TouchableOpacity, Vibration, ScrollView } from 'react-native'
import React, { useState, useCallback, useMemo, useLayoutEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { StatusBar } from 'react-native'
import { useFonts, Quicksand_400Regular, Quicksand_500Medium } from '@expo-google-fonts/dev'
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { Image } from 'expo-image'
import { FontAwesome6, Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const INITIAL_DATE = new Date().getTime();

const home = () => {
  const statusbarheight = StatusBar.currentHeight;
  const { logout } = useAuth()

  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const getDate = (count) => {
    const date = new Date(INITIAL_DATE);
    const newDate = new Date(date.setDate(date.getDate() + count)); // Create a new Date object
    return CalendarUtils.getCalendarDateString(newDate); // Pass the new Date object
  };


  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  useLayoutEffect(() => {
    setCurrentMonth(getDate(0));
    setSelected(getDate(0));
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'rgb(0, 122, 255)',
        selectedTextColor: 'white'
      }
    };
  }, [selected]);

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium
  })

  if (!fontsLoaded) {
    return null
  }


  return (
    <View
      style={{
        paddingTop: statusbarheight,
      }}

      className="p-3 flex-1 bg-stone-50"
    >
      <View className="mb-4">
        <View className="flex justify-between flex-row items-center">
          <Text
            style={{
              fontFamily: 'Quicksand_400Regular',
            }}
            className="text-5xl mt-5 tracking-wide">
            Cardinal
          </Text>
          <TouchableOpacity
            onPress={() => {
              //vibrate
              Vibration.vibrate(20)
            }}
          >
            <Image
              source="https://networthsize.com/wp-content/uploads/2020/04/Tom-Holland-Net-Worth-1920x1440.jpg"
              placeholder={"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["}
              className="w-11 h-11 rounded-full mt-4"
              transition={10}
              contentFit='cover'
            />
          </TouchableOpacity>

        </View>

        <Text
          style={{
            fontFamily: 'Quicksand_400Regular',
          }}
          className="text-lg ml-1"
        >
          {new Date().toDateString()}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} >

        {/* Calendar */}
        <View className="mb-7">
          <Calendar
            style={{
              borderRadius: 30,
              elevation: 2,
              paddingBottom: 10,
            }}
            theme={{
              arrowColor: "rgb(0, 122, 255)",
            }}
            current={currentMonth}
            onDayPress={onDayPress}
            markedDates={marked}
            onMonthChange={(month) => setCurrentMonth(month.dateString)}
          />

        </View>

        {/* Tasks and Goals */}
        <View
          className="flex flex-row justify-around"
        >
          <TouchableOpacity
            className=" w-[48%] p-2 bg-zinc-950 rounded-2xl elevation"
            activeOpacity={0.5}
            onPress={() => {
              //vibrate
              Vibration.vibrate(20)
            }}
          >
            <Text className="text-zinc-50 text-xl" style={{ fontFamily: "Quicksand_400Regular" }}>
              Tasks {"\n"}Remaining: <Text className="font-extrabold">99</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] p-2 bg-zinc-50 rounded-2xl border-2 elevation-[3]"
            onPress={() => {
              //vibrate
              Vibration.vibrate(20)
            }}
          >
            <Text className="text-xl tex-zinc-50" style={{ fontFamily: "Quicksand_400Regular" }}>
              Goals {"\n"}Remaining: <Text className="font-extrabold">10</Text>
            </Text>
          </TouchableOpacity>

        </View>

        {/* Show All Tasks */}
        <View className="my-3">
          <TouchableOpacity
            className=" bg-white rounded-xl mx-1 p-2 elevation h-14 flex justify-center items-center"
            onPress={() => {
              Vibration.vibrate(20)
            }}
          >
            <Text className="text-center text-lg"
              style={{ fontFamily: "Quicksand_500Medium" }}
            >
              Show All Tasks
            </Text>
          </TouchableOpacity>
        </View>

        {/* Icons for tasks */}
        <View className="flex flex-row justify-around my-3">
          <TouchableOpacity className="flex items-center"
            onPress={() => {
              Vibration.vibrate(20)
            }}
          >
            <View className="bg-stone-900 p-3 rounded-full h-16 w-16 justify-center flex items-center">
              <MaterialIcons name="task-alt" size={34} color="white" />
            </View>
            <Text className="text-center text-sm mt-1 font-semibold tracking-wide"
              style={{ fontFamily: "Quicksand_500Medium" }}
            >
              Add a{"\n"}Task
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center"
            onPress={() => {
              Vibration.vibrate(20)
            }}
          >
            <View className="bg-stone-900 p-3 rounded-full h-16 w-16 justify-center flex items-center">
              <MaterialCommunityIcons name="book-open-page-variant-outline" size={34} color="white" />
            </View>
            <Text className="text-center text-sm mt-1 font-semibold tracking-wide"
              style={{ fontFamily: "Quicksand_500Medium" }}
            >
              Start a{"\n"}Habit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center"
            onPress={() => {
              Vibration.vibrate(20)
            }}
          >
            <View className="bg-stone-900 p-3 rounded-full h-16 w-16 justify-center flex items-center">
              <Foundation name="mountains" size={34} color="white" />
            </View>
            <Text className="text-center text-sm mt-1 font-semibold tracking-wide"
              style={{ fontFamily: "Quicksand_500Medium" }}
            >
              Create a{"\n"}Goal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex items-center"
            onPress={() => {
              Vibration.vibrate(20)
            }}
          >
            <View className="bg-stone-900 p-3 rounded-full h-16 w-16 justify-center flex items-center">
              <MaterialIcons name="people-alt" size={34} color="white" />
            </View>
            <Text className="text-center text-sm mt-1 font-semibold tracking-wide"
              style={{ fontFamily: "Quicksand_500Medium" }}
            >
              Join a{"\n"}Group
            </Text>
          </TouchableOpacity>
        </View>

        {/* idea: missed and soon approaching deadline */}



        {/* Logout */}
        <TouchableOpacity onPress={() => logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
        
        <View className="h-20"></View>

      </ScrollView>

    </View>
  )
}

export default home

{/* <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity> */}