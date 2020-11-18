/*
 * Jira Ticket:
 * Created Date: Wed, 18th Nov 2020, 12:21:37 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {AuthStack} from '../navigation';
import LanguageSelectionScreen from '../screens/auth/LanguageSelectionScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import MeetYourIconsScreen from '../screens/auth/MeetYourIconsScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CongratulationsScreen from '../screens/auth/CongratulationsScreen';

export default function AuthContainer(props) {
  return (
    <AuthStack.Navigator headerMode="screen">
      <AuthStack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
      />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="MeetYourIcons" component={MeetYourIconsScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
        name="Congratulations"
        component={CongratulationsScreen}
      />
    </AuthStack.Navigator>
  );
}
