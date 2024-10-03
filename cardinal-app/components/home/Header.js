import { View, Text, TouchableOpacity, Vibration } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect } from 'react'

const Header = () => {
  useEffect(() => {
    console.log("Header rendered")
  })


  const date = new Date()
  const day = date.toLocaleString('default', { weekday: 'short' });
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();
  return (
    <View className="mb-4">
      <View className="flex justify-between flex-row items-center">
        <Text
          style={{
            fontFamily: 'Quicksand_400Regular',
          }}
          className="text-5xl mt-5 tracking-wide dark:text-neutral-50">
          Cardinal
        </Text>
        <TouchableOpacity
          onPress={() => {
            //vibrate
            Vibration.vibrate(15)
          }}
          onLongPress={() => {
            //vibrate
            Vibration.vibrate(30)
          }}
        >
          <Image
            source="https://th.bing.com/th/id/OIP.8DA7MLly0DhhVsdrhSwdOQHaE8?rs=1&pid=ImgDetMain"
            //placeholder={"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["}
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
        className="text-lg ml-1 dark:text-neutral-50"
      >
        {day + ', ' + month + ' ' + dayOfMonth + ', ' + year}
      </Text>

    </View>
  )
}

export default React.memo(Header)