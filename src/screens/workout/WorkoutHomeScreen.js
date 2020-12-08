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
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import useWorkoutHome from '../../hooks/data/useWorkoutHome';
import useTakeRest from '../../hooks/data/useTakeRest';
import TDIcon from 'the-core-ui-component-tdicon';
import {format} from 'date-fns';
import WorkoutHomeHeader from '../../components/Headers/WorkoutHomeHeader';
import WorkoutCard from '../../components/Cards/WorkoutCard';
import formatWorkoutWeek from '../../utils/formatWorkoutWeek';
import addRestDays from '../../utils/addRestDays';
import DraggableFlatList from 'react-native-draggable-flatlist';
import isRTL from '../../utils/isRTL';

export default function WorkoutHomeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
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
      threeWorkoutsInRow,
      firstWorkoutOfNextWeek,
      lastWeekOfProgramme,
    },
  } = useWorkoutHome();
  const {takeRestData} = useTakeRest();
  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const navigation = useNavigation();

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
    // change dates on back end too
  }, [workoutsToDisplay]);

  useEffect(() => {
    if (threeWorkoutsInRow === true) {
      navigation.navigate('TakeARest', {name: 'Katrina'});
    }
    // deps array left blank so this only appears the first time the page is loaded
  }, []);

  useEffect(() => {
    if (completedWorkoutWeek === true) {
      navigation.navigate('WeekComplete', {
        name: trainerName,
        weekNumber: currentWeekNumber,
        totalDuration: totalDuration,
        totalReps: totalReps,
        totalSets: totalSets,
      });
    }
    // deps array left blank so this only appears the first time the page is loaded
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.backgroundWhite100,
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
      marginRight: getWidth(30),
    },
    weekText: {
      ...textStyles.bold24_black100,
      textAlign: 'left',
      marginRight: getWidth(6),
    },
    numberText: {
      ...textStyles.bold24_aquamarine100,
      textAlign: 'left',
    },
    touchContainer: {
      position: 'absolute',
      left: getWidth(110),
      flexDirection: 'row',
    },
    touch: {
      width: getWidth(25),
      height: getHeight(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      size: fontSize(16),
      color: weekNumber === 1 ? colors.black40 : colors.black100,
    },
    rightIcon: {
      size: fontSize(16),
      color: weekNumber === 2 ? colors.black40 : colors.black100,
    },
    cardContainer: {
      width: '100%',
      alignItems: 'center',
    },
    draggableContainer: {
      //paddingHorizontal: 20,
      paddingBottom: getHeight(245),
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (direction === 'left') {
      setWeekNumber(1);
    }
    if (direction === 'right' && !completedWorkoutWeek) {
      setWeekNumber(2);
    }
    if (direction === 'right' && completedWorkoutWeek) {
      navigation.navigate('StayTuned', {
        name: trainerName,
        venue: venue,
        date: firstWorkoutOfNextWeek,
        type:
          lastWeekOfProgramme === true
            ? 'programmeComplete'
            : 'workoutComplete',
      });
    }
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <WorkoutHomeHeader />
      <View style={styles.titleContainer}>
        <View style={styles.titleLeftContainer}>
          <Text style={styles.weekText}>{WorkoutDict.WeekText}</Text>
          <Text style={styles.numberText}>{`${weekNumber}`}</Text>
        </View>
        <View style={styles.touchContainer}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => handlePress('left')}
            disabled={weekNumber === 1 ? true : false}>
            <TDIcon
              input={isRTL() ? 'chevron-right' : 'chevron-left'}
              inputStyle={styles.leftIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => handlePress('right')}
            disabled={weekNumber === 2 ? true : false}>
            <TDIcon
              input={isRTL() ? 'chevron-left' : 'chevron-right'}
              inputStyle={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <DraggableFlatList
        data={workoutsToDisplay}
        keyExtractor={(item, index) => `${index}`}
        onDragEnd={({data}) => setWorkoutsToDisplay(data)}
        renderItem={({item, index, drag, isActive}) => (
          <View
            style={{
              width: '100%',
              paddingHorizontal: getWidth(20),
              paddingTop: index === 0 ? getHeight(20) : 0,
            }}>
            <WorkoutCard
              title={item.title}
              day={item.day}
              date={item.date}
              duration={item.duration}
              intensity={item.intensity}
              image={item.image}
              drag={drag}
              onPressCard={() => navigation.navigate('StartWorkout')} // add params to specify workout ID
            />
          </View>
        )}
      />
    </View>
  );
}
