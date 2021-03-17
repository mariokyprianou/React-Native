/*
 * Created Date: Mon, 29th Jun 2020, 13:24:58 pm
 * Author: Joseph Clough
 * Email: joseph.clough@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {AppStack} from './navigation';
import AuthContainer from './routes/AuthContainer';
import TabContainer from './routes/TabContainer';
import LandingScreen from './screens/landing/LandingScreen';
import useLoading from './hooks/loading/useLoading';
import LoadingView from './components/Views/LoadingView';
import ChangeDeviceScreen from './screens/Authentication/ChangeDeviceScreen';
import PurchaseModalScreen from './screens/other/PurchaseModalScreen';
import {TransitionPresets} from '@react-navigation/stack';

export default function AppContainer() {
  const {loading} = useLoading();

  return (
    <>
      <AppStack.Navigator headerMode="screen">
        <AppStack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="AuthContainer"
          component={AuthContainer}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="TabContainer"
          component={TabContainer}
          options={{
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="ChangeDevice"
          component={ChangeDeviceScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
         <AppStack.Screen
          name="PurchaseModal"
          component={PurchaseModalScreen}
          options={{...TransitionPresets.ModalSlideFromBottomIOS}}
        />
      </AppStack.Navigator>
      {loading && LoadingView()}
    </>
  );
}
