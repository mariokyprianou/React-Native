/*
 * Created Date: Thu, 6th May 2021, 11:11:21 am
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import React from 'react';
import {OnDemandStack} from '../navigation';
import OnDemandScreen from '../screens/OnDemand/OnDemandScreen';
import {TransitionPresets} from '@react-navigation/stack';

export default function OnDemandContainer(props) {
  return (
    <OnDemandStack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <OnDemandStack.Screen
        name="OnDemand"
        component={OnDemandScreen}
        options={{headerShown: false}}
      />
    </OnDemandStack.Navigator>
  );
}
