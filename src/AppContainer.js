/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import InitialReleaseScreen from './screens/InitialReleaseScreen';
import {AppStack} from './navigation';

import Header from './components/Headers/Header';
import PermissionScreen from './screens/Auth/PermissionScreen';
import AnalyticsPermissionScreen from './screens/Auth/AnalyticsPermissionScreen';
import NotificationPermissionScreen from './screens/Auth/NotificationsPermissionScreen';

// onboarding screen, switch trainer screen, congratulatory screen, registration screen, login screen
// tab container

export default function AppContainer() {
  return (
    <AppStack.Navigator>
      {/* <AppStack.Screen
        name="Initial Release"
        component={AnalyticsPermissionScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <AppStack.Screen
        name="Test"
        component={WorkoutHomeScreen}
        options={{
          title: false,
        }}
      /> */}

      <AppStack.Screen
        name="Register"
        component={NotificationPermissionScreen}
        options={{
          header: () => (
            <Header
              title={'Create account'}
              noSearch
              showBurger={false}
              goBack
            />
          ),
        }}
      />
    </AppStack.Navigator>
  );
}
