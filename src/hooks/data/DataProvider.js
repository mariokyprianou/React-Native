/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import DataContext from './DataContext';
import Onboarding from '../../apollo/queries/Onboarding';
import Trainers from '../../apollo/queries/Trainers';
import Legals from '../../apollo/queries/Legals';
import ProgrammeQuestionnaire from '../../apollo/queries/ProgrammeQuestionnaire';
import Programme from '../../apollo/queries/Programme';
import addWorkoutDates from '../../utils/addWorkoutDates';
import addRestDays from '../../utils/addRestDays';
import AsyncStorage from '@react-native-community/async-storage';
import {differenceInDays, addDays, format, parse, parseISO} from 'date-fns';

import {
  initializeRestDays,
  getPastWorkouts,
  getStoredPastRestDays,
  getStoredFutureRestDays,
  getWeekArrayWithPastDays,
} from './WeekStructureUtils';

export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const [onboarding, setOnboarding] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [legals, setLegals] = useState({});
  const [programmeQuestionnaire, setProgrammeQuestionnaire] = useState({});
  const [suggestedProgramme, setSuggestedProgramme] = useState();

  const [programme, setProgramme] = useState();
  const [currentWeek, setCurrentWeek] = useState();

  useQuery(Onboarding, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const data = [];
        res.onboardingScreens.forEach((screen) => {
          data.unshift(screen);
        });
        setOnboarding(data);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(Trainers, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        setTrainers(res.getTrainers);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(Legals, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        setLegals(res.legals);
      }
    },
    onError: (error) => console.log(error),
  });

  useQuery(ProgrammeQuestionnaire, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      if (res) {
        const qMap = res.programmeQuestionnaire.map((question) => {
          const answers = [];
          answers.push(
            question.question.answer1,
            question.question.answer2,
            question.question.answer3,
            question.question.answer4,
          );

          const formattedQuestion = answers.map((val, index) => {
            return {
              key: `${index + 1}`,
              answerText: val,
            };
          });

          return {...question, answers: formattedQuestion};
        });

        const localQuestion = {
          orderIndex: 1,
          answers: [
            {answerText: 'Home', key: '1'},
            {answerText: 'Gym', key: '2'},
          ],
          question: {
            language: 'en',
            question: 'Would you rather train at home or in the gym?',
          },
        };

        qMap.unshift(localQuestion);
        setProgrammeQuestionnaire(qMap);
      }
    },
    onError: (error) => console.log(error),
  });

  // Get stored rest days from Async or create defaults
  const getStoredDays = useCallback(async (numberOfWorkouts) => {
    let days = await AsyncStorage.getItem('@CURRENT_WEEK');
    days = JSON.parse(days);
    days = days.map((it) => {
      return {
        ...it,
        date: parseISO(it.date),
        exactDate: parseISO(it.exactDate),
      };
    });

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
    const now = new Date();

    // PAST
    let pastWorkouts = getPastWorkouts(workouts);
    let pastRestDays = getStoredPastRestDays(storedDays);

    let week = getWeekArrayWithPastDays(pastWorkouts, pastRestDays);

    // FUTURE
    let futureWorkouts = workouts.filter((it) => !it.completedAt);
    const futureRestDays = getStoredFutureRestDays(storedDays);

    // Add future dates
    const remaining = 7 - week.length;
    for (let i = 0; i < remaining; i++) {
      const date = addDays(now, i);

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

      structureWeek(data.currentWeek.workouts, storedDays);
      setProgramme(data);
    },
    onError: (error) => console.log(error),
  });

  const [selectedWorkout, setSelectedWorkout] = useState();
  const [isDownloadEnabled, setDownloadEnabled] = useState();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const getDownloadEnabled = useCallback(async () => {
    const value = (await AsyncStorage.getItem('@DOWNLOAD_ENABLED')) || 'false';
    const enabled = JSON.parse(value);
    setDownloadEnabled(enabled);
  }, []);

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

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      onboarding,
      trainers,
      legals,
      programmeQuestionnaire,
      suggestedProgramme,
      setSuggestedProgramme,
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
    }),
    [
      onboarding,
      trainers,
      legals,
      programmeQuestionnaire,
      suggestedProgramme,
      setSuggestedProgramme,
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
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
