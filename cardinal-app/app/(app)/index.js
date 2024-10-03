import { View, Text, TouchableOpacity, Vibration, ScrollView } from 'react-native'
import React, { useState, useCallback, useMemo, useLayoutEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { StatusBar } from 'react-native'
import { CalendarUtils } from 'react-native-calendars';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Header from '../../components/home/Header'
import CalendarComponent from '../../components/home/Calendar'
import Remaing from '../../components/home/Remaing'
import TaskIcons from '../../components/home/TaskIcons'
import Routines from '../../components/home/Routines'
import Modal from '../../components/home/Modal';

const INITIAL_DATE = new Date().getTime();

const Home = () => {
  const statusbarheight = StatusBar.currentHeight;
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [markedDate, setMarkedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);


  // Get the date for the current month
  const getDate = (date, count) => {
    const t_date = new Date(date);
    const newDate = new Date(t_date.setDate(t_date.getDate() + count)); // Create a new Date object
    return CalendarUtils.getCalendarDateString(newDate); // Pass the new Date object
  };

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
    setMarkedDate(day.dateString);
    Vibration.vibrate(5);
    handlePresentModalPress();
  }, []);

  useLayoutEffect(() => {
    setCurrentMonth(getDate(INITIAL_DATE, 0));
  }, []);

  const marked = useMemo(() => {
    return {
      [markedDate]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'rgb(0, 122, 255)',
        selectedTextColor: 'white',
      },
    };
  }, [markedDate]);

  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{ paddingTop: statusbarheight }}
        className="pt-3 px-3 pb-1 flex-1 bg-neutral-50 dark:bg-neutral-950"
      >
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CalendarComponent
            currentMonth={currentMonth}
            theme={theme}
            onDayPress={onDayPress}
            marked={marked}
            setCurrentMonth={setCurrentMonth}
          />
          <Remaing />
          <TaskIcons />
          <Routines theme={theme} />

          {/* Toggle themes button */}
          <TouchableOpacity onPress={toggleTheme}>
            <Text className="p-2 text-red-400">Toggle Theme</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modal
        bottomSheetModalRef={bottomSheetModalRef}
        markedDate={markedDate}
        setMarkedDate={setMarkedDate}        
        selected={selected}
        setSelected={setSelected}
        getDate={getDate}
        INITIAL_DATE={INITIAL_DATE}
        theme={theme}
      />
      
    </GestureHandlerRootView>
  );
};

export default Home;

