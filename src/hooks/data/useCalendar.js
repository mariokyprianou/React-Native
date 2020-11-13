/*
 * Jira Ticket:
 * Created Date: Fri, 6th Nov 2020, 08:49:12 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const singleMonth = [
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

const multipleMonth = [
  {'Thu Oct 01 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Fri Oct 02 2020 12:00:00 GMT+0100 (British Summer Time)': 'newWeek'},
  {
    'Sat Oct 03 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {'Sun Oct 04 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Mon Oct 05 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {
    'Tue Oct 06 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {'Wed Oct 07 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {
    'Thu Oct 08 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {'Fri Oct 09 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Sat Oct 10 2020 12:00:00 GMT+0100 (British Summer Time)': 'newWeek'},
  {'Sun Oct 11 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {
    'Mon Oct 12 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {
    'Tue Oct 13 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {'Wed Oct 14 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {
    'Thu Oct 15 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {'Fri Oct 16 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Sat Oct 17 2020 12:00:00 GMT+0100 (British Summer Time)': 'newWeek'},
  {'Sun Oct 18 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {
    'Mon Oct 19 2020 12:00:00 GMT+0100 (British Summer Time)':
      'workoutComplete',
  },
  {'Tue Oct 20 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {
    'Wed Oct 21 2020 12:00:00 GMT+0100 (British Summer Time)': 'currentDay',
  },
  {'Thu Oct 22 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Fri Oct 23 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Sat Oct 24 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Sun Oct 25 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Mon Oct 26 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Tue Oct 27 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Wed Oct 28 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Thu Oct 29 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Fri Oct 30 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
  {'Sat Oct 31 2020 12:00:00 GMT+0100 (British Summer Time)': 'noData'},
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
  {
    'Tue Nov 17 2020 12:00:00 GMT+0000 (Greenwich Mean Time)':
      'newWeekNewProgramme',
  },
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
  const [progressCalendarData, setProgressCalendarData] = useState(singleMonth);
  const [calendarScreenData, setCalendarScreenData] = useState(multipleMonth);

  return {progressCalendarData, calendarScreenData};
}
