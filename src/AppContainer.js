/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import InitialReleaseScreen from './screens/InitialReleaseScreen';
import {AppStack} from './navigation';
import TabContainer from './routes/TabContainer';
import StartWorkoutScreen from './screens/workout/StartWorkoutScreen';

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
      <AppStack.Screen name="Test" component={StartWorkoutScreen} />
      {/* <AppStack.Screen
        name="TabBar"
        component={TabContainer}
        options={{
          headerShown: false,
        }}
      /> */}
    </AppStack.Navigator>
  );
}
