import { View, Text, Vibration, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { BottomSheetFlatList, BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView, TouchableHighlight, TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import DropdownForModal from './DropdownForModal'

const Modal = ({
    bottomSheetModalRef,
    INITIAL_DATE,
    theme,
    selected,
    markedDate,
    setMarkedDate,
    setSelected,
    getDate
}) => {
    {/* selected date in 17 Sept, 2024 format */ }
    const date = new Date(selected);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [taskTypeData, setTaskTypeData] = useState(filterData.filter(item => item.type === 'task'));
    const [categoryData, setCategoryData] = useState(filterData.filter(item => item.type === 'category'));
    const [priorityData, setPriorityData] = useState(filterData.filter(item => item.type === 'priority'));

    const [taskType, setTaskType] = useState([{title: 'All', type: 'task'}]);
    const [category, setCategory] = useState([{title: 'All', type: 'category'}]);
    const [priority, setPriority] = useState({title: 'All', type: 'priority'});

    const [taskTypeTemp, setTaskTypeTemp] = useState([{title: 'All', type: 'task'}]);
    const [categoryTemp, setCategoryTemp] = useState([{title: 'All', type: 'category'}]);
    const [priorityTemp, setPriorityTemp] = useState({title: 'All', type: 'priority'});

    useEffect(() => {
        console.log('Modal rendered');
    });

    useEffect(() => {
        console.log('Modal selected date changed');
        // Reset filter states when a new date is selected
        resetFilters();
    }, [selected]);

    const onTaskTypePress = (item) => {
        setTaskTypeTemp(prevTaskType => {
            if (item.title === 'All') {
                // If 'All' is selected, reset taskTypeData and return only 'All'
                setTaskTypeData(filterData.filter(data => data.type === 'task'));
                return [{title: 'All', type: 'task'}];
            } else {
                let newTaskType = prevTaskType.filter(type => type.title !== 'All');
                const itemIndex = newTaskType.findIndex(type => type.title === item.title);
                if (itemIndex !== -1) {
                    // Remove the item if it's already selected
                    newTaskType.splice(itemIndex, 1);
                    // Add it back to taskTypeData
                    setTaskTypeData(prevTaskTypeData => [...prevTaskTypeData, item].sort((a, b) => a.title.localeCompare(b.title)));
                } else {
                    // Add the item if it's not selected
                    newTaskType.push(item);
                    // Remove it from taskTypeData
                    setTaskTypeData(prevTaskTypeData => prevTaskTypeData.filter(type => type.title !== item.title));
                }

                // If all items except 'All' are selected, return only 'All'
                if (newTaskType.length === filterData.filter(data => data.type === 'task').length - 1) {
                    setTaskTypeData(filterData.filter(data => data.type === 'task'));
                    return [{title: 'All', type: 'task'}];
                }

                // If the array is empty after changes, select 'All'
                if (newTaskType.length === 0) {
                    setTaskTypeData(filterData.filter(data => data.type === 'task'));
                    return [{title: 'All', type: 'task'}];
                }

                return newTaskType.sort((a, b) => a.title.localeCompare(b.title));
            }
        });
    }

    const onCategoryPress = (item) => {
        setCategoryTemp(prevCategory => {
            if (item.title === 'All') {
                // If 'All' is selected, reset categoryData and return only 'All'
                setCategoryData(filterData.filter(data => data.type === 'category'));
                return [{title: 'All', type: 'category'}];
            } else {
                let newCategory = prevCategory.filter(cat => cat.title !== 'All');
                const itemIndex = newCategory.findIndex(cat => cat.title === item.title);
                if (itemIndex !== -1) {
                    // Remove the item if it's already selected
                    newCategory.splice(itemIndex, 1);
                    // Add it back to categoryData
                    setCategoryData(prevCategoryData => [...prevCategoryData, item].sort((a, b) => a.title.localeCompare(b.title)));
                } else {
                    // Add the item if it's not selected
                    newCategory.push(item);
                    // Remove it from categoryData
                    setCategoryData(prevCategoryData => prevCategoryData.filter(cat => cat.title !== item.title));
                }

                // If all items except 'All' are selected, return only 'All'
                if (newCategory.length === filterData.filter(data => data.type === 'category').length - 1) {
                    setCategoryData(filterData.filter(data => data.type === 'category'));
                    return [{title: 'All', type: 'category'}];
                }

                // If the array is empty after changes, select 'All'
                if (newCategory.length === 0) {
                    setCategoryData(filterData.filter(data => data.type === 'category'));
                    return [{title: 'All', type: 'category'}];
                }

                return newCategory.sort((a, b) => a.title.localeCompare(b.title));
            }
        });
    }

    const onPriorityPress = (item) => {
        setPriorityTemp(prevPriority => {
            if (item.title === 'All') {
                // If 'All' is selected, reset priorityData and return 'All'
                setPriorityData(filterData.filter(data => data.type === 'priority'));
                return {title: 'All', type: 'priority'};
            } else {
                if (item.title === prevPriority.title) {
                    // If the same priority is selected again, reset to 'All'
                    setPriorityData(filterData.filter(data => data.type === 'priority'));
                    return {title: 'All', type: 'priority'};
                } else {
                    // Select the new priority and update priorityData
                    setPriorityData(
                        prevPriorityData => filterData.filter(data => data.type === 'priority' && data.title !== item.title)
                    )
                    return item;
                }
            }
        });
    }

    const onFilterSubmit = () => {
        // Helper function to compare arrays regardless of order
        const areArraysEqual = (arr1, arr2) => {
            if (arr1.length !== arr2.length) return false;
            const set1 = new Set(arr1.map(JSON.stringify));
            return arr2.every(item => set1.has(JSON.stringify(item)));
        };

        // Check if any filter has changed
        if (areArraysEqual(taskTypeTemp, taskType) &&
            areArraysEqual(categoryTemp, category) &&
            JSON.stringify(priorityTemp) === JSON.stringify(priority)) {
            ToastAndroid.show('No changes made to filters', ToastAndroid.SHORT);
            setIsFilterOpen(false);
            return;
        }

        setTaskType(taskTypeTemp);
        setCategory(categoryTemp);
        setPriority(priorityTemp);
        ToastAndroid.show('Filters applied successfully', ToastAndroid.SHORT);
        setIsFilterOpen(false);
    }

    const resetFilters = () => {
        setTaskType([{title:'All', type: 'task'}]);
        setCategory([{title:'All', type: 'category'}]);
        setPriority({title:'All', type: 'priority'});
        setTaskTypeTemp([{title:'All', type: 'task'}]);
        setCategoryTemp([{title:'All', type: 'category'}]);
        setPriorityTemp({title:'All', type: 'priority'});
        setTaskTypeData(filterData.filter(data => data.type === 'task'));           
        setCategoryData(filterData.filter(data => data.type === 'category'));
        setPriorityData(filterData.filter(data => data.type === 'priority'));
        setIsFilterOpen(false);
    }

    const snapPoints = useMemo(() => ["87%"], []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        if (index === -1) {
            console.log('Modal closed');
            setMarkedDate(null);
        }
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

    return (
        <BottomSheetModalProvider>
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
                <BottomSheetScrollView
                    nestedScrollEnabled={true}
                >
                    <BottomSheetView
                        style={{
                            paddingHorizontal: 8,
                            paddingTop: 4,
                        }}
                    >
                        {/* date and day */}
                        <BottomSheetView
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}
                        >
                            <Text
                                className="text-stone-950 text-3xl tracking-wide dark:text-stone-50"
                                style={{
                                    fontFamily: 'Quicksand_400Regular',
                                }}
                            >
                                {day.toString() + ' ' + month + ', ' + year}
                            </Text>
                            <Text
                                className="text-stone-950 text-lg tracking-wide dark:text-stone-50"
                                style={{
                                    fontFamily: 'Quicksand_400Regular',
                                }}
                            >
                                {date.toLocaleDateString('en-US', { weekday: 'long' })}
                            </Text>
                        </BottomSheetView>

                        {/* filters */}
                        <BottomSheetView
                            style={{
                                marginTop: 14,
                                paddingTop: 6,
                                borderTopWidth: 1,
                                borderTopColor: theme === 'light' ? '#1a1a1a' : 'lightgray',
                                paddingBottom: 18,
                                borderBottomColor: theme === 'light' ? '#1a1a1a' : 'lightgray',
                                borderBottomWidth: 1,
                            }}
                        >

                            {/* filter button and selected filter list */}
                            <BottomSheetView>
                                <BottomSheetView
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 6
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsFilterOpen(!isFilterOpen);
                                            Vibration.vibrate(5);
                                        }}
                                        className="flex flex-row items-center mr-1"

                                    >
                                        <MaterialIcons name="filter-list" size={24} color={theme == 'light' ? 'black' : 'lightgray'} />
                                    </TouchableOpacity>

                                    <BottomSheetView style={{ flex: 1 }}>
                                        <TouchableWithoutFeedback>
                                            <BottomSheetFlatList
                                                data={
                                                    ["Priority:   " + priority.title, "Tasks:   " + taskType.map(t => t.title).join(', '), ...category.map(c => c.title)]
                                                }
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity>
                                                        <Text
                                                            className="text-stone-50 text-sm tracking-wide bg-neutral-900 dark:bg-neutral-700 p-3 rounded-lg min-w-[90] text-center"
                                                            style={{
                                                                fontFamily: 'Quicksand_400Regular',
                                                            }}
                                                        >
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                                contentContainerStyle={{
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 6,
                                                    flexDirection: 'row',
                                                    gap: 6,
                                                }}
                                                showsHorizontalScrollIndicator={false}
                                                horizontal={true}
                                                nestedScrollEnabled={true}
                                            />
                                        </TouchableWithoutFeedback>
                                    </BottomSheetView>
                                </BottomSheetView>
                            </BottomSheetView>

                            {/* filter options */}
                            {
                                isFilterOpen && (
                                    <BottomSheetView>
                                        <TouchableWithoutFeedback
                                            style={{
                                                display: 'flex',
                                                gap: 10,
                                                marginTop: 8,
                                            }}
                                        >
                                            <BottomSheetView
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text
                                                    className="text-stone-950 text-base tracking-wider dark:text-stone-50 w-20"
                                                    style={{
                                                        fontFamily: 'Quicksand_400Regular',
                                                    }}
                                                >Priority
                                                </Text>
                                                <BottomSheetFlatList
                                                    data={priorityData}
                                                    renderItem={({ item, index }) => (
                                                        <TouchableOpacity
                                                            className={`bg-neutral-900 dark:bg-neutral-800 py-2 rounded-3xl min-w-[90] mr-2 px-4`}
                                                            onPress={() => {
                                                                Vibration.vibrate(5);
                                                                onPriorityPress(item);
                                                                console.log(item);
                                                            }}
                                                        >
                                                            <Text
                                                                className="text-stone-50 text-sm tracking-wide dark:text-stone-50 text-center"
                                                                style={{
                                                                    fontFamily: 'Quicksand_400Regular',
                                                                }}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    contentContainerStyle={{
                                                        paddingHorizontal: 12,
                                                    }}
                                                    nestedScrollEnabled={true}
                                                />
                                            </BottomSheetView>
                                            <BottomSheetView
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text
                                                    className="text-stone-950 text-base tracking-wider dark:text-stone-50 w-16"
                                                    style={{
                                                        fontFamily: 'Quicksand_400Regular',
                                                    }}
                                                >Type
                                                </Text>
                                                <BottomSheetFlatList
                                                    data={taskTypeData}
                                                    renderItem={({ item, index }) => (
                                                        <TouchableOpacity
                                                            className={`bg-neutral-900 dark:bg-neutral-800 py-2 px-4 rounded-3xl min-w-[90] mr-2`}
                                                            onPress={() => {
                                                                Vibration.vibrate(5);
                                                                onTaskTypePress(item);
                                                                console.log(item);
                                                            }}
                                                        >
                                                            <Text
                                                                className="text-stone-50 text-sm tracking-wide dark:text-stone-50 text-center"
                                                                style={{
                                                                    fontFamily: 'Quicksand_400Regular',
                                                                }}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    contentContainerStyle={{
                                                        paddingHorizontal: 12,
                                                    }}
                                                    nestedScrollEnabled={true}
                                                />
                                            </BottomSheetView>
                                            <BottomSheetView
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text
                                                    className="text-stone-950 text-base tracking-wide dark:text-stone-50 w-20"
                                                    style={{
                                                        fontFamily: 'Quicksand_400Regular',
                                                    }}
                                                >Category
                                                </Text>
                                                <BottomSheetFlatList
                                                    data={categoryData}
                                                    renderItem={({ item, index }) => (
                                                        <TouchableOpacity
                                                            className={`bg-neutral-900 dark:bg-neutral-800 py-2 px-4 rounded-3xl min-w-[90] mr-2`}
                                                            onPress={() => {
                                                                Vibration.vibrate(5);
                                                                onCategoryPress(item);
                                                                console.log(item);
                                                            }}
                                                        >
                                                            <Text
                                                                className="text-stone-50 text-sm tracking-wide dark:text-stone-50 text-center"
                                                                style={{
                                                                    fontFamily: 'Quicksand_400Regular',
                                                                }}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    horizontal={true}
                                                    showsHorizontalScrollIndicator={false}
                                                    contentContainerStyle={{
                                                        paddingHorizontal: 12,
                                                    }}
                                                    nestedScrollEnabled={true}
                                                />
                                            </BottomSheetView>

                                            {/* Selceted items list */}
                                            <BottomSheetView
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: 8,
                                                    borderTopWidth: 1,
                                                    paddingTop: 12,
                                                    borderTopColor: theme === 'light' ? '#1a1a1a' : 'lightgray',
                                                }}
                                            >
                                                {
                                                    [
                                                        priorityTemp,
                                                        ...taskTypeTemp,
                                                        ...categoryTemp
                                                    ].map((item, index) => (
                                                        <TouchableOpacity
                                                            key={index}
                                                            className={`bg-neutral-900 dark:bg-neutral-700 py-2 px-4 rounded-3xl min-w-[90] mr-2 mb-2`}
                                                            onPress={() => {
                                                                Vibration.vibrate(5);
                                                                if (item.type==='priority') {
                                                                    onPriorityPress(item);
                                                                }
                                                                if (item.type==='task') {
                                                                    onTaskTypePress(item);
                                                                }
                                                                if (item.type==='category') {
                                                                    onCategoryPress(item);
                                                                }
                                                            }}
                                                        >
                                                            <Text
                                                                className="text-stone-50 text-sm tracking-wide dark:text-stone-50 text-center"
                                                                style={{
                                                                    fontFamily: 'Quicksand_400Regular',
                                                                    paddingHorizontal: Math.floor(Math.random() * 15) + 2, // Random padding between 2 and 7
                                                                }}
                                                            >
                                                                {item.title}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))
                                                }
                                            </BottomSheetView>

                                            {/* Apply Button */}
                                            <BottomSheetView
                                                style={{
                                                    display: 'flex',
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-evenly',
                                                    alignItems: 'center',
                                                    marginTop: 8,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Vibration.vibrate(10);
                                                        resetFilters();
                                                    }}
                                                    className="bg-red-400 dark:bg-red-900  flex items-center justify-center pb-1 h-12 rounded-sm w-4/12 px-2"
                                                >
                                                    <Text
                                                        className="text-stone-50 text-xl tracking-wide text-center"
                                                        style={{
                                                            fontFamily: 'Quicksand_400Regular',
                                                        }}
                                                    >Reset
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Vibration.vibrate(10);
                                                        onFilterSubmit();
                                                    }}
                                                    className="bg-neutral-950 dark:bg-neutral-100 flex items-center justify-center pb-1 h-12 rounded-sm w-7/12"
                                                >
                                                    <Text
                                                        className="text-stone-50 dark:text-stone-950 text-xl tracking-wide text-center"
                                                        style={{
                                                            fontFamily: 'Quicksand_400Regular',
                                                        }}
                                                    >Apply
                                                    </Text>
                                                </TouchableOpacity>
                                            </BottomSheetView>
                                        </TouchableWithoutFeedback>
                                    </BottomSheetView>
                                )
                            }
                        </BottomSheetView>
                    </BottomSheetView>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </BottomSheetModalProvider >
    )
}

export default Modal

/* wasted

<View className="flex flex-row justify-between items-center mx-1">
    <View className="w-4/12 flex flex-row justify-between items-center gap-x-1">
        <TouchableOpacity
            onPress={() => {
                setSelected(getDate(selected, -1))
                Vibration.vibrate(5);
            }}
        >
            <MaterialIcons name="chevron-left" size={25} color="lightgray" />
        </TouchableOpacity>
        <View>
            <Text
                className="text-stone-950 text-2xl tracking-wide dark:text-stone-50 text-center"
                style={{
                    fontFamily: 'Quicksand_400Regular',
                }}
            >
                {day.toString().padStart(2, '0') + '\n' + month}
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
    <Text>
        
    </Text>
</View>
*/


const filterData = [
    { title: "All", type: "task" },
    { title: "Completed", type: "task" },
    { title: "Missed", type: "task" },
    { title: "Group", type: "task" },
    { title: "Routine", type: "task" },
    { title: "All", type: "category" },
    { title: "Personal", type: "category" },
    { title: "Work", type: "category" },
    { title: "Shopping", type: "category" },
    { title: "Study", type: "category" },
    { title: "Health", type: "category" },
    { title: "Finance", type: "category" },
    { title: "Family n Friends", type: "category" },
    { title: "Travel", type: "category" },
    { title: "Others", type: "category" },
    { title: "All", type: "priority" },
    { title: "High Priority", type: "priority" },
    { title: "Low Priority", type: "priority" }
]