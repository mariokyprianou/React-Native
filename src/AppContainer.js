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
// import SettingsScreen from './screens/Profile/SettingsScreen';

export default function AppContainer() {
  return (
    <AppStack.Navigator headerMode="screen">
      {/* <AppStack.Screen name="Test" component={SettingsScreen} /> */}
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
    </AppStack.Navigator>
  );
}
