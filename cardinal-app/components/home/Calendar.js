import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Calendar } from 'react-native-calendars'

const CalendarComponent = ({currentMonth, theme, onDayPress, marked, setCurrentMonth}) => {
  useEffect(() => {
    console.log("Calendar rendered")
  })
  return (
    <View className="mb-5">
          {
            currentMonth != null ? (
              <Calendar
                style={{
                  borderRadius: 30,
                  elevation: 2,
                  paddingBottom: 10,
                }}
                theme={{
                  calendarBackground: theme === 'light' ? '#fff' : '#171717',
                  dayTextColor: theme === 'light' ? '#2d3748' : '#e2e8f0',
                  monthTextColor: theme === 'light' ? '#2d3748' : '#e2e8f0',
                  textSectionTitleColor: theme === 'light' ? '#4a5568' : '#a0aec0',
                  selectedDayBackgroundColor: 'rgb(0, 122, 255)',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: 'rgb(0, 122, 255)',
                  arrowColor: theme === 'light' ? '#2d3748' : '#e2e8f0',
                  textDisabledColor: theme === 'light' ? '#a0aec0' : '#4a5568',
                }}
                key={theme}
                current={currentMonth}
                onDayPress={onDayPress}
                markedDates={marked}
                onMonthChange={(month) => setCurrentMonth(month.dateString)}
              />
            ) : null
          }

        </View>
  )
}

export default React.memo(CalendarComponent)