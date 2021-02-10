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
      date: 'Monday, 25th Jan',
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
      date: 'Tuesday, 26th Jan',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Wednesday, 27th Jan',
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
      date: 'Thursday, 28th Jan',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Friday, 29th Jan',
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
      date: 'Saturday, 30th Jan',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      date: 'Sunday, 31st Jan',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
  ],
  nextWeek: [
    {
      __typename: 'WorkoutWeek',
      date: 'Monday, 1st Feb',
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
      date: 'Tuesday, 2nd Feb',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Wednesday, 3rd Feb',
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
      date: 'Thursday, 4th Feb',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      __typename: 'WorkoutWeek',
      date: 'Friday, 5th Feb',
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
      date: 'Saturday, 6th Feb',
      day: 7,
      workout: {duration: 0, intensity: 0, name: 'REST DAY'},
    },
    {
      date: 'Sunday, 7th Feb',
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
