/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 10:04:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../hooks/theme/UseTheme';
import useDictionary from '../hooks/localisation/useDictionary';
import useWorkoutHome from '../hooks/data/useWorkoutHome';
import useTakeRest from '../hooks/data/useTakeRest';
import {SafeAreaView} from 'react-native-safe-area-context';
import TDIcon from 'the-core-ui-component-tdicon';
import {format} from 'date-fns';
import WorkoutHomeHeader from '../components/Headers/WorkoutHomeHeader';
import WorkoutCard from '../components/Cards/WorkoutCard';
import formatWorkoutWeek from '../utils/formatWorkoutWeek';
import addRestDays from '../utils/addRestDays';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ModalCard from '../components/Modals/ModalCard';
import TakeARest from '../components/Modals/TakeARest';
import WeekComplete from '../components/Modals/WeekComplete';
import StayTuned from '../components/Modals/StayTuned';

export default function WorkoutHomeScreen({navigation}) {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles} = useTheme();
  const {dictionary} = useDictionary();
  const {TitleText_Week} = dictionary;
  const [weekNumber, setWeekNumber] = useState(1);
  const {
    workoutHomeData: {
      currentWeek,
      currentWeekNumber,
      nextWeek,
      trainerName,
      venue,
      totalDuration,
      totalReps,
      totalSets,
      completedWorkoutWeek,
      firstWorkoutOfNextWeek,
      lastWeekOfProgramme,
    },
  } = useWorkoutHome();
  const {takeRestData} = useTakeRest();
  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const [showTakeRestModal, setShowTakeRestModal] = useState(takeRestData);
  const [showWeekCompleteModal, setShowWeekCompleteModal] = useState(
    completedWorkoutWeek,
  );
  const [showStayTunedModal, setShowStayTunedModal] = useState(false);

  navigation.setOptions({
    header: () => null,
  });

  useEffect(() => {
    // fetch programme from back end with this week and next week
    // data will arrive with all workout days and rest days - each has date stamp, order index and isCompleted
    if (weekNumber === 1) {
      // setWorkoutsToDisplay with this week
      // format the date
      const thisWeekWorkouts = formatWorkoutWeek(currentWeek, 1);
      const thisWeekWithRests = addRestDays(thisWeekWorkouts);
      setWorkoutsToDisplay(thisWeekWithRests);
    }
    if (weekNumber === 2) {
      // setWorkoutsToDisplay with next week
      // format the date
      const nextWeekWorkouts = formatWorkoutWeek(nextWeek, 2);
      const nextWeekWithRests = addRestDays(nextWeekWorkouts);
      setWorkoutsToDisplay(nextWeekWithRests);
    }
  }, [currentWeek, nextWeek, weekNumber]);

  useEffect(() => {
    console.log(workoutsToDisplay);
    // change dates on back end too
  }, [workoutsToDisplay]);

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
    if (direction === 'right' && !completedWorkoutWeek) setWeekNumber(2);
    if (direction === 'right' && completedWorkoutWeek)
      setShowStayTunedModal(true);
  }

  function handleCloseRestModal() {
    setShowTakeRestModal(false);
  }

  function handleCloseWeekCompleteModal() {
    setShowWeekCompleteModal(false);
  }

  function handleCloseStayTunedModal() {
    setShowStayTunedModal(false);
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
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
      <View>
        <DraggableFlatList
          data={workoutsToDisplay}
          keyExtractor={(item, index) => `${index}`}
          onDragEnd={({data}) => setWorkoutsToDisplay(data)}
          renderItem={({item, index, drag, isActive}) => (
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
        />
      </View>
      <ModalCard isVisible={showTakeRestModal}>
        <TakeARest onPressClose={handleCloseRestModal} name={trainerName} />
      </ModalCard>
      <ModalCard isVisible={showWeekCompleteModal}>
        <WeekComplete
          onPressClose={handleCloseWeekCompleteModal}
          name={trainerName}
          weekNumber={currentWeekNumber}
          totalDuration={totalDuration}
          totalReps={totalReps}
          totalSets={totalSets}
        />
      </ModalCard>
      <ModalCard isVisible={showStayTunedModal}>
        <StayTuned
          onPressClose={handleCloseStayTunedModal}
          name={trainerName}
          venue={venue}
          date={firstWorkoutOfNextWeek}
          type={
            lastWeekOfProgramme === true
              ? 'programmeComplete'
              : 'workoutComplete'
          }
        />
      </ModalCard>
    </View>
  );
}
