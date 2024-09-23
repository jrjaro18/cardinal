import { View, Text } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { MaterialIcons, Foundation } from '@expo/vector-icons'
import { useState, useEffect, memo } from 'react'
import { Vibration } from 'react-native'

const DropdownForModal = ({theme}) => {
    const [value, setValue] = useState(data[0].value);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        console.log('Dropdown For Modal rendered');
    });

    return (
        <View>
            <Dropdown
                style={[
                    {
                        height: 50,
                        borderColor: 'gray',
                        borderWidth: 0.5,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                    },
                    isFocus && {
                        borderColor: 'rgb(0, 122, 255)',
                        borderWidth: 1,
                    }
                ]}
                selectedTextStyle={{
                    color: theme === 'light' ? 'black' : 'white',
                    fontFamily: 'Quicksand_500Medium',
                    fontSize: 20
                }}
                selectedText={value}
                data={data}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={value}
                itemContainerStyle={{ backgroundColor: theme === 'light' ? 'white' : '#171717', elevation: 0 }}
                onFocus={() => {
                    setIsFocus(true);
                    Vibration.vibrate(5);
                }}
                onBlur={() => {
                    setIsFocus(false);
                }}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    Vibration.vibrate(5);
                }}
                renderItem={(item, selected) => (
                    <View className="flex flex-row px-2 pb-4 items-end"
                        style={{
                            height: 330 / 6,
                            backgroundColor: selected ? (theme === 'light' ? '#f2f1f1' : '#212121') : (theme === 'light' ? 'white' : '#171717'),
                            borderWidth: selected ? 1 : 0.5,
                            borderColor: selected ? 'rgb(0, 122, 255)' : 'gray',
                            // borderTopLeftRadius: item.value === 'all' ? 8 : 0,
                            // borderTopRightRadius: item.value === 'all' ? 8 : 0,
                            // borderBottomLeftRadius: item.value === 'group' ? 8 : 0,
                            // borderBottomRightRadius: item.value === 'group' ? 8 : 0,
                        }}
                    >
                        {
                            item.icon.type === 'MaterialIcons' ? (
                                <MaterialIcons
                                    marginRight={10}
                                    // color={item.icon.name !== 'alert' ? (item.icon.name === 'star' ? "#ffc552" : theme == "dark" ? "white" : "black") : '#f94848'}
                                    color={theme === 'light' ? 'black' : 'white'}
                                    name={item.icon.name}
                                    size={item.icon.size}
                                />
                            ) : (
                                <Foundation
                                    marginRight={10}
                                    // color={item.icon.name !== 'alert' ? (theme == "dark" ? "white" : "black") : '#f94848'}
                                    color={theme === 'light' ? 'black' : 'white'}
                                    name={item.icon.name}
                                    size={item.icon.size}
                                />
                            )
                        }
                        <Text
                            style={{ fontFamily: 'Quicksand_400Regular', fontSize: 16 }}
                            className="text-stone-950 dark:text-stone-50"
                        >
                            {item.label}
                        </Text>
                    </View>
                )}
                showsVerticalScrollIndicator
                containerStyle={{ height: 275, borderWidth: 0, borderBottomWidth: 0.25, borderBottomColor: 'lightgray' }}
            />
        </View>
    )
}

export default memo(DropdownForModal)


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
