/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 10:04:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
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
import useUserData from '../../hooks/data/useUserData';
import {useMutation} from '@apollo/client';
import UpdateOrder from '../../apollo/mutations/UpdateOrder';
import * as R from 'ramda';
import addRestDays from '../../utils/addRestDays';
import addWorkoutDates from '../../utils/addWorkoutDates';
import {differenceInDays, addDays, parseISO} from 'date-fns';
import CompleteWorkoutWeek from '../../apollo/mutations/CompleteWorkoutWeek';
import DisplayAlert from '../../utils/DisplayAlert';
import AsyncStorage from '@react-native-community/async-storage';
import useLoading from '../../hooks/loading/useLoading';

export default function WorkoutHomeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary} = useDictionary();
  const {WorkoutDict} = dictionary;

  const [weekNumber, setWeekNumber] = useState(1);
  const [stayTunedEnabled, setStayTunedEnabled] = useState(true);

  const [workoutsToDisplay, setWorkoutsToDisplay] = useState([]);
  const navigation = useNavigation();
  const {setLoading} = useLoading();

  navigation.setOptions({
    header: () => null,
  });

  const {
    programme,
    getProgramme,
    setSelectedWorkout,
    currentWeek,
    nextWeek,
    updateStoredDays,
    structureWeek,
    updateConsecutiveWorkouts,
    getConsecutiveWorkouts,
    clearConsecutiveDays,
    wasLastWorkoutToday,
    completedFreeWorkouts
  } = useData();

  const { suspendedAccount, isSubscriptionActive } = useUserData();
  const [updateOrderMutation] = useMutation(UpdateOrder);
  const [completeWeekMutation] = useMutation(CompleteWorkoutWeek);


  useEffect(() => {
    setLoading(true);
    getProgramme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if week is completed
  useEffect(() => {

    if (programme && currentWeek) {
      
      async function checkWeekComplete() {
        const remaining = currentWeek.filter(
          (it) => !it.isRestDay && !it.completedAt,
        ).length;

        //Still have workouts for current week
        if (remaining > 0) {
          setStayTunedEnabled(false);
          return;
        } else weekCompleted();
      }

      checkWeekComplete();
    }
  }, [programme, currentWeek]);

  async function weekCompleted() {
    const shouldShowModal = await shouldShowWeekCompleteModal();

    if (shouldShowModal) {
      constructWeekCompleteModal();
    }

    // Check at least 7 days past week start date
    let completeWeekLimitDate = addDays(
      parseISO(programme.currentWeek.startedAt),
      6,
    ).setHours(0, 0, 0, 0);

    // Passed limit date  note: === 0 means same date as today, we need next day
    const now = new Date().setHours(0, 0, 0, 0);
    if (differenceInDays(now, completeWeekLimitDate) > 0) {
      callCompleteWeekMutation();
    } else {
      // Week completee not allowed, show stay tuned where needed
      setStayTunedEnabled(true);
    }
  }

  async function callCompleteWeekMutation() {

    setLoading(true);
    await completeWeekMutation()
      .then(async (res) => {
        const success = R.path(['data', 'completeWorkoutWeek'], res);

        if (success) {
          await updateConsecutiveWorkouts();
          await AsyncStorage.removeItem('@CURRENT_WEEK');
          await AsyncStorage.removeItem('@COMPLETE_WEEK_MODAL_NUMBER');
          getProgramme();
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  async function constructWeekCompleteModal() {
    const {weekNumber} = programme.currentWeek;
    let duration = 0;
    let reps = 0;
    let sets = 0;
    let seconds = 0;
    programme.currentWeek.workouts.map((workout) => {
      duration += workout.duration || 0;
      workout.exercises.map((exercise) => {
        sets += exercise.sets.length;
        exercise.sets.map((set) => {
          switch (exercise.setType) {
            case 'REPS': {
              reps += set.quantity;
              break;
            }
            case 'TIME': {
              seconds += set.quantity;
              break;
            }
          }
        });
      });
    });

    const props = {
      name: programme.trainer.name,
      weekNumber: weekNumber,
      totalDuration: duration,
      totalReps: reps,
      totalSets: sets,
      totalSeconds: seconds,
    };

    // Set currentWeek id to prevent showing modal again for the same week
    setModalShown();
    navigation.navigate('WeekComplete', {...props});
  }

  async function shouldShowWeekCompleteModal() {
    let idOfLastWeekShown =
      (await AsyncStorage.getItem('@COMPLETE_WEEK_MODAL_NUMBER')) || '-1';
    return Number(idOfLastWeekShown) !== programme.currentWeek.weekNumber;
  }

  async function setModalShown() {
    await AsyncStorage.setItem(
      '@COMPLETE_WEEK_MODAL_NUMBER',
      `${programme.currentWeek.weekNumber}`,
    );
  }

  useEffect(() => {
    if (programme) {
      if (weekNumber === 1 && currentWeek) {
        setWorkoutsToDisplay(currentWeek);
        setLoading(false);
      }
      if (weekNumber === 2 && nextWeek) {
        setWorkoutsToDisplay(nextWeek);
      }

      
    }
  }, [weekNumber, programme]);

  async function shouldShowWarning() {
    const today = new Date();

    if (programme) {
      // Check last time warning was shown
      const date = await AsyncStorage.getItem('@LAST_WARNING_DATE');
      if (differenceInDays(new Date(), new Date(date)) === 0) {
        console.log('Consecutive workouts warning already show: Abort');
        return false;
      }

      const previousWorkoutDates = [];
      const completedWorkouts = programme.currentWeek.workouts
        .filter((workout) => workout.completedAt !== null)
        .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
      completedWorkouts.forEach((workout) =>
        previousWorkoutDates.push(workout.completedAt),
      );

      // Check previous week dates
      if (previousWorkoutDates.length < 3) {
        const {consecutiveWorkouts, lastDate} = await getConsecutiveWorkouts();
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
          clearConsecutiveDays();
          return true;
        }
        // Check current week dates
      } else if (previousWorkoutDates.length >= 3) {
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
          return true;
        }
      }
    }
    return false;
  }

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  function handlePress(direction) {
    if (!programme) {
      return;
    }

    if (direction === 'left') {
      setWeekNumber(1);
    }
    if (direction === 'right') {
      setWeekNumber(2);
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

    const updatedWeek = structureWeek(newList, storedData);

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
    console.log(newOrder);
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

  async function showStayTunedModal() {
    const lastDate = currentWeek.reduce((a, b) =>
      a.exactDate > b.exactDate ? a : b,
    ).exactDate;
    const nextWeekStartDate = addDays(lastDate, 1);

    const programmeLength = programme.trainer.programmes.filter(
      (prog) => prog.environment === programme.environment,
    )[0].numberOfWeeks;

    navigation.navigate('StayTuned', {
      name: programme?.trainer.name,
      venue: programme?.environment,
      image: programme?.programmeImage,
      date: nextWeekStartDate,
      type:
        programme?.currentWeek.weekNumber === programmeLength
          ? 'programmeComplete'
          : 'workoutsComplete',
    });
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
          <Text style={styles.numberText}>{`${
            programme
              ? weekNumber === 1
                ? programme.currentWeek.weekNumber
                : programme.currentWeek.weekNumber + 1
              : 1
          }`}</Text>
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
                onPressCard={async (workout) => {
                   if (suspendedAccount === true) {
                    DisplayAlert({
                      text: WorkoutDict.SuspendedAccount
                    })
                    return;
                   }

                   if (completedFreeWorkouts && !isSubscriptionActive) {
                    navigation.navigate('PurchaseModal');
                    return;
                   }


                  if (weekNumber !== 1) {
                    if (stayTunedEnabled) {
                      showStayTunedModal();
                    }
                    return;
                  }

                  const wasWorkoutToday = wasLastWorkoutToday(
                    programme.currentWeek.workouts,
                  );
                  if (wasWorkoutToday === true) {
                    DisplayAlert({
                      text: WorkoutDict.WorkoutCompetedWarningText,
                    });
                    return;
                  }

                  // Sort exercises
                  const newWorkout = {
                    ...workout,
                    exercises: workout.exercises
                      .slice()
                      .sort((a, b) => a.orderIndex - b.orderIndex),
                  };

                  const warning = await shouldShowWarning();

                  if (warning === true) {
                    await AsyncStorage.setItem(
                      '@LAST_WARNING_DATE',
                      `${new Date()}`,
                    );
                    setSelectedWorkout(newWorkout);
                    navigation.navigate('TakeARest', {
                      name: programme.trainer.name,
                    });
                    return;
                  }

                  setSelectedWorkout(newWorkout);
                  navigation.navigate('StartWorkout');
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
