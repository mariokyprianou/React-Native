/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 08:49:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeData = [
  {'Sun Nov 01 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Mon Nov 02 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'newWeek'},
  {
    'Tue Nov 03 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {'Wed Nov 04 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Thu Nov 05 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {
    'Fri Nov 06 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {'Sat Nov 07 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {
    'Sun Nov 08 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {'Mon Nov 09 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Tue Nov 10 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'newWeek'},
  {'Wed Nov 11 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {
    'Thu Nov 12 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {
    'Fri Nov 13 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {'Sat Nov 14 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {
    'Sun Nov 15 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {'Mon Nov 16 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Tue Nov 17 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'newWeek'},
  {'Wed Nov 18 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {
    'Thu Nov 19 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'workoutComplete',
  },
  {'Fri Nov 20 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {
    'Sat Nov 21 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'currentDay',
  },
  {'Sun Nov 22 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Mon Nov 23 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Tue Nov 24 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Wed Nov 25 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Thu Nov 26 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Fri Nov 27 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Sat Nov 28 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Sun Nov 29 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
  {'Mon Nov 30 2020 12:00:00 GMT+0000 (Greenwich Mean Time)': 'noData'},
];

export default function useCalendar() {
  const [calendarData, setCalendarData] = useState(fakeData);

  return {calendarData};
}
