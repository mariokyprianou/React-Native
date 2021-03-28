/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {AppStack} from './navigation';
import AuthContainer from './routes/AuthContainer';
import TabContainer from './routes/TabContainer';
import LandingScreen from './screens/landing/LandingScreen';
import useLoading from './hooks/loading/useLoading';
import LoadingView from './components/Views/LoadingView';
import ChangeDeviceScreen from './screens/Authentication/ChangeDeviceScreen';

import PurchaseModalScreen from './screens/other/PurchaseModalScreen';
import {TransitionPresets} from '@react-navigation/stack';
import WeekCompleteScreen from './screens/workout/WeekCompleteScreen';
import WorkoutScreen from './screens/workout/WorkoutScreen';
import NotesScreen from './screens/workout/NotesScreen';
import WeightCaptureScreen from './screens/workout/WeightCaptureScreen';
import TakeARestScreen from './screens/workout/TakeARestScreen';
import StayTunedScreen from './screens/workout/StayTunedScreen';
import WorkoutCompleteScreen from './screens/workout/WorkoutCompleteScreen';
import ChallengeCompletionScreen from './screens/progress/ChallengeCompletionScreen';

export default function AppContainer() {
  const {loading} = useLoading();

  return (
    <>
      <AppStack.Navigator headerMode="screen">
        <AppStack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="AuthContainer"
          component={AuthContainer}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="TabContainer"
          component={TabContainer}
          options={{
            headerShown: false,
          }}
        />

        <AppStack.Screen
          name="ChangeDevice"
          component={ChangeDeviceScreen}
        />

        <AppStack.Screen
          name="PurchaseModal"
          component={PurchaseModalScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
        
      
        <AppStack.Screen
          name="WeekComplete"
          component={WeekCompleteScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
       
        <AppStack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
       
        <AppStack.Screen
          name="Notes"
          component={NotesScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
       
        <AppStack.Screen
          name="WeightCapture"
          component={WeightCaptureScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
        
        <AppStack.Screen
          name="TakeARest"
          component={TakeARestScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
        
        <AppStack.Screen
          name="StayTuned"
          component={StayTunedScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
       
        <AppStack.Screen
          name="WorkoutComplete"
          component={WorkoutCompleteScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />




        <AppStack.Screen
          name="ChallengeComplete"
          component={ChallengeCompletionScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
       
      </AppStack.Navigator>
      {loading && LoadingView()}
    </>
  );
}
