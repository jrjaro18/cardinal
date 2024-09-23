import { Redirect, Stack, Tabs } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useFonts, Quicksand_400Regular, Quicksand_500Medium } from '@expo-google-fonts/dev';

export default function AppLayout() {

  const { theme } = useTheme();
  const { user, isLoading } = useAuth();

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium
  })

  if (!fontsLoaded) return null

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Redirect href="(auth)/overview" />;
  }

  return (
    <Tabs
      options={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={27} color={color} />,
          tabBarStyle: {
            backgroundColor: theme == "dark" ? "black" : "white",
            borderTopColor: theme == "dark" ? "black" : "white",
            paddingBottom: 3,
          },
        }}
      />
      <Tabs.Screen name="setting"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={27} color={color} />,
          tabBarStyle: {
            backgroundColor: theme == "dark" ? "black" : "white",
            borderTopColor: theme == "dark" ? "black" : "white",
            paddingBottom: 3,
          },
        }}
      />
    </Tabs>
  );
}
