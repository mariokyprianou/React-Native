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
import TDIcon from 'the-core-ui-component-tdicon';
import WorkoutHomeHeader from '../../components/Headers/WorkoutHomeHeader';
import WorkoutCard from '../../components/Cards/WorkoutCard';
import DraggableFlatList from 'react-native-draggable-flatlist';
import isRTL from '../../utils/isRTL';
import useData from '../../hooks/data/UseData';
import {useMutation} from '@apollo/client';
import UpdateOrder from '../../apollo/mutations/UpdateOrder';
import * as R from 'ramda';
import addRestDays from '../../utils/addRestDays';
import addWorkoutDates from '../../utils/addWorkoutDates';
import {differenceInDays, subDays} from 'date-fns';

export default function WorkoutHomeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;
  const [weekNumber, setWeekNumber] = useState(1);

  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const [threeWorkoutsInRow, setThreeWorkoutsInRow] = useState(false);
  const [warningReceived, setWarningReceived] = useState(false);
  const navigation = useNavigation();

  navigation.setOptions({
    header: () => null,
  });

  const {programme, getProgramme} = useData();
  const [updateOrderMutation] = useMutation(UpdateOrder);

  useEffect(() => {
    getProgramme();
  }, []);

  const getWeekToDisplay = (data, isCurrentWeek) => {
    const workouts = isCurrentWeek
      ? data.currentWeek.workouts
      : data.nextWeek.workouts;
    let weekWorkout = workouts
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex);
    const week = addWorkoutDates(addRestDays(weekWorkout), isCurrentWeek);

    return week;
  };

  useEffect(() => {
    if (programme) {
      if (weekNumber === 1) {
        const currentWeek = getWeekToDisplay(programme, true);
        setWorkoutsToDisplay(currentWeek);
      }
      if (weekNumber === 2) {
        const nextWeek = getWeekToDisplay(programme, false);
        setWorkoutsToDisplay(nextWeek);
      }
    }
  }, [programme, weekNumber]);

  useEffect(() => {
    const today = new Date();
    // console.log(subDays(today, 2), '<--- 2 days ago');
    if (programme) {
      const previousWorkoutDates = [];
      const completedWorkouts = programme.currentWeek.workouts.filter(
        (workout) => workout.completedAt !== null,
      );
      completedWorkouts.forEach((workout) =>
        previousWorkoutDates.push(workout.completedAt),
      );
      if (previousWorkoutDates.length < 3) {
        // check async storage
        // Christos to store completed workouts in async storage
        // Three booleans for hasCompleted1, hasCompleted2, hasCompleted3 (consecutively)
        // set threeWorkoutsInRow => true/false
      }
      if (previousWorkoutDates.length >= 3) {
        //check if consecutive before today
        setThreeWorkoutsInRow(true);
      }
    }
  }, [programme]);

  useEffect(() => {
    if (programme && threeWorkoutsInRow === true && warningReceived === false) {
      navigation.navigate('TakeARest', {
        name: programme.trainer.name,
        setWarningReceived,
      });
    }
  }, [programme, threeWorkoutsInRow]);

  // useEffect(() => {
  //   if (completedWorkoutWeek === true) {
  //     navigation.navigate('WeekComplete', {
  //       name: trainerName,
  //       weekNumber: currentWeekNumber,
  //       totalDuration: totalDuration,
  //       totalReps: totalReps,
  //       totalSets: totalSets,
  //     });
  //   }
  // }, []);

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (direction === 'left') {
      setWeekNumber(1);
    }
    if (direction === 'right') {
      setWeekNumber(2);
    }
    // if (direction === 'right' && completedWorkoutWeek) {
    //   navigation.navigate('StayTuned', {
    //     name: trainerName,
    //     venue: venue,
    //     date: firstWorkoutOfNextWeek,
    //     type:
    //       lastWeekOfProgramme === true
    //         ? 'programmeComplete'
    //         : 'workoutComplete',
    //   });
    // }
  }

  async function updateOrder(newList) {
    setWorkoutsToDisplay(newList);

    let index = 0;
    const data = newList.filter((it) => it.id !== undefined);
    const newOrder = data.map((it) => {
      index = index + 1;
      return {
        index: index,
        id: it.id,
      };
    });

    await updateOrderMutation({
      variables: {
        input: newOrder,
      },
    })
      .then((res) => {
        const success = R.path(['data', 'updateOrder'], res);
        console.log('UpdateOrderRes', success);
      })
      .catch((err) => console.log(err));
  }

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
        onDragEnd={({data}) => updateOrder(data)}
        renderItem={({item, index, drag, isActive}) => (
          <View
            style={{
              width: '100%',
              paddingHorizontal: getWidth(20),
              paddingTop: index === 0 ? getHeight(20) : 0,
            }}>
            <WorkoutCard
              title={item.name}
              day={item.day}
              date={item.date}
              duration={item.duration}
              intensity={item.intensity}
              image={item.overviewImage}
              drag={drag}
              onPressCard={() => navigation.navigate('StartWorkout')} // add params to specify workout ID
            />
          </View>
        )}
      />
    </View>
  );
}
