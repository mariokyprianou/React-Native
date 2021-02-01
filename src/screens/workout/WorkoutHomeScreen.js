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
import {differenceInDays, addDays, format} from 'date-fns';
import CompleteWorkoutWeek from '../../apollo/mutations/CompleteWorkoutWeek';

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

  const {
    programme,
    getProgramme,
    setSelectedWorkout,
    currentWeek,
    updateStoredDays,
    structureWeek,
    updateConsecutiveWorkouts,
    getConsecutiveWorkouts,
    clearConsecutiveDays,
  } = useData();
  const [updateOrderMutation] = useMutation(UpdateOrder);
  const [completeWeekMutation] = useMutation(CompleteWorkoutWeek);

  useEffect(() => {
    getProgramme();
  }, []);

  // Check if week is completed
  useEffect(() => {
    if (programme) {
      const hasRemaining = programme.currentWeek.workouts.find(
        (workout) => !workout.completedAt,
      );

      if (!hasRemaining) {
        const {weekNumber} = programme.currentWeek;
        let duration = 0;
        let reps = 0;
        let sets = 0;
        programme.currentWeek.workouts.map((workout) => {
          duration += workout.duration || 0;
          workout.exercises.map((exercise) => {
            sets += exercise.sets.length;
            exercise.sets.map((set) => (reps += set.quantity));
          });
        });

        const weekCompleteProps = {
          name: programme.trainer.name,
          weekNumber: weekNumber,
          totalDuration: duration,
          totalReps: reps,
          totalSets: sets,
        };

        completeWeek(weekCompleteProps);
      }
    }
  }, [programme]);

  const getNextWeek = (workouts) => {
    // Sort by index and isCompleted
    let weekWorkout = workouts
      .slice()
      .sort((a, b) => a.completedAt && a.orderIndex - b.orderIndex);

    const week = addWorkoutDates(addRestDays(weekWorkout), false);

    return week;
  };

  async function completeWeek(props) {
    await completeWeekMutation()
      .then((res) => {
        const success = R.path(['data', 'completeWorkoutWeek'], res);

        if (success) {
          updateConsecutiveWorkouts();
          updateStoredDays([]);
          navigation.navigate('WeekComplete', {...props});
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (programme) {
      if (weekNumber === 1) {
        setWorkoutsToDisplay(currentWeek);
      }
      if (weekNumber === 2) {
        const nextWeek = getNextWeek(programme.nextWeek.workouts);
        setWorkoutsToDisplay(nextWeek);
      }
    }
  }, [programme, weekNumber]);

  async function checkLastWeek(previousWorkoutDates) {
    const {consecutiveWorkouts, lastDate} = await getConsecutiveWorkouts();

    const today = new Date();
    if (
      (previousWorkoutDates.length === 0 &&
        consecutiveWorkouts === 3 &&
        differenceInDays(today, lastDate) === 1) ||
      (previousWorkoutDates.length === 1 &&
        consecutiveWorkouts === 2 &&
        differenceInDays(today, lastDate) === 2) ||
      (previousWorkoutDates.length === 2 &&
        consecutiveWorkouts === 1 &&
        differenceInDays(today, lastDate) === 3)
    ) {
      setThreeWorkoutsInRow(true);
      clearConsecutiveDays();
    }
  }
  useEffect(() => {
    const today = new Date();

    if (programme) {
      const previousWorkoutDates = [];
      const completedWorkouts = programme.currentWeek.workouts.filter(
        (workout) => workout.completedAt !== null,
      );
      completedWorkouts.forEach((workout) =>
        previousWorkoutDates.push(workout.completedAt),
      );

      if (previousWorkoutDates.length < 3) {
        checkLastWeek(previousWorkoutDates);
      }

      if (previousWorkoutDates.length >= 3) {
        const lastIndex = previousWorkoutDates.length - 1;
        if (
          differenceInDays(today, new Date(previousWorkoutDates[lastIndex])) ===
            1 &&
          differenceInDays(
            today,
            new Date(previousWorkoutDates[lastIndex - 1]),
          ) === 2 &&
          differenceInDays(
            today,
            new Date(previousWorkoutDates[lastIndex - 2]),
          ) === 3
        ) {
          setThreeWorkoutsInRow(true);
        }
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

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    const firstDayNextWeek = addDays(
      new Date(programme?.currentWeek.workouts[0].completedAt),
      7,
    );
    const programmeLength = programme?.trainer.programmes.filter(
      (prog) => prog.environment === programme.environment,
    )[0].numberOfWeeks;

    if (direction === 'left') {
      setWeekNumber(1);
    }
    if (direction === 'right') {
      if (
        programme.currentWeek.workouts.every(
          (workout) => workout.completedAt !== null,
        )
      ) {
        navigation.navigate('StayTuned', {
          name: programme?.trainer.name,
          venue: programme?.environment,
          image: programme?.programmeImage,
          date: firstDayNextWeek,
          type:
            programme?.currentWeek.weekNumber === programmeLength
              ? 'programmeComplete'
              : 'workoutsComplete',
        });
      } else {
        setWeekNumber(2);
      }
    }
  }

  // Capture current rest days
  // Set date to the date assigned on that index
  // Update asyncStorage
  function updateStoredData(list) {
    let toStore = list.map((day, index) => {
      if (day.isRestDay) {
        return {
          id: 'restDay',
          date: currentWeek[index].exactDate,
          exactDate: currentWeek[index].exactDate,
        };
      }
    });
    toStore = toStore.filter(function (el) {
      return el;
    });

    updateStoredDays(toStore);

    return toStore;
  }

  async function updateOrder(newList) {
    const storedData = updateStoredData(newList);
    const updatedWeek = structureWeek(
      programme.currentWeek.workouts,
      storedData,
    );

    setWorkoutsToDisplay(updatedWeek);

    // Construct new order of workouts
    let index = 0;
    const data = newList.filter((it) => !it.isRestDay);
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
        renderItem={({item, index, drag, isActive}) => {
          return (
            <View
              style={{
                width: '100%',
                paddingHorizontal: getWidth(20),
                paddingTop: index === 0 ? getHeight(20) : 0,
              }}>
              <WorkoutCard
                workout={item}
                title={item.name}
                day={item.day}
                date={item.date}
                duration={item.duration}
                intensity={item.intensity}
                image={item.overviewImage}
                drag={weekNumber === 1 && drag}
                status={
                  item.completedAt ||
                  differenceInDays(item.exactDate, new Date()) < 0
                    ? 'complete'
                    : null
                }
                onPressCard={(workout) => {
                  if (weekNumber !== 1) {
                    return;
                  } else {
                    // Sort exercises
                    const newWorkout = {
                      ...workout,
                      exercises: workout.exercises
                        .slice()
                        .sort((a, b) => a.orderIndex - b.orderIndex),
                    };
                    setSelectedWorkout(newWorkout);
                    navigation.navigate('StartWorkout');
                  }
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
