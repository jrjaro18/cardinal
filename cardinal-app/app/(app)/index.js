import { View, Text, TouchableOpacity, Vibration, StyleSheet, ScrollView, Button } from 'react-native'
import React, { useState, useCallback, useMemo, useLayoutEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { StatusBar } from 'react-native'
import { CalendarUtils } from 'react-native-calendars';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import Header from '../../components/home/Header'
import CalendarComponent from '../../components/home/Calendar'
import Remaing from '../../components/home/Remaing'
import TaskIcons from '../../components/home/TaskIcons'
import Routines from '../../components/home/Routines'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal from '../../components/home/Modal';

const INITIAL_DATE = new Date().getTime();

const Home = () => {
  const statusbarheight = StatusBar.currentHeight;
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(null);

  // bottom sheet modal
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === -1) setSelected(INITIAL_DATE);
  }, []);
  const backdropComponent = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        pressBehavior={'close'}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    )
  })

  // Get the date for the current month
  const getDate = (date, count) => {
    const t_date = new Date(date);
    const newDate = new Date(t_date.setDate(t_date.getDate() + count)); // Create a new Date object
    return CalendarUtils.getCalendarDateString(newDate); // Pass the new Date object
  };

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
    Vibration.vibrate(5);
    handlePresentModalPress();
  }, []);

  useLayoutEffect(() => {
    setCurrentMonth(getDate(INITIAL_DATE, 0));
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'rgb(0, 122, 255)',
        selectedTextColor: 'white',
      },
    };
  }, [selected]);


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
          <Routines />

          {/* Toggle themes button */}
          <TouchableOpacity onPress={toggleTheme}>
            <Text className="p-2 text-red-400">Toggle Theme</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modal
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        backdropComponent={backdropComponent}
        selected={selected}
        setSelected={setSelected}
        getDate={getDate}
        theme={theme}
      />
      
    </GestureHandlerRootView>
  );
};

export default Home;

