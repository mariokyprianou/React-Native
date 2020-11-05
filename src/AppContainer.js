/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import InitialReleaseScreen from './screens/InitialReleaseScreen';
import {AppStack} from './navigation';
import WorkoutHomeScreen from './screens/WorkoutHomeScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import Header from './components/Headers/Header';

// onboarding screen, switch trainer screen, congratulatory screen, registration screen, login screen
// tab container

export default function AppContainer() {
  return (
    <AppStack.Navigator>
      {/* <AppStack.Screen
        name="Initial Release"
        component={InitialReleaseScreen}
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
        component={RegistrationScreen}
        options={{
          header: () => (
            <Header
              title={"Create account"}
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
