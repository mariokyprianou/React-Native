/*
 * Jira Ticket:
 * Created Date: Wed, 18th Nov 2020, 12:21:37 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {AuthStack} from '../navigation';
import LanguageSelectionScreen from '../screens/Authentication/LanguageSelectionScreen';
import OnboardingScreen from '../screens/Authentication/OnboardingScreen';
import MeetYourIconsScreen from '../screens/Authentication/MeetYourIconsScreen';
import RegistrationScreen from '../screens/Authentication/RegistrationScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import CongratulationsScreen from '../screens/Authentication/CongratulationsScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Authentication/ResetPasswordScreen';
import {TransitionPresets} from '@react-navigation/stack';
import HelpMeChooseScreen from '../screens/Authentication/HelpMeChooseScreen';
import HelpMeChooseResultsScreen from '../screens/Authentication/HelpMeChooseResultsScreen';
import VerifyChangeEmailScreen from '../screens/Profile/VerifyChangeEmailScreen';

import EmailVerificationScreen from '../screens/Authentication/EmailVerificationScreen';

export default function AuthContainer(props) {
  return (
    <AuthStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AuthStack.Screen
        name="LanguageSelection"
        component={LanguageSelectionScreen}
      />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="MeetYourIcons" component={MeetYourIconsScreen} />
      <AuthStack.Screen name="Registration" component={RegistrationScreen} />
      <AuthStack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen
        name="Congratulations"
        component={CongratulationsScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
     
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      
      <AuthStack.Screen
        name="HelpMeChoose"
        component={HelpMeChooseScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <AuthStack.Screen
        name="HelpMeChooseResults"
        component={HelpMeChooseResultsScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <AuthStack.Screen
        name="VerifyChangeEmail"
        component={VerifyChangeEmailScreen}
      />
    </AuthStack.Navigator>
  );
}
