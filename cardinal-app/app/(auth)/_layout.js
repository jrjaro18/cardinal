import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="overview"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="overview" />
    </Stack>
  )
}
