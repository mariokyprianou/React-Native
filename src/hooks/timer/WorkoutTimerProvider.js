/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import displayAlert from '../../utils/DisplayAlert';
import useDictionary from '../localisation/useDictionary';
import DataContext from './WorkoutTimerContext';

export default function DataProvider(props) {
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

  const {dictionary} = useDictionary();
  const {ProfileDict, WorkoutDict} = dictionary;

  const [activeWorkout, setActiveWorkout] = useState(false);
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = (nextAppState) => {
    if (
      appState.current &&
      appState.current.match(/background/) &&
      nextAppState === 'active'
    ) {
      console.log('WorkoutTimer foreground');
      displayAlert({
        title: null,
        text: WorkoutDict.ContinueWorkout,
        buttons: [
          {
            text: ProfileDict.Cancel,
          },
          {
            text: WorkoutDict.Continue,
            onPress: () => {
              setIsWorkoutTimerRunning(true);
            },
          },
        ],
      });
    } else {
      setIsWorkoutTimerRunning(false);
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    console.log('isWorkoutTimerRunning', isWorkoutTimerRunning);
  }, [isWorkoutTimerRunning]);

  // Listener for appstate on set when undergoing workout
  useEffect(() => {
    console.log('IsActiveWorkout', activeWorkout);
    if (activeWorkout) {
      AppState.addEventListener('change', handleAppStateChange);
    } else {
      AppState.removeEventListener('change', handleAppStateChange);
    }
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [activeWorkout]);

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      workoutTime,
      setWorkoutTime,
      isWorkoutTimerRunning,
      setIsWorkoutTimerRunning,
      setActiveWorkout,
    }),
    [
      workoutTime,
      setWorkoutTime,
      isWorkoutTimerRunning,
      setIsWorkoutTimerRunning,
      setActiveWorkout,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
