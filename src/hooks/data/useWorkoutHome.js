/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 16:35:36 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import {useState} from 'react';

const fakeData = {
  currentWeek: [
    {
      __typename: 'WorkoutWeek',
      date: 'Thursday, 17th Dec',
      day: 1,
      orderIndex: 1,
      workout: {
        __typename: 'Workout',
        duration: 45,
        intensity: 'MOD',
        name: 'English Workout details',
      },
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Saturday, 19th Dec',
      day: 3,
      orderIndex: 2,
      workout: {
        __typename: 'Workout',
        duration: 45,
        intensity: 'MOD',
        name: 'English Workout details',
      },
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Monday, 21st Dec',
      day: 5,
      orderIndex: 3,
      workout: {
        __typename: 'Workout',
        duration: 45,
        intensity: 'MOD',
        name: 'English Workout details',
      },
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
  ],
  nextWeek: [
    {
      __typename: 'WorkoutWeek',
      date: 'Thursday, 17th Dec',
      day: 1,
      orderIndex: 1,
      workout: {
        __typename: 'Workout',
        duration: 45,
        intensity: 'MOD',
        name: 'English Workout details',
      },
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Saturday, 19th Dec',
      day: 3,
      orderIndex: 2,
      workout: {
        __typename: 'Workout',
        duration: 45,
        intensity: 'MOD',
        name: 'English Workout details',
      },
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Monday, 21st Dec',
      day: 5,
      orderIndex: 3,
      workout: {
        __typename: 'Workout',
        duration: 45,
        intensity: 'MOD',
        name: 'English Workout details',
      },
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      date: 'Wednesday, 23rd Dec',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
  ],
  trainerName: 'Katrina',
  venue: 'home',
  totalDuration: 150,
  totalReps: 90,
  totalSets: 20,
  currentWeekNumber: 1,
  completedWorkoutWeek: false, // from workoutWeek.workouts (T []) - each workout has isCompleted property
  threeWorkoutsInRow: false,
  firstWorkoutOfNextWeek: '3rd July',
  lastWeekOfProgramme: true,
};

export default function useWorkoutHome() {
  const [workoutHomeData, setWorkoutHomeData] = useState(fakeData);

  return {workoutHomeData};
}
