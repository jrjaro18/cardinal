import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ToastAndroid } from 'react-native';
import { useColorScheme } from 'nativewind';

// Create ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to wrap around components that need access to theme state
export const ThemeProvider = ({ children }) => {
    const {colorScheme, toggleColorScheme} = useColorScheme();
    const [theme, setTheme] = useState(colorScheme);

    useEffect(() => {
        const fetchTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                setTheme(storedTheme);
            }
            if (storedTheme === 'dark') {
                toggleColorScheme();
            }
        };
        fetchTheme();
    }, []);

    const toggleTheme = () => {
        // perfect code
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        AsyncStorage.setItem('theme', newTheme);
        toggleColorScheme();

        // temporary code while developing
        // if (theme === 'dark') {
        //     toggleColorScheme();
        //     AsyncStorage.setItem('theme', "light");
        // }
        // setTheme('light');
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

// useTheme hook to consume the theme context
export const useTheme = () => React.useContext(ThemeContext);