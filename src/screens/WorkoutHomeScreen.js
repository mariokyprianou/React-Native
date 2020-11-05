/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 10:04:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import useWorkoutHome from '../hooks/data/useWorkoutHome';
import useTakeRest from '../hooks/data/useTakeRest';
import {SafeAreaView} from 'react-native-safe-area-context';
import TDIcon from 'the-core-ui-component-tdicon';
import WorkoutHomeHeader from '../components/Headers/WorkoutHomeHeader';
import WorkoutCard from '../components/Cards/WorkoutCard';
import Spacer from '../components/Utility/Spacer';
import formatWorkoutWeek from '../utils/formatWorkoutWeek';
import addRestDays from '../utils/addRestDays';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ModalCard from '../components/Modals/ModalCard';
import TakeARest from '../components/Modals/TakeARest';

export default function WorkoutHomeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_Week} = dictionary;
  const [weekNumber, setWeekNumber] = useState(1);
  const {workoutHomeData} = useWorkoutHome();
  const {takeRestData} = useTakeRest();
  const [formattedWorkouts, setFormattedWorkouts] = useState();
  const [showTakeRestModal, setShowTakeRestModal] = useState(takeRestData);

  useEffect(() => {
    if (weekNumber === 1) {
      const thisWeek = formatWorkoutWeek(workoutHomeData.currentWeek, 1);
      const thisWeekWithRests = addRestDays(thisWeek);
      setFormattedWorkouts(thisWeekWithRests);
    }
    if (weekNumber === 2) {
      const nextWeek = formatWorkoutWeek(workoutHomeData.nextWeek, 2);
      const nextWeekWithRests = addRestDays(nextWeek);
      setFormattedWorkouts(nextWeekWithRests);
    }
  }, [workoutHomeData, weekNumber]);

  // const draggableData = formattedWorkouts.map((workout, index) => ({
  //   key: `item-${index}`,
  // }));

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginTop: getHeight(10),
    },
    titleLeftContainer: {
      flexDirection: 'row',
      marginRight: getWidth(35),
    },
    weekText: {
      ...textStyles.bold24_black100,
    },
    numberText: {
      ...textStyles.bold24_aquamarine100,
    },
    touch: {
      marginRight: getWidth(30),
    },
    icon: {
      size: fontSize(16),
    },
    cardContainer: {
      width: '100%',
      alignItems: 'center',
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (direction === 'left') setWeekNumber(1);
    if (direction === 'right') setWeekNumber(2);
  }

  function handleCloseRestModal() {
    setShowTakeRestModal(false);
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <SafeAreaView style={styles.container}>
      <WorkoutHomeHeader />
      <View style={styles.titleContainer}>
        <View style={styles.titleLeftContainer}>
          <Text style={styles.weekText}>{TitleText_Week}</Text>
          <Text style={styles.numberText}>{` ${weekNumber}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => handlePress('left')}
          disabled={weekNumber === 1 ? true : false}>
          <TDIcon input={'chevron-left'} inputStyle={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => handlePress('right')}
          disabled={weekNumber === 2 ? true : false}>
          <TDIcon input={'chevron-right'} inputStyle={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* <ScrollView> */}
      {/* <DraggableFlatList
        data={draggableData}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        onDragEnd={({data}) => setFormattedWorkouts({data})}
        renderItem={({item, index, drag}) => (
          <WorkoutCard
            title={item.title}
            day={item.day}
            date={item.date}
            duration={item.duration}
            intensity={item.intensity}
            image={item.image}
            drag={drag}
          />
        )}
      /> */}
      {/* </ScrollView> */}

      <FlatList
        data={formattedWorkouts}
        ListFooterComponent={<Spacer height={100} />}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
          <WorkoutCard
            title={item.title}
            day={item.day}
            date={item.date}
            duration={item.duration}
            intensity={item.intensity}
            image={item.image}
          />
        )}
      />
      <ModalCard isVisible={showTakeRestModal}>
        <TakeARest onPressClose={handleCloseRestModal} />
      </ModalCard>
    </SafeAreaView>
  );
}
