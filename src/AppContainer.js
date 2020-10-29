/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import InitialReleaseScreen from './screens/initial-release/InitialReleaseScreen';
import AppStack from './navigation/AppStack';

export default function AppContainer() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Initial Release"
        component={InitialReleaseScreen}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
