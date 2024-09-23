import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ToastAndroid } from 'react-native';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around components that need access to authentication state
export const AuthProvider = ({ children }) => {

  const demoUser = {
    email: 'bob@gmail.com',
    password: 'Bob'
  };

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load the user data from AsyncStorage when the app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // login function with persistence logic
  const login = async (email, password) => {
    if (email === demoUser.email && password === demoUser.password) {
      const userData = { email: demoUser.email, password: demoUser.password };
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      ToastAndroid.show('Authenticated successfully', ToastAndroid.SHORT);
      
      router.replace('/(app)');
    } else {
      ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
  };

  // logout function with persistence logic
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
    router.replace('/(auth)/overview');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext values
export const useAuth = () => React.useContext(AuthContext);
