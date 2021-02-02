/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './DataContext';
import Programme from '../../apollo/queries/Programme';
import AsyncStorage from '@react-native-community/async-storage';
import {
  differenceInDays,
  differenceInCalendarDays,
  addDays,
  format,
  parseISO,
} from 'date-fns';
import {Auth} from 'aws-amplify';

import {
  initializeRestDays,
  getPastWorkouts,
  getStoredPastRestDays,
  getStoredFutureRestDays,
  getWeekArrayWithPastDays,
} from './WeekStructureUtils';

export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const [programme, setProgramme] = useState();

  const [currentWeek, setCurrentWeek] = useState();

  // Get stored rest days from Async or create defaults
  const getStoredDays = useCallback(async (numberOfWorkouts) => {
    let days = await AsyncStorage.getItem('@CURRENT_WEEK');
    days = JSON.parse(days);
    console.log(days);

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
  const structureWeek = useCallback(async (workouts, storedDays) => {
    // PAST
    let pastWorkouts = getPastWorkouts(workouts);
    let pastRestDays = getStoredPastRestDays(storedDays);

    let week = getWeekArrayWithPastDays(pastWorkouts, pastRestDays);

    // FUTURE
    let futureWorkouts = workouts.filter((it) => !it.completedAt);
    const futureRestDays = getStoredFutureRestDays(storedDays);

    let startDate = new Date();

    // Move to next day if today has a completed workout already
    if (wasLastWorkoutToday() === true) {
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
        const formattedDate = format(date, 'iiii, do LLL');

        if (workout) {
          workout = {
            ...workout,
            name: workout.name.toUpperCase(),
            date: formattedDate,
            exactDate: date,
            day: workout.orderIndex,
          };
          week.push(workout);
        } else {
          const extraRestDay = {
            name: 'REST DAY',
            isRestDay: true,
            id: 'restDay',
            date: formattedDate,
            exactDate: date,
          };

          week.push(extraRestDay);
        }
      }
    }

    setCurrentWeek(week);
    return week;
  }, []);

  const [getProgramme] = useLazyQuery(Programme, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: async (res) => {
      const data = res.getProgramme;

      const numberOfWorkouts = data.currentWeek.workouts.length;
      let storedDays = await getStoredDays(numberOfWorkouts);

      structureWeek(
        data.currentWeek.workouts
          .slice()
          .sort((a, b) => a.orderIndex > b.orderIndex),
        storedDays,
      );
      setProgramme(data);
    },
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    async function checkUser() {
      const cognitoUser = await Auth.currentAuthenticatedUser().catch((err) => {
        return null;
      });

      if (cognitoUser) {
        getProgramme();
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
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const [workoutTime, setWorkoutTime] = useState(0);
  const [isWorkoutTimerRunning, setIsWorkoutTimerRunning] = useState(false);
  const intervalRef = useRef();

  const cancelInterval = useCallback(async () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  useEffect(() => {
    if (isWorkoutTimerRunning) {
      intervalRef.current = setInterval(
        () => setWorkoutTime((prevMS) => prevMS + 1000),
        1000,
      );
    } else {
      cancelInterval();
    }
    return () => {
      cancelInterval();
    };
  }, [isWorkoutTimerRunning]);

  const [weightChoice, setWeightChoice] = useState('kg'); // fake data, to be replaced with data from back end
  const [selectedWeight, setSelectedWeight] = useState(20);

  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    const weightsArray = [];
    for (let i = 1; i < 201; i++) {
      weightsArray.push(i);
    }
    setWeightData(weightsArray);
  }, []);

  const wasLastWorkoutToday = useCallback(async () => {
    let lastDate = await AsyncStorage.getItem('@LAST_WORKOUT_DATE');
    if (lastDate) {
      const firstDate = new Date();
      lastDate = parseISO(JSON.parse(lastDate));
      return lastDate.setHours(0, 0, 0, 0) === firstDate.setHours(0, 0, 0, 0);
    } else {
      return false;
    }
  }, []);

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      programme,
      getProgramme,
      selectedWorkout,
      setSelectedWorkout,
      getDownloadEnabled,
      isDownloadEnabled,
      currentExerciseIndex,
      setCurrentExerciseIndex,
      workoutTime,
      setWorkoutTime,
      isWorkoutTimerRunning,
      setIsWorkoutTimerRunning,
      currentWeek,
      updateStoredDays,
      structureWeek,
      updateConsecutiveWorkouts,
      getConsecutiveWorkouts,
      clearConsecutiveDays,
      weightChoice,
      setWeightChoice,
      selectedWeight,
      setSelectedWeight,
      weightData,
      wasLastWorkoutToday,
    }),
    [
      programme,
      getProgramme,
      selectedWorkout,
      setSelectedWorkout,
      getDownloadEnabled,
      isDownloadEnabled,
      currentExerciseIndex,
      setCurrentExerciseIndex,
      workoutTime,
      setWorkoutTime,
      isWorkoutTimerRunning,
      setIsWorkoutTimerRunning,
      currentWeek,
      updateStoredDays,
      structureWeek,
      updateConsecutiveWorkouts,
      getConsecutiveWorkouts,
      clearConsecutiveDays,
      weightChoice,
      setWeightChoice,
      selectedWeight,
      setSelectedWeight,
      weightData,
      wasLastWorkoutToday,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
