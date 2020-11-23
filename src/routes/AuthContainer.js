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
import TermsAndConditionsScreen from '../screens/auth/TermsConditionsScreen';
import PrivacyPolicyScreen from '../screens/auth/PrivacyPolicyScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import AnalyticsPermissionScreen from '../screens/auth/AnalyticsPermissionScreen';
import NotificationsPermissionScreen from '../screens/auth/NotificationsPermissionScreen';
import {TransitionPresets} from '@react-navigation/stack';

export default function AuthContainer(props) {
  return (
    <AuthStack.Navigator headerMode="screen">
      <AuthStack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
      />
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{...TransitionPresets.DefaultTransition}}
      />
      <AuthStack.Screen name="MeetYourIcons" component={MeetYourIconsScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
        name="Congratulations"
        component={CongratulationsScreen}
      />
      <AuthStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <AuthStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AuthStack.Screen
        name="Analytics"
        component={AnalyticsPermissionScreen}
        mode="modal"
      />
      <AuthStack.Screen
        name="Notifications"
        component={NotificationsPermissionScreen}
        mode="modal"
      />
    </AuthStack.Navigator>
  );
}
