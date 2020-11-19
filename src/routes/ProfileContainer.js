/*
 * Jira Ticket:
 * Created Date: Wed, 4th Nov 2020, 09:17:13 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {ProfileStack} from '../navigation';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';
import SettingsScreen from '../screens/Profile/SettingsScreen';
import ChangeEmailScreen from '../screens/Profile/ChangeEmailScreen';

export default function ProfileContainer(props) {
  return (
    <ProfileStack.Navigator headerMode="screen">
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
    </ProfileStack.Navigator>
  );
}
