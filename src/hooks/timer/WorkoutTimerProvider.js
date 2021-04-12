/*
 * Jira Ticket:
 * Created Date: Thu, 26th Nov 2020, 08:35:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
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

  
  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      workoutTime,
      setWorkoutTime,
      isWorkoutTimerRunning,
      setIsWorkoutTimerRunning,
    }),
    [
      workoutTime,
      setWorkoutTime,
      isWorkoutTimerRunning,
      setIsWorkoutTimerRunning,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
