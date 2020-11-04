/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 11:47:57 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {addDays, format} from 'date-fns';

const formatWorkoutWeek = (data, week = 1) => {
  const today = new Date();
  const nextWeek = addDays(today, 7);
  let startDay = week === 1 ? today : nextWeek;

  if (data.length === 5) {
    let results = data.map((day) => {
      switch (day.day) {
        case 1:
          day.date = format(startDay, 'iiii, do LLL');
          return day;
        case 2:
          let secondDay = addDays(startDay, 1);
          day.date = format(secondDay, 'iiii, do LLL');
          return day;
        case 3:
          let thirdDay = addDays(startDay, 2);
          day.date = format(thirdDay, 'iiii, do LLL');
          return day;
        case 4:
          let fourthDay = addDays(startDay, 4);
          day.date = format(fourthDay, 'iiii, do LLL');
          return day;
        case 5:
          let fifthDay = addDays(startDay, 5);
          day.date = format(fifthDay, 'iiii, do LLL');
          return day;
      }
    });
    return results;
  } else if (data.length === 4) {
    let results = data.map((day) => {
      switch (day.day) {
        case 1:
          day.date = format(startDay, 'iiii, do LLL');
          return day;
        case 2:
          let secondDay = addDays(startDay, 1);
          day.date = format(secondDay, 'iiii, do LLL');
          return day;
        case 3:
          let thirdDay = addDays(startDay, 3);
          day.date = format(thirdDay, 'iiii, do LLL');
          return day;
        case 4:
          let fourthDay = addDays(startDay, 4);
          day.date = format(fourthDay, 'iiii, do LLL');
          return day;
      }
    });
    return results;
  } else if (data.length === 3) {
    let results = data.map((day) => {
      switch (day.day) {
        case 1:
          day.date = format(startDay, 'iiii, do LLL');
          return day;
        case 2:
          let secondDay = addDays(startDay, 2);
          day.date = format(secondDay, 'iiii, do LLL');
          return day;
        case 3:
          let thirdDay = addDays(startDay, 4);
          day.date = format(thirdDay, 'iiii, do LLL');
          return day;
      }
    });
    return results;
  }
};

export default formatWorkoutWeek;
