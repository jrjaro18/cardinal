import { View, Text, Button, StyleSheet, Vibration, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { Dropdown } from 'react-native-element-dropdown'
import { MaterialIcons, Foundation } from '@expo/vector-icons'
import DropdownForModal from './DropdownForModal'
const Modal = ({
    bottomSheetModalRef,
    snapPoints,
    handleSheetChanges,
    backdropComponent,
    theme,
    selected,
    setSelected,
    getDate
}) => {
    {/* selected date in 17 Sept, 2024 format */ }
    const date = new Date(selected);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    useEffect(() => {
        console.log('Modal rendered');
    });

    return (
        <BottomSheetModalProvider>
            <View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backdropComponent={backdropComponent}
                    backgroundStyle={{
                        backgroundColor: theme === 'light' ? '#fafafa' : '#171717',
                    }}
                    handleIndicatorStyle={{
                        backgroundColor: 'rgb(0, 122, 255)'
                    }}
                >
                    <BottomSheetScrollView>
                        <BottomSheetView
                            style={{
                                paddingHorizontal: 10,
                                paddingTop: 5,
                            }}
                        >
                            <View className="flex flex-row justify-between items-center">
                                <View className="w-4/12 flex flex-row justify-between items-center gap-x-2">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelected(getDate(selected, -1))
                                            Vibration.vibrate(5);
                                        }}
                                    >
                                        <MaterialIcons name="chevron-left" size={25} color="lightgray" />
                                    </TouchableOpacity>
                                    <View
                                        className="ml-"
                                    >
                                        <Text
                                            className="text-stone-950 text-2xl tracking-wide dark:text-stone-50"
                                            style={{
                                                fontFamily: 'Quicksand_400Regular',
                                            }}
                                        >
                                            {day + ' ' + month}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelected(getDate(selected, 1))
                                            Vibration.vibrate(5);
                                        }}
                                    >
                                        <MaterialIcons name="chevron-right" size={25} color="lightgray" />
                                    </TouchableOpacity>
                                </View>
                                <View className="w-7/12">
                                    <DropdownForModal theme={theme} />
                                </View>
                            </View>
                            <View>
                                
                            </View>
                        </BottomSheetView>
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

export default Modal

const data = [
    {
        label: 'All Tasks',
        value: 'all',
        icon: {
            name: 'list-bullet',
            size: 20,
            type: 'Foundation'
        }
    },
    {
        label: 'Missed',
        value: 'missed',
        icon: {
            name: 'alert',
            size: 20,
            type: 'Foundation'
        }
    },
    {
        label: 'Starred',
        value: 'starred',
        icon: {
            name: 'star',
            size: 20,
            type: 'MaterialIcons'
        }
    },
    {
        label: 'Routine',
        value: 'routine ',
        icon: {
            name: 'mountains',
            size: 20,
            type: 'Foundation'
        }
    },
    {
        label: 'Daily',
        value: 'daily',
        icon: {
            name: 'task-alt',
            size: 20,
            type: 'MaterialIcons'
        }
    },
    {
        label: 'Group',
        value: 'group',
        icon: {
            name: 'people-alt',
            size: 20,
            type: 'MaterialIcons'
        }
    },
];
