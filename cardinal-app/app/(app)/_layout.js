import { Redirect, Stack, Tabs } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Redirect href="(auth)/overview"/>;
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
        }}
      />
      <Tabs.Screen name="setting"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={27} color={color} />,
        }}
      />
    </Tabs>
  );
}
