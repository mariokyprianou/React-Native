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
import WorkoutHomeHeader from '../../components/Headers/WorkoutHomeHeader';
import WorkoutCard from '../../components/Cards/WorkoutCard';
import DraggableFlatList from 'react-native-draggable-flatlist';
import isRTL from '../../utils/isRTL';

const fakeImage = require('../../../assets/fakeCard.png');

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
    if (weekNumber === 1) {
      setWorkoutsToDisplay(currentWeek);
    }
    if (weekNumber === 2) {
      setWorkoutsToDisplay(nextWeek);
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
    headerBorder: {
      width: '100%',
      height: getHeight(2),
      backgroundColor: colors.offWhite100,
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
      <View style={styles.headerBorder} />
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
              title={item.workout.name}
              day={item.day}
              date={item.date}
              duration={item.workout.duration}
              intensity={item.workout.intensity}
              image={fakeImage}
              drag={drag}
              onPressCard={() => navigation.navigate('StartWorkout')} // add params to specify workout ID
            />
          </View>
        )}
      />
    </View>
  );
}
