/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
// import InitialReleaseScreen from './screens/InitialReleaseScreen';
import AppStack from './navigation/AppStack';
import HelpMeChooseScreen from './screens/HelpMeChooseScreen';

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
      <AppStack.Screen
        name="Test"
        component={HelpMeChooseScreen}
        options={{
          title: false,
        }}
      />
    </AppStack.Navigator>
  );
}
