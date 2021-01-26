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
import NotesScreen from '../screens/workout/NotesScreen';
import WeightCaptureScreen from '../screens/workout/WeightCaptureScreen';
import WeekCompleteScreen from '../screens/workout/WeekCompleteScreen';
import TakeARestScreen from '../screens/workout/TakeARestScreen';
import StayTunedScreen from '../screens/workout/StayTunedScreen';
import WorkoutCompleteScreen from '../screens/workout/WorkoutCompleteScreen';
import {TransitionPresets} from '@react-navigation/stack';

export default function WorkoutContainer(props) {
  return (
    <WorkoutStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <WorkoutStack.Screen
        name="WorkoutHome"
        component={WorkoutHomeScreen}
        options={{headerShown: false}}
      />
      <WorkoutStack.Screen name="StartWorkout" component={StartWorkoutScreen} />
      <WorkoutStack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <WorkoutStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <WorkoutStack.Screen
        name="WeightCapture"
        component={WeightCaptureScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <WorkoutStack.Screen
        name="WeekComplete"
        component={WeekCompleteScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <WorkoutStack.Screen
        name="TakeARest"
        component={TakeARestScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <WorkoutStack.Screen
        name="StayTuned"
        component={StayTunedScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <WorkoutStack.Screen
        name="WorkoutComplete"
        component={WorkoutCompleteScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
    </WorkoutStack.Navigator>
  );
}
