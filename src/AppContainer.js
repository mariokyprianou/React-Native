/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {AppStack} from './navigation';
import OnboardingScreen from './screens/OnboardingScreen';
import MeetYourIconsScreen from './screens/MeetYourIconsScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import LoginScreen from './screens/auth/LoginScreen';
import WorkoutHomeScreen from './screens/WorkoutHomeScreen';
import TabContainer from './routes/TabContainer';

export default function AppContainer() {
  return (
    <AppStack.Navigator headerMode="screen">
      <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AppStack.Screen name="MeetYourIcons" component={MeetYourIconsScreen} />
      <AppStack.Screen name="Registration" component={RegistrationScreen} />
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen name="WorkoutHome" component={WorkoutHomeScreen} />
      <AppStack.Screen
        name="TabBar"
        component={TabContainer}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
