/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 10:04:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useState, useEffect, useCallback} from 'react';
import {View, Image, Text, TouchableOpacity, Platform} from 'react-native';
import {ScaleHook} from 'react-native-design-to-component';
import useTheme from '../../hooks/theme/UseTheme';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation, useIsFocused} from '@react-navigation/native';
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
import {
  addDays,
  addWeeks,
  startOfDay,
  isAfter,
  differenceInDays,
} from 'date-fns';
import CompleteWorkoutWeek from '../../apollo/mutations/CompleteWorkoutWeek';
import DisplayAlert from '../../utils/DisplayAlert';
import AsyncStorage from '@react-native-community/async-storage';
import useLoading from '../../hooks/loading/useLoading';
import {FileManager} from 'the-core-ui-module-tdmediamanager';
import {useNetInfo} from '@react-native-community/netinfo';

import {shouldCacheWeek} from '../../hooks/data/VideoCacheUtils';
import WeekContent from './WeekContent';

var hindiLocale = require('date-fns/locale/hi');
var engLocale = require('date-fns/locale/en-GB');

const {clearDirectory, videosDirectoryPath} = FileManager;

export default function WorkoutHomeScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {isConnected, isInternetReachable} = useNetInfo();

  const {getHeight, getWidth, fontSize} = ScaleHook();
  const {textStyles, colors} = useTheme();
  const {dictionary, locale} = useDictionary();
  const {WorkoutDict, ProfileDict, OfflineMessage} = dictionary;

  const [stayTunedEnabled, setStayTunedEnabled] = useState(true);

  const navigation = useNavigation();
  const {setLoading, setDownloading} = useLoading();

  useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  const {
    programme,
    getProgramme,
    getProgrammeSchedule,
    totalWeeks,
    currentWeekNumber,
    selectedWeekIndex,
    setSelectedWeekIndex,
    setSelectedWorkout,
    currentWeek,
    updateStoredDays,
    structureWeek,
    updateConsecutiveWorkouts,
    getConsecutiveWorkouts,
    clearConsecutiveDays,
    wasLastWorkoutToday,
    setIsSelectedWorkoutOnDemand,
    initCacheWeekVideos,
  } = useData();

  const {suspendedAccount, isSubscriptionActive} = useUserData();
  const [updateOrderMutation] = useMutation(UpdateOrder);
  const [completeWeekMutation] = useMutation(CompleteWorkoutWeek);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !programme) {
      console.log('Focused Tab1: need refetch getProgramme');
      setLoading(true);

      async function getData() {
        await getProgrammeSchedule();
        getProgramme();
      }
      getData();
    }
  }, [isFocused, programme, setLoading, getProgramme]);

  useEffect(() => {
    if (programme && programme.isComplete) {
      showStayTuned();
    }
  }, [programme, showStayTuned]);

  // Check if week is completed
  useEffect(() => {
    if (programme?.currentWeek && currentWeek) {
      const remaining = currentWeek.filter(
        (it) => !it.isRestDay && !it.completedAt,
      ).length;

      //Still have workouts for current week
      if (remaining === 0) {
        weekCompleted();
      } else {
        setStayTunedEnabled(false);
      }
    }
  }, [programme, currentWeek, weekCompleted, showStayTuned]);

  const weekCompleted = useCallback(async () => {
    // Only show the week complete modal once when the last workout is done

    const shouldShowModal = await shouldShowWeekCompleteModal();

    if (shouldShowModal) {
      constructWeekCompleteModal();
    } else {
      showStayTunedModal();
    }

    let startedAt = startOfDay(new Date(programme.currentWeek.startedAt));

    if (isAfter(new Date(), addWeeks(startedAt, 1))) {
      callCompleteWeekMutation();
    } else {
      // Week completee not allowed, show stay tuned where needed
      setStayTunedEnabled(true);
    }
  }, [
    callCompleteWeekMutation,
    constructWeekCompleteModal,
    programme?.currentWeek,
    shouldShowWeekCompleteModal,
  ]);

  const callCompleteWeekMutation = useCallback(async () => {
    setLoading(true);
    await completeWeekMutation()
      .then(async (res) => {
        const success = R.path(['data', 'completeWorkoutWeek'], res);

        if (success) {
          await updateConsecutiveWorkouts();
          await AsyncStorage.removeItem('@CURRENT_WEEK');
          await AsyncStorage.removeItem('@COMPLETE_WEEK_MODAL_NUMBER');

          await AsyncStorage.setItem(
            '@SHOULD_CACHE_NEW_WEEK',
            JSON.stringify(true),
          );
          await clearDirectory(videosDirectoryPath);

          // Refetch whole programme with completed week and programme with new current week
          await getProgrammeSchedule();
          getProgramme();
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('completeWeekMutation', err);
        setLoading(false);
      });
  }, [
    completeWeekMutation,
    getProgramme,
    getProgrammeSchedule,
    setLoading,
    updateConsecutiveWorkouts,
  ]);

  const constructWeekCompleteModal = useCallback(async () => {
    const {environment} = programme;
    const {weekNumber, workouts} = programme.currentWeek;

    let duration = 0;
    let reps = 0;
    let sets = 0;
    let seconds = 0;

    programme.currentWeek.workouts.map((workout) => {
      duration += workout.duration || 0;
      workout.exercises.map((exercise) => {
        sets += exercise.sets.length;
        exercise.sets.map((set) => {
          if (exercise.setType === 'REPS') {
            reps += set.quantity;
          } else {
            seconds += set.quantity;
          }
        });
      });
    });

    const props = {
      name: programme.trainer.name,
      weekNumber: weekNumber,
      totalDuration: duration,
      totalReps: 0,
      totalSets: sets,
      totalSeconds: seconds,
      totalWorkouts: workouts.length,
      environment: environment,
    };

    // Set currentWeek id to prevent showing modal again for the same week
    setModalShown();
    navigation.navigate('WeekComplete', {...props});
  }, [navigation, programme, setModalShown]);

  const shouldShowWeekCompleteModal = useCallback(async () => {
    let idOfLastWeekShown =
      (await AsyncStorage.getItem('@COMPLETE_WEEK_MODAL_NUMBER')) || '-1';
    return Number(idOfLastWeekShown) !== programme.currentWeek.weekNumber;
  }, [programme?.currentWeek?.weekNumber]);

  const setModalShown = useCallback(async () => {
    await AsyncStorage.setItem(
      '@COMPLETE_WEEK_MODAL_NUMBER',
      `${programme.currentWeek.weekNumber}`,
    );
  }, [programme?.currentWeek?.weekNumber]);

  async function shouldShowWarning() {
    const today = new Date();

    if (programme && programme.currentWeek) {
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
      setSelectedWeekIndex(selectedWeekIndex - 1);
    }
    if (direction === 'right') {
      setSelectedWeekIndex(selectedWeekIndex + 1);
    }
  }

  // Capture current rest days
  // Set date to the date assigned on that index
  // Update asyncStorage
  function updateStoredData(list = []) {
    let toStore = list.map((day, index) => {
      if (day && day.isRestDay) {
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

  async function updateOrder(newList = []) {
    if (newList.length === 0) {
      return;
    }
    // Previous data in case orderChange fails
    const prevList = currentWeek;

    const storedData = updateStoredData(newList);

    // This triggeres currentWeek to change and re render UI
    structureWeek(newList, storedData);

    // Construct new order of workouts
    let index = 0;
    const data = newList.filter((it) => !it?.isRestDay);
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
      .catch((err) => {
        console.log('updateOrderMutation Error', err);

        // Reset week order to what was before
        const storedData = updateStoredData(prevList);
        structureWeek(prevList, storedData);
      });
  }

  async function showStayTunedModal() {
    const lastDate = currentWeek.reduce((a, b) =>
      a.exactDate > b.exactDate ? a : b,
    ).exactDate;
    const nextWeekStartDate = addDays(lastDate, 1);

    const programmeLength = programme.trainer.programmes.filter(
      (prog) => prog.environment === programme.environment,
    )[0].numberOfWeeks;

    showStayTuned(nextWeekStartDate, programmeLength);
  }

  const showStayTuned = useCallback(
    (nextWeekStartDate = null, programmeLength = 0) => {
      navigation.navigate('StayTuned', {
        name: programme?.trainer.name,
        venue: programme?.environment,
        image: programme?.programmeImage,
        date: nextWeekStartDate,
        type:
          programme?.currentWeek === null ||
          programme?.currentWeek?.weekNumber === programmeLength
            ? 'programmeComplete'
            : 'workoutsComplete',
      });
    },
    [
      navigation,
      programme?.currentWeek,
      programme?.environment,
      programme?.programmeImage,
      programme?.trainer?.name,
    ],
  );
  const [shouldCache, setShouldCache] = useState(false);

  useEffect(() => {
    const check = async () => {
      const res = await shouldCacheWeek();
      setShouldCache(res);
    };
    check();
  }, [isFocused]);

  async function handleDownloadWeek() {
    if (!isConnected) {
      DisplayAlert({text: OfflineMessage});
      return;
    }

    DisplayAlert({
      title: null,
      text: WorkoutDict.DownloadWeek,
      buttons: [
        {
          text: ProfileDict.Cancel,
          style: 'cancel',
        },
        {
          text: WorkoutDict.Download,
          onPress: async () => {
            setDownloading(true);
            const res = await initCacheWeekVideos(
              programme?.currentWeek?.workouts,
            );

            DisplayAlert({
              text:
                res && res.success
                  ? WorkoutDict.DownloadComplete
                  : WorkoutDict.SomethingWentWrong,
            });
            setShouldCache(false);
            setDownloading(false);
          },
        },
      ],
    });
  }
  //setDownloading(false);
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
    headerContainer: {
      flexDirection: 'column',
      width: '100%',
      paddingHorizontal: getWidth(20),
    },
    header: {
      ...textStyles.bold34_black100,
      letterSpacing: -0.51,
      marginTop: getHeight(17),
    },
    subHeader: {
      ...textStyles.regular16_black90,
      lineHeight: fontSize(20),
      marginBottom: getHeight(5),
      letterSpacing: -0.32,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      alignSelf: 'center',
      marginTop: getHeight(10),
    },
    titleLeftContainer: {
      flexDirection: 'row',
      marginRight: getWidth(30),
      paddingHorizontal: getWidth(20),
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
      left: getWidth(170),
      flexDirection: 'row',
    },
    touch: {
      width: getWidth(25),
      height: getHeight(30),
      alignItems: 'center',
      justifyContent: 'center',
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

  const onPressCard = async (workout) => {
    if (suspendedAccount === true) {
      DisplayAlert({
        text: WorkoutDict.SuspendedAccount,
      });
      return;
    }

    const wasWorkoutToday = wasLastWorkoutToday(currentWeek);

    if (wasWorkoutToday === true) {
      DisplayAlert({
        text: WorkoutDict.WorkoutCompetedWarningText,
      });
      return;
    }

    if (selectedWeekIndex + 1 > currentWeekNumber) {
      if (stayTunedEnabled) {
        showStayTunedModal();
      } else {
        DisplayAlert({
          text: WorkoutDict.FutureWorkoutWarningText,
        });
      }
      return;
    }

    if (!isSubscriptionActive) {
      navigation.navigate('PurchaseModal');
      return;
    }
    // Sort exercises
    const newWorkout = {
      ...workout,
      exercises: workout.exercises
        ? workout.exercises.slice().sort((a, b) => a.orderIndex - b.orderIndex)
        : [],
    };

    const warning = await shouldShowWarning();

    if (warning === true) {
      await AsyncStorage.setItem('@LAST_WARNING_DATE', `${new Date()}`);
      setSelectedWorkout(newWorkout);
      setIsSelectedWorkoutOnDemand(false);
      navigation.navigate('TakeARest', {
        name: programme.trainer.name,
      });
      return;
    }

    setSelectedWorkout(newWorkout);
    setIsSelectedWorkoutOnDemand(false);
    navigation.navigate('StartWorkout');
  };

  const renderArrows = () => {
    return (
      <View style={styles.touchContainer}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => handlePress('left')}
          disabled={selectedWeekIndex <= 0}>
          <TDIcon
            input={isRTL() ? 'chevron-right' : 'chevron-left'}
            inputStyle={{
              size: fontSize(16),
              color: selectedWeekIndex <= 0 ? colors.black40 : colors.black100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => handlePress('right')}
          disabled={selectedWeekIndex + 1 >= totalWeeks}>
          <TDIcon
            input={isRTL() ? 'chevron-left' : 'chevron-right'}
            inputStyle={{
              size: fontSize(16),
              color:
                selectedWeekIndex + 1 >= totalWeeks
                  ? colors.black40
                  : colors.black100,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDownloadOption = () => {
    return (
      <View
        style={{
          position: 'absolute',
          right: getWidth(23),
          width: getWidth(45),
          flexDirection: 'row',
          height: '100%',
        }}>
        <TouchableOpacity
          onPress={handleDownloadWeek}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={require('../../../assets/icons/downloadIcon.png')} />
        </TouchableOpacity>
      </View>
    );
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <View style={styles.container}>
      <WorkoutHomeHeader />
      <View style={styles.headerBorder} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{WorkoutDict.YourProgramme}</Text>
        <Text style={styles.subHeader}>{WorkoutDict.SubHeader}</Text>
      </View>

      {selectedWeekIndex !== null && totalWeeks && (
        <View style={styles.titleContainer}>
          <View style={styles.titleLeftContainer}>
            <Text style={styles.weekText}>{`${WorkoutDict.WeekText} ${
              selectedWeekIndex + 1
            } / ${totalWeeks}`}</Text>
          </View>
          {renderArrows()}
          {programme?.currentWeek &&
            selectedWeekIndex + 1 === currentWeekNumber &&
            shouldCache &&
            renderDownloadOption()}
        </View>
      )}

      <WeekContent updateOrder={updateOrder} onPressCard={onPressCard} />
    </View>
  );
}
