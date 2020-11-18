/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:16:38 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {ProgressStack} from '../navigation';
import ProgressScreen from '../screens/progress/ProgressScreen';
import CalendarScreen from '../screens/progress/CalendarScreen';
import TransformationScreen from '../screens/progress/TransformationScreen';
import ChallengeScreen from '../screens/progress/ChallengeScreen';
import ChallengeEndScreen from '../screens/progress/ChallengeEndScreen';

export default function ProgressContainer(props) {
  return (
    <ProgressStack.Navigator headerMode="screen">
      <ProgressStack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{headerShown: false}}
      />
      <ProgressStack.Screen name="Calendar" component={CalendarScreen} />
      <ProgressStack.Screen
        name="Transformation"
        component={TransformationScreen}
      />
      <ProgressStack.Screen name="Challenge" component={ChallengeScreen} />
      <ProgressStack.Screen
        name="ChallengeEnd"
        component={ChallengeEndScreen}
      />
    </ProgressStack.Navigator>
  );
}
