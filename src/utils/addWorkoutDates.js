/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 11:24:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {addDays, format} from 'date-fns';

const addWorkoutDates = (data, thisWeek) => {
  const newData = data.map((workout, index) => {
    const today = new Date();
    const date = thisWeek ? addDays(today, index) : addDays(today, index + 7);
    const formattedDate = format(date, 'iiii, do LLL');
    workout.date = formattedDate;
    const newWorkout = {
      name: workout.workout.name,
      intensity: workout.workout.intensity,
      duration: workout.workout.duration,
      date: workout.date,
      day: workout.day,
    };
    return newWorkout;
  });
  return newData;
};

export default addWorkoutDates;
