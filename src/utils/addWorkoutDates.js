/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 11:24:55 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {addDays, format} from 'date-fns';

const addWorkoutDates = (data, startDate) => {
  const newData = data.map((workout, index) => {
    const date = addDays(startDate, index);
    const formattedDate = format(date, 'iiii, do LLL');

    if (workout.workout) {
      return {
        name: workout.workout.name.toUpperCase(),
        intensity: workout.workout.intensity,
        duration: workout.workout.duration,
        date: formattedDate,
        exactDate: date,
        day: workout.day,
      };
    } else {
      return {
        ...workout,
        name: workout.name.toUpperCase(),
        date: formattedDate,
        exactDate: date,
        day: workout.day,
      };
    }
  });

  return newData;
};

export default addWorkoutDates;
