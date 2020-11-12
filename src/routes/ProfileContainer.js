/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:17:13 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {ProfileStack} from '../navigation';
import DefaultScreen from '../screens/DefaultScreen';

export default function ProfileContainer(props) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={DefaultScreen}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
}
