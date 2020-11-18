/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:15:43 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {WorkoutStack} from '../navigation';
import WorkoutHomeScreen from '../screens/workout/WorkoutHomeScreen';
import StartWorkoutScreen from '../screens/workout/StartWorkoutScreen';
import WorkoutScreen from '../screens/workout/WorkoutScreen';

export default function WorkoutContainer(props) {
  return (
    <WorkoutStack.Navigator headerMode="screen">
      <WorkoutStack.Screen
        name="WorkoutHome"
        component={WorkoutHomeScreen}
        options={{headerShown: false}}
      />
      <WorkoutStack.Screen
        name="StartWorkout"
        component={StartWorkoutScreen}
        options={{headerShown: false}}
      />
      <WorkoutStack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{headerShown: false}}
      />
    </WorkoutStack.Navigator>
  );
}
