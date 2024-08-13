import { View, Text, Animated, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import LottieView from 'lottie-react-native';
import { Keyboard } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const index = () => {
  // check if keyboard is open
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keyboardDidShow = () => setKeyboardOpen(true);
  const keyboardDidHide = () => setKeyboardOpen(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow', keyboardDidShow);
      Keyboard.removeAllListeners('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  // animation
  const ref = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    //explanation: the ref is the value that will be animated, the toValue is the value that the ref will be animated to, the duration is the time it will take to animate to the toValue, and the useNativeDriver is a boolean that tells the animation to be done on the native side of the app.
    Animated.loop(
      Animated.sequence([
        Animated.timing(ref, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(ref, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [ref]);

  // login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()


  return (
    <View className="flex-1 bg-stone-950" >
      <Animated.View
        className="rounded-b-3xl bg-zinc-50"
        style={{
          height: keyboardOpen ? '47%' : '64%'
        }}
      >

        <LottieView
          source={require('../../assets/onb2.json')}
          autoPlay
          style={{
            width: '100%',
            height: "90%",
          }}
        />
      </Animated.View>

      <ImageBackground
        source={require('../../assets/Onboarding.jpg')}
        className="h-full pt-6 px-3"
        resizeMode={"cover"}
        blurRadius={30}
      >
        <Text className="font-thin text-3xl text-center text-white tracking-wide">
          Let's Get Started!
        </Text>
        <View className="flex gap-3 mt-2 items-center">
          <TextInput
            className="h-12 w-[90%] pl-3 rounded-t-lg rounded-b-md tracking-wide"
            cursorColor={"black"}
            selectionColor={"rgba(0,0,0,0.15)"}
            placeholder='Email'
            placeholderTextColor={"rgba(0,0,0,0.75)"}
            style={{ backgroundColor: "rgba(255,255,255,0.42)" }}
            keyboardType='email-address'
            onChangeText={(e) => setEmail(e)}
          />
          {/* an appropriate input field for password */}
          <TextInput
            className="bg-white h-12 w-[90%] pl-3 rounded-t-lg rounded-b-md tracking-wide"
            cursorColor={"black"}
            placeholder='Password'
            selectionColor={"rgba(0,0,0,0.25)"}
            placeholderTextColor={"rgba(0,0,0,0.75)"}
            style={{ backgroundColor: "rgba(255,255,255,0.32)" }}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />

          <TouchableOpacity
            className="bg-neutral-400 h-12 w-[90%] rounded-lg items-center justify-center"
            onPress={() => login(email, password)}
          >
            <Text className="text-white font-bold text-wide text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
        <View className="flex mt-4 w-[96%]">
          <Link href="/sign-up" className='text-white tracking-wide font-semibold text-right underline'>
            Register Here
          </Link>
        </View>

      </ImageBackground>
      <Animated.View
        className="text-black absolute top-[53%] w-full"
        ref={ref}
        style={{
          display: keyboardOpen ? 'none' : 'flex',
          transform: [
            {
              translateY: ref.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 10],
              }),
            },
          ],
        }}
      >
        <Text className="text-center px-2 text-sm font-light">
          A smart man can't beat a
          hardworking man and a hard working
          man can't beat a happy working man.
        </Text>
        <Text className="text-right px-2 mr-5 text-sm font-light">
          ~ Team Cardinal
        </Text>

      </Animated.View>
    </View>
  )
}

export default index

{/* ?
      <Text>This is an UnProtected Screen!</Text>
      <Link href="/sign-in">Go to SignIn</Link>
      <Link href="/sign-up">Go to SignUp</Link> 
*/}