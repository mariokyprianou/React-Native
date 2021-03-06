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

import AnalyticsPermissionScreen from './screens/Authentication/AnalyticsPermissionScreen';
import NotificationsPermissionScreen from './screens/Authentication/NotificationsPermissionScreen';

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
import TermsConditionsScreen from './screens/Authentication/TermsConditionsScreen';
import PrivacyPolicyScreen from './screens/Authentication/PrivacyPolicyScreen';

import {View, Text, ActivityIndicator} from 'react-native';

const DownloadingView = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      }}>
      <ActivityIndicator size={'large'} />
      <Text style={{color: 'white', padding: 20, fontSize: 14}}>
        Downloading Content..
      </Text>
    </View>
  );
};

export default function AppContainer() {
  const {loading, downloading} = useLoading();

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
          options={{
            gestureEnabled: false,
          }}
        />

        <AppStack.Screen
          name="PurchaseModal"
          component={PurchaseModalScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />

        <AppStack.Screen
          name="Analytics"
          component={AnalyticsPermissionScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
        <AppStack.Screen
          name="Notifications"
          component={NotificationsPermissionScreen}
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
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureEnabled: false,
          }}
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

        <AppStack.Screen
          name="TermsAndConditions"
          component={TermsConditionsScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
        <AppStack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
      </AppStack.Navigator>
      {downloading && DownloadingView()}
      {loading && LoadingView()}
    </>
  );
}
