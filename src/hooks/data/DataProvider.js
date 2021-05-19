/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './DataContext';
import Programme from '../../apollo/queries/Programme';
import WorkoutTags from '../../apollo/queries/WorkoutTags';
import OnDemandWorkouts from '../../apollo/queries/OnDemandWorkouts';
import AsyncStorage from '@react-native-community/async-storage';
import {
  differenceInDays,
  differenceInCalendarDays,
  addDays,
  parseISO,
} from 'date-fns';
import {Auth} from 'aws-amplify';

import {
  initializeRestDays,
  getStoredPastRestDays,
  getStoredFutureRestDays,
  getWeekArrayWithPastDays,
} from './WeekStructureUtils';
import addWorkoutDates from '../../utils/addWorkoutDates';
import addRestDays from '../../utils/addRestDays';

import {cacheWeekVideos, cacheImages} from './VideoCacheUtils';

import useCustomQuery from '../../hooks/customQuery/useCustomQuery';
import FastImage from 'react-native-fast-image';
import OfflineUtils from './OfflineUtils';

export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const {runQuery} = useCustomQuery();

  const [programme, setProgramme] = useState();
  const [programmeModalImage, setProgrammeModalImage] = useState();

  const [currentWeek, setCurrentWeek] = useState();
  const [nextWeek, setNextWeek] = useState();

  // Get stored rest days from Async or create defaults
  const getStoredDays = useCallback(async (numberOfWorkouts) => {
    let days = await AsyncStorage.getItem('@CURRENT_WEEK');
    days = JSON.parse(days);

    if (days) {
      days = days.map((it) => {
        return {
          ...it,
          date: parseISO(it.date),
          exactDate: parseISO(it.exactDate),
        };
      });
    }
    // Set default rest days if nothing stored
    if (!days || days.length === 0) {
      days = initializeRestDays(numberOfWorkouts);
      updateStoredDays(days);
    }

    return days;
  }, []);

  const updateStoredDays = useCallback(async (data) => {
    await AsyncStorage.setItem('@CURRENT_WEEK', JSON.stringify(data));
  }, []);

  const updateConsecutiveWorkouts = useCallback(async () => {
    const completed = currentWeek
      .filter((it) => it.completedAt)
      .map((it) => parseISO(it.completedAt));

    // Latest date first
    completed.sort((a, b) => b - a);

    const now = new Date();
    let consecutiveDays = 0;

    completed.map((date) => {
      if (differenceInDays(date, now) === 0) {
        consecutiveDays = 1;
      }

      if (differenceInDays(date, now) === 1 && consecutiveDays === 1) {
        consecutiveDays = 2;
      }

      if (differenceInDays(date, now) === 2 && consecutiveDays === 2) {
        consecutiveDays = 3;
      }
    });

    if (consecutiveDays > 0) {
      await AsyncStorage.setItem(
        '@CONSECUTIVE_DAYS',
        JSON.stringify(consecutiveDays),
      );
      await AsyncStorage.setItem(
        '@LAST_CONSECUTIVE_DAY',
        JSON.stringify(completed[0]),
      );
    }
  }, [currentWeek]);

  const getConsecutiveWorkouts = useCallback(async () => {
    const value = await AsyncStorage.getItem('@CONSECUTIVE_DAYS');
    const date = await AsyncStorage.getItem('@LAST_CONSECUTIVE_DAY');

    return {
      lastDate: parseISO(date),
      consecutiveWorkouts: value ? parseInt(value) : 0,
    };
  }, []);

  const clearConsecutiveDays = useCallback(async () => {
    await AsyncStorage.clear('@CONSECUTIVE_DAYS');
    await AsyncStorage.clear('@LAST_CONSECUTIVE_DAY');
  }, []);

  // Get matching rest date from stored data
  const getRestDay = useCallback((futureRestDays, date) => {
    return futureRestDays.find((it) => {
      let diff;
      if (it.exactDate < date) {
        diff =
          differenceInDays(it.exactDate, date) === 0 &&
          it.exactDate.getDay() === date.getDay();
      } else {
        diff =
          differenceInDays(date, it.exactDate) === 0 &&
          it.exactDate.getDay() === date.getDay();
      }

      return diff;
    });
  }, []);

  // Structure current week UI
  const structureWeek = useCallback((workouts, storedDays) => {
    let workoutIndex = 0;

    // PAST
    let pastWorkouts = workouts.filter((it) => it.completedAt);

    pastWorkouts = pastWorkouts.map((workout) => {
      workoutIndex = workoutIndex + 1;
      console.log(workoutIndex, workout.completedAt);
      return {
        ...workout,
        name: workout.name.toUpperCase(),
        exactDate: new Date(workout.completedAt),
        day: workoutIndex,
      };
    });

    let pastRestDays = getStoredPastRestDays(storedDays);

    let week = getWeekArrayWithPastDays(pastWorkouts, pastRestDays);

    // FUTURE
    let futureWorkouts = workouts.filter(
      (it) => !it.completedAt && !it.isRestDay,
    );
    const futureRestDays = getStoredFutureRestDays(storedDays);

    let startDate = new Date();

    // Move to next day if today has a completed workout already
    const lastWorkoutToday = wasLastWorkoutToday(workouts);
    if (lastWorkoutToday === true) {
      startDate = addDays(startDate, 1);
    }

    // Add future dates
    const remaining = 7 - week.length;

    for (let i = 0; i < remaining; i++) {
      const date = addDays(startDate, i);

      const restDay = getRestDay(futureRestDays, date);

      if (restDay) {
        week.push(restDay);
      } else {
        let workout = futureWorkouts.shift();

        if (workout) {
          workoutIndex = workoutIndex + 1;

          workout = {
            ...workout,
            name: workout.name.toUpperCase(),
            exactDate: date,
            day: workoutIndex,
          };
          week.push(workout);
        } else {
          const extraRestDay = {
            name: 'REST DAY',
            isRestDay: true,
            id: 'restDay',
            exactDate: date,
          };

          week.push(extraRestDay);
        }
      }
    }

    week = week.sort((a, b) => a.exactDate > b.exactDate);
    setCurrentWeek(week);

    return week;
  }, []);

  useEffect(() => {
    if (currentWeek && currentWeek.length > 0 && programme) {
      const lastDate = currentWeek.reduce((a, b) =>
        a.exactDate > b.exactDate ? a : b,
      ).exactDate;

      const nextWeekStartDate = addDays(new Date(lastDate), 1);

      // Don't set next week if already correct
      if (nextWeek && nextWeek.length > 0) {
        let isSameStartDay =
          differenceInDays(nextWeekStartDate, nextWeek[0].exactDate) === 0 &&
          nextWeekStartDate.getDay() === nextWeek[0].exactDate.getDay();

        if (isSameStartDay) return;
      }

      if (!programme.nextWeek) return;

      let weekWorkout = programme.nextWeek.workouts
        .slice()
        .sort((a, b) => a.completedAt && a.orderIndex - b.orderIndex);

      const week = addWorkoutDates(addRestDays(weekWorkout), nextWeekStartDate);

      setNextWeek(week);
    }
  }, [currentWeek, programme]);

  const initCacheWeekVideos = useCallback(
    async (workouts) => {
      if (isConnected) {
        cacheWeekVideos(workouts);
      }
    },
    [isConnected],
  );

  const initCacheImages = useCallback(
    async (list) => {
      if (isConnected) {
        FastImage.preload(
          list
            .map((it) => {
              console.log('Caching Image: ', it);
              return {uri: it};
            })
            .filter((it) => it.uri !== null),
        );
      }
    },
    [isConnected],
  );

  const getProgramme = useCallback(async () => {
    const res = await runQuery({
      query: Programme,
      key: 'getProgramme',
      setValue: async (data) => {
        processProgramme(data);
      },
    });

    if (!res.success) {
      setCurrentWeek(null);
      setNextWeek(null);
      setProgramme(null);
    }
  }, [runQuery]);

  const processProgramme = async (data) => {
    // Check programme is completed
    if (data.isComplete) {
      setCurrentWeek([]);
      setNextWeek([]);
      setProgramme(data);
      return;
    }

    let newData = data;

    // Add offline completed workouts
    const offlineCompleted = await OfflineUtils.getOfflineCompletedWorkouts();

    console.log('Offline completed to add', offlineCompleted.length);
    const workouts = data.currentWeek.workouts.slice();

    const updatedWorkouts = workouts.map((workout) => {
      let newWorkout = offlineCompleted.find((it) => workout.id === it.id);

      return {
        ...workout,
        completedAt: newWorkout ? newWorkout.date : workout.completedAt,
      };
    });

    newData = {
      ...data,
      currentWeek: {
        ...data.currentWeek,
        workouts: updatedWorkouts,
      },
    };

    setProgrammeModalImage(newData.programmeImage);
    initCacheWeekVideos(newData.currentWeek.workouts);

    const images = newData.currentWeek.workouts.map((it) => {
      return it.overviewImage;
    });
    if (newData.programmeImage) {
      images.push(newData.programmeImage);
    }
    initCacheImages(images);

    const numberOfWorkouts = newData.currentWeek.workouts.length;
    let storedDays = await getStoredDays(numberOfWorkouts);

    structureWeek(
      newData.currentWeek.workouts
        .slice()
        .sort((a, b) => a.orderIndex > b.orderIndex),
      storedDays,
    );

    setProgramme(newData);
  };

  useEffect(() => {
    async function checkUser() {
      const cognitoUser = await Auth.currentAuthenticatedUser().catch((err) => {
        return null;
      });
      if (cognitoUser) {
        getProgramme();
        getWorkoutTags();
      }
    }

    checkUser();
  }, []);

  const [isDownloadEnabled, setDownloadEnabled] = useState();

  const getDownloadEnabled = useCallback(async () => {
    const value = (await AsyncStorage.getItem('@DOWNLOAD_ENABLED')) || 'false';
    const enabled = JSON.parse(value);
    setDownloadEnabled(enabled);
  }, []);

  // Current Workout data
  const [selectedWorkout, setSelectedWorkout] = useState();
  const [isSelectedWorkoutOnDemand, setIsSelectedWorkoutOnDemand] = useState(
    false,
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);

  const [selectedWeight, setSelectedWeight] = useState(20);

  useEffect(() => {
    console.log('selectedWeight useEffect', selectedWeight);
  }, [selectedWeight]);

  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    const weightsArray = [];
    for (let i = 0; i < 201; i++) {
      weightsArray.push(i);
    }
    setWeightData(weightsArray);
  }, []);

  const [weightsToUpload, setWeightsToUpload] = useState([]);

  const wasLastWorkoutToday = useCallback((workouts) => {
    const today = new Date();
    const wasToday = workouts.find((workout) => {
      return (
        workout.completedAt &&
        differenceInCalendarDays(parseISO(workout.completedAt), today) === 0
      );
    });

    return wasToday !== undefined ? true : false;
  }, []);

  const reset = useCallback(async () => {
    setProgramme(null);
    setCurrentWeek(null);
    setNextWeek(null);
    setWorkoutTags(null);

    AsyncStorage.removeItem('@CURRENT_WEEK');
    AsyncStorage.removeItem('@COMPLETE_WEEK_MODAL_NUMBER');

    AsyncStorage.removeItem('@ANALYTICS_ASKED');
    AsyncStorage.removeItem('@NOTIFICATIONS_ASKED');
  }, []);

  // ** ** ** ** ** On Demand ** ** ** ** **

  const [workoutTags, setWorkoutTags] = useState([]);
  const [selectedWorkoutTags, setSelectedWorkoutTags] = useState([]);
  const [onDemandWorkouts, setOnDemandWorkouts] = useState([]);

  const getWorkoutTags = useCallback(async () => {
    const res = await runQuery({
      query: WorkoutTags,
      key: 'workoutTags',
      setValue: async (data) => {
        setWorkoutTags(data);
      },
    });

    if (!res.success) {
      setWorkoutTags(null);
    }
  }, [runQuery]);

  const getOnDemandWorkouts = useCallback(
    async (tags) => {
      const res = await runQuery({
        query: OnDemandWorkouts,
        key: 'onDemandWorkouts',
        variables: {tagIds: tags},
        setValue: async (data) => {
          setOnDemandWorkouts(data.nodes);
        },
      });

      if (!res.success) {
        setOnDemandWorkouts(null);
      }
    },
    [runQuery],
  );

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      programme,
      getProgramme,
      programmeModalImage,
      setProgrammeModalImage,
      selectedWorkout,
      setSelectedWorkout,
      getDownloadEnabled,
      isDownloadEnabled,
      currentExerciseIndex,
      setCurrentExerciseIndex,
      currentWeek,
      nextWeek,
      updateStoredDays,
      structureWeek,
      updateConsecutiveWorkouts,
      getConsecutiveWorkouts,
      clearConsecutiveDays,
      selectedWeight,
      setSelectedWeight,
      weightData,
      wasLastWorkoutToday,
      weightsToUpload,
      setWeightsToUpload,
      completedExercises,
      setCompletedExercises,
      reset,
      initCacheWeekVideos,
      workoutTags,
      setWorkoutTags,
      getWorkoutTags,
      selectedWorkoutTags,
      setSelectedWorkoutTags,
      onDemandWorkouts,
      setOnDemandWorkouts,
      getOnDemandWorkouts,
      setIsSelectedWorkoutOnDemand,
      isSelectedWorkoutOnDemand,
      processProgramme,
    }),
    [
      programme,
      getProgramme,
      programmeModalImage,
      setProgrammeModalImage,
      selectedWorkout,
      setSelectedWorkout,
      getDownloadEnabled,
      isDownloadEnabled,
      currentExerciseIndex,
      setCurrentExerciseIndex,
      currentWeek,
      nextWeek,
      updateStoredDays,
      structureWeek,
      updateConsecutiveWorkouts,
      getConsecutiveWorkouts,
      clearConsecutiveDays,
      selectedWeight,
      setSelectedWeight,
      weightData,
      wasLastWorkoutToday,
      weightsToUpload,
      setWeightsToUpload,
      completedExercises,
      setCompletedExercises,
      reset,
      initCacheWeekVideos,
      workoutTags,
      setWorkoutTags,
      getWorkoutTags,
      selectedWorkoutTags,
      setSelectedWorkoutTags,
      onDemandWorkouts,
      setOnDemandWorkouts,
      getOnDemandWorkouts,
      setIsSelectedWorkoutOnDemand,
      isSelectedWorkoutOnDemand,
      processProgramme,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
